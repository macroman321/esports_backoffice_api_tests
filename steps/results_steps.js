const defineSupportCode = require('cucumber').defineSupportCode
const assert = require('assert')
const TestData = require('../support/util/test_data')
const util = require('../support/util/util')
const request = require('axios')

defineSupportCode(function ({Given, Then, When}) {
  When('I request a list of results for {string} match on {string} gameserver', async function (match, serverInfo) {
    this.results = TestData.getResultsInfo()
    this.serverInfo = TestData.getServerInfo(serverInfo)
    this.getAuth = TestData.getLadderAuth()
    this.response = undefined
    this.error = undefined

    try {
      this.response = await request.get(
        `${TestData.data.url}/results/matches?gameSlug=${this.results.game_slug}&page=${this.results.page}&size=${this.results.size}`,
        {
          headers: {
            'Accept': '*/*',
            'Authorization': `Bearer ${this.getAuth.auth}`

          }
        }
      )
    } catch (err) {
      console.log(err)
      throw err
    }
    assert.equal(
      this.response.status,
      200,
      `Incorrect status code - ${this.response.status}`
    )
    console.log('-------------------------', this.response.data)
  })

  // When('I request a list of results for {string} match on {string} gameserver without the appropriate gameslug', async function (match, serverInfo) {
  //   this.results = TestData.getResultsInfo()
  //   this.serverInfo = TestData.getServerInfo(serverInfo)
  //   this.getAuth = TestData.getLadderAuth()
  //   this.response = undefined
  //   this.error = undefined
  //
  //   try {
  //     this.response = await request.get(
  //       `${TestData.data.url}/results/matches?page=${this.results.page}&size=${this.results.size}`,
  //       {
  //         headers: {
  //           'Accept': '*/*',
  //           'Authorization': `Bearer ${this.getAuth.auth}`
  //
  //         }
  //       }
  //     )
  //   } catch (err) {
  //     console.log(err)
  //     throw err
  //   }
  //   assert.equal(
  //     this.response.status,
  //     400,
  //     `Incorrect status code - ${this.response.status}`
  //   )
  // })

  Then('I should see appropriate results for the query', async function () {
    console.log(`The total number of ladders - ${this.response.data.totalElements}`)
    this.matchKnown1 = TestData.data.known_matches.match1_id
    this.matchKnown2 = TestData.data.known_matches.match2_id
    this.matchKnown3 = TestData.data.known_matches.match3_id
    let compareMatch = this.response.data.content.filter((match) => {
      if (match.matchId === this.matchKnown1 || match.matchId === this.matchKnown2 || match.matchId === this.matchKnown3) {
        console.log(`${match.matchId}`)
        return match.matchId
      }
    })
    console.log('---------------------------------------', compareMatch)
    console.log(`${compareMatch[0].matchId}, ${compareMatch[1].matchId} and ${compareMatch[2].matchId} are the matches we are searching for`)
    assert(
      this.response.data.totalElements > 3,
      `There are fewer than 3 matches on the list of matches!`
    )
    assert.equal(
      this.matchKnown1,
      compareMatch[0].matchId,
      `Match - ${this.matchKnown1} is missing`
    )
    assert.equal(
      this.matchKnown2,
      compareMatch[1].matchId,
      `Match - ${this.matchKnown2} is missing`
    )
    assert.equal(
      this.matchKnown3,
      compareMatch[2].matchId,
      `Match - ${this.matchKnown3} is missing`
    )
  })
})
