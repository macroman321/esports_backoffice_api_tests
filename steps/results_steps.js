const { Then, When } = require('cucumber')
const assert = require('assert')
const TestData = require('../support/util/test_data')
const request = require('axios')

When('I request a list of results for {string} match on {string} gameserver', async function (match, serverInfo) {
  this.results = TestData.getResultsInfo()
  this.serverInfo = TestData.getServerInfo(serverInfo)
  this.getAuth = TestData.getAuthToken()
  this.response = undefined
  this.error = undefined

  try {
    this.response = await request.get(
      `${TestData.data.url}/results/matches?gameSlug=${this.results.game_slug}&page=${this.results.page}&size=${this.results.size}`,
      {
        headers: {
          'Accept': '*/*',
          'Authorization': `Bearer ${this.getAuth}`

        }
      }
    )
  } catch (err) {
    global.logger.error(err.response.data)
    throw err
  }
  assert.equal(
    this.response.status,
    200,
    `Incorrect status code - ${this.response.status}`
  )
})

Then('I should see appropriate results for the query', async function () {
  const knownMatches = TestData.data.known_matches

  let receivedMatches = []
  this.response.data.content.forEach((match) => {
    receivedMatches.push(match.matchId)
  })

  assert(
    this.response.data.totalElements > 3,
    `There are fewer than 3 matches on the list of matches!`
  )

  assert(
    receivedMatches.includes(knownMatches[0]),
    `Match - ${knownMatches[0]} is missing`
  )
  assert(
    receivedMatches.includes(knownMatches[1]),
    `Match - ${knownMatches[1]} is missing`
  )
  assert(
    receivedMatches.includes(knownMatches[2]),
    `Match - ${knownMatches[2]} is missing`
  )
})
