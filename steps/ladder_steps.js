const defineSupportCode = require('cucumber').defineSupportCode
const assert = require('assert')
const request = require('trae')
const TestData = require('../support/util/test_data')
const util = require('../support/util/util')

defineSupportCode(function ({Given, Then, When}) {
  When('I request a list of ladders for all gameservers', async function () {
    this.ladderAuth = TestData.getLadderAuth()
    this.response = undefined
    this.err = undefined

    try {
      this.response = await request.get(
        `${TestData.data.url}/ladder`,
        {
          headers: {
            'Accept': '*/*',
            'Authorization': `Bearer ${this.ladderAuth.auth}`
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
  })

  When('I request the latest page of the list of ladders for all gameservers', async function () {
    this.ladderAuth = TestData.getLadderAuth()
    this.response = undefined
    this.err = undefined

    try {
      this.response = await request.get(
        `${TestData.data.url}/ladder?page=9999`,
        {
          headers: {
            'Accept': '*/*',
            'Authorization': `Bearer ${this.ladderAuth.auth}`
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
  })

  Then('I should see a list of ladders', async function () {
    console.log(`The total number of ladders - ${this.response.data.totalElements}`)
    this.ladderKnown1 = TestData.data.known_ladders.ladder1_id
    this.ladderKnown2 = TestData.data.known_ladders.ladder2_id
    this.ladderKnown3 = TestData.data.known_ladders.ladder3_id
    let compareLadder = this.response.data.content.filter((ladder) => {
      if (ladder.id === this.ladderKnown1 || ladder.id === this.ladderKnown2 || ladder.id === this.ladderKnown3) {
        console.log(`${ladder.id}`)
        return ladder.id
      }
    })
    console.log(`${compareLadder[0].id}, ${compareLadder[1].id} and ${compareLadder[2].id} are the ladders we are searching for`)
    assert(
      this.response.data.totalElements > 3,
      `There are fewer than 3 ladders on the list of ladders!`
    )
    assert.equal(
      this.ladderKnown1,
      compareLadder[0].id,
      `Ladder - ${this.ladderKnown1} is missing`
    )
    assert.equal(
      this.ladderKnown2,
      compareLadder[1].id,
      `Ladder - ${this.ladderKnown2} is missing`
    )
    assert.equal(
      this.ladderKnown3,
      compareLadder[2].id,
      `Ladder - ${this.ladderKnown3} is missing`
    )
  })

  When('I send POST request for new ladder for {string} gameserver', async function (serverInfo) {
    this.serverInfo = TestData.getServerInfo(serverInfo)
    this.response = undefined
    this.err = undefined
    this.ladderAuth = TestData.getLadderAuth()
    this.ladderName = util.generateName()

    try {
      this.response = await request.post(
        `${TestData.data.url}/ladder`,
        {
          'name': this.ladderName,
          'startDate': util.createTimestamp(),
          'endDate': util.createTimestamp(),
          'gameserver': {
            'id': 38,
            'gameSlug': '216c07d4-6092-472f-897c-b0a9c47f21f1'
          },
          'gameSlug': 'string',
          'paymentConfirmed': false,
          'prizes': [
            {
              'id': 9,
              'fromPosition': 1,
              'toPosition': 5,
              'prize': 100
            },
            {
              'id': 10,
              'fromPosition': 6,
              'toPosition': 10,
              'prize': 50
            }
          ]
        },
        {
          headers: {
            'Accept': '*/*',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.ladderAuth.auth}`
          }
        }
      )
    } catch (err) {
      console.log(err)
      throw err
    }
    assert.equal(
      this.response.status,
      201,
      `Incorrect status code - ${this.response.status}`
    )
  })

  When('I request information for {string} ladder', async function (ladderInfo) {
    this.ladderID = TestData.getLadderInfo(ladderInfo)
    this.ladderAuth = TestData.getLadderAuth()
    this.response = undefined
    this.err = undefined

    try {
      this.response = await request.get(
        `${TestData.data.url}/ladder/${this.ladderID.ladder_id}`,
        {
          headers: {
            'Accept': '*/*',
            'Authorization': `Bearer ${this.ladderAuth.auth}`
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
  })

  Then('I should see the ladder on the list of ladders', async function () {
    console.log('Last page of ladders')
    console.log('--------------------')
    var found = this.response.data.content.filter((ladder) => {
      console.log(`${ladder.name}`)
      if (ladder.name === this.ladderName) {
        return ladder.name
      }
    })
    console.log('--------------------')
    console.log(`${this.ladderName} - ladder we are searching for`)
    assert.equal(
      this.ladderName,
      found[0].name,
      `Ladder is not present on the list of ladders - ${this.ladderName}`)
  })

  Then('I should get the ID from the created ladder', async function () {
    console.log('Last page of ladders')
    console.log('--------------------')
    this.idFind = this.response.data.content.filter((ladder) => {
      console.log(`${ladder.name} - ${ladder.id}`)
      if (ladder.name === this.ladderName) {
        return ladder.id
      }
    })
    console.log('--------------------')
    console.log(`ID of the newly created ladder -> ${this.idFind[0].id}`)
  })

  Then('I should see information for that ladder', async function () {
    console.log(this.response.data.name)
    assert.equal(
      this.response.data.name,
      this.ladderID.name,
      `Wrong ID for searched ladder - ${this.response.data.name}`)
  })

  When('I send a DEL request to delete specific ladder on {string} gameserver', async function (serverInfo) {
    this.response = undefined
    this.err = undefined
    this.ladderAuth = TestData.getLadderAuth()
    this.serverInfo = TestData.getServerInfo(serverInfo)

    try {
      this.response = await request.delete(
        `${TestData.data.url}/ladder/${this.idFind[0].id}`,
        {
          headers: {
            'id': '*/*',
            'Authorization': `Bearer ${this.ladderAuth.auth}`
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
  })

  Then('I should see the ladder is no longer present in the list of ladders', async function () {
    console.log('Last page of ladders')
    console.log('--------------------')
    let missing = true
    this.response.data.content.forEach((ladder) => {
      console.log(`${ladder.name}`)
      if (ladder.name === this.ladderName) {
        missing = false
      }
    })
    console.log('--------------------')
    console.log(`${this.ladderName} - ladder we are searching for`)
    assert(
      missing,
      `Ladder is present on the list of ladders - ${this.ladderName}`)
  })
})
