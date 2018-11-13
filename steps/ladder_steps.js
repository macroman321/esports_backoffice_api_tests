const defineSupportCode = require('cucumber').defineSupportCode
const assert = require('assert')
const request = require('trae')
// const global.testData = require('../support/util/test_data')
const util = require('../support/util/util')

defineSupportCode(function ({Given, Then, When}) {
  When('I request a list of ladders for all gameservers', async function () {
    this.ladderAuth = global.testData.getLadderAuth()
    this.response = undefined
    this.err = undefined

    try {
      this.response = await request.get(
        `${global.testData.data.url}/ladder`,
        {
          headers: {
            'Accept': '*/*',
            'Authorization': `Bearer ${this.ladderAuth.auth}`
          }
        }
      )
    } catch (err) {
      global.logger.error(err)
      throw err
    }
    assert.equal(
      this.response.status,
      200,
      `Incorrect status code - ${this.response.status}`
    )
  })

  When('I request a list of ladders for all gameservers with wrong authorization token', async function () {
    this.ladderAuth = global.testData.getLadderAuth()
    this.response = undefined
    this.err = undefined

    try {
      this.response = await request.get(
        `${global.testData.data.url}/ladder`,
        {
          headers: {
            'Accept': '*/*',
            'Authorization': `Intentionally wrong token`
          }
        }
      )
    } catch (err) {
      global.logger.error(err)
      throw err
    }
    assert.equal(
      this.response.status,
      401,
      `Correct status code - ${this.response.status}`
    )
  })

  When('I request the latest page of the list of ladders for all gameservers', async function () {
    this.ladderAuth = global.testData.getLadderAuth()
    this.response = undefined
    this.err = undefined

    try {
      this.response = await request.get(
        `${global.testData.data.url}/ladder?page=9999`,
        {
          headers: {
            'Accept': '*/*',
            'Authorization': `Bearer ${this.ladderAuth.auth}`
          }
        }
      )
    } catch (err) {
      global.logger.error(err)
      throw err
    }
    assert.equal(
      this.response.status,
      200,
      `Incorrect status code - ${this.response.status}`
    )
  })

  Then('I should see a list of ladders', async function () {
    global.logger.info(`The total number of ladders - ${this.response.data.totalElements}`)
    this.ladderKnown1 = global.testData.data.known_ladders.ladder1_id
    this.ladderKnown2 = global.testData.data.known_ladders.ladder2_id
    this.ladderKnown3 = global.testData.data.known_ladders.ladder3_id
    let compareLadder = this.response.data.content.filter((ladder) => {
      if (ladder.id === this.ladderKnown1 || ladder.id === this.ladderKnown2 || ladder.id === this.ladderKnown3) {
        console.log(`${ladder.id}`)
        return ladder.id
      }
    })
    global.logger.info(`${compareLadder[0].id}, ${compareLadder[1].id} and ${compareLadder[2].id} are the ladders we are searching for`)
    assert(
      this.response.data.totalElements > 3,
      `There are fewer than 3 ladders on the list of ladders!`
    )
  })

  // Then('I should see the request is unauthorized', async function () {
  //  @TODO add implementation
  // })

  When('I create new ladder for {string} gameserver', async function (serverInfo) {
    this.serverInfo = global.testData.getServerInfo(serverInfo)
    this.response = undefined
    this.err = undefined
    this.ladderAuth = global.testData.getLadderAuth()
    this.ladderName = util.generateName()

    try {
      this.response = await request.post(
        `${global.testData.data.url}/ladder`,
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
      global.logger.error(err)
      throw err
    }
    assert.equal(
      this.response.status,
      201,
      `Incorrect status code - ${this.response.status}`
    )
  })

  When('I try to create a new ladder for {string} gameserver without choosing a gameserver', async function (serverInfo) {
    this.serverInfo = global.testData.getServerInfo(serverInfo)
    this.response = undefined
    this.err = undefined
    this.ladderAuth = global.testData.getLadderAuth()
    this.ladderName = util.generateName()

    try {
      this.response = await request.post(
        `${global.testData.data.url}/ladder`,
        {
          'name': this.ladderName,
          'startDate': util.createTimestamp(),
          'endDate': util.createTimestamp(),
          'gameserver': {
            'id': '',
            'gameSlug': ''
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
      global.logger.error(err)
      throw err
    }
    assert.equal(
      this.response.status,
      400,
      `Incorrect status code - ${this.response.status}`
    )
  })

  When('I try to create a new ladder for {string} gameserver without entering a name for the ladder', async function (serverInfo) {
    this.serverInfo = global.testData.getServerInfo(serverInfo)
    this.response = undefined
    this.err = undefined
    this.ladderAuth = global.testData.getLadderAuth()

    try {
      this.response = await request.post(
        `${global.testData.data.url}/ladder`,
        {
          'name': '',
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
      global.logger.error(err)
      throw err
    }
    assert.equal(
      this.response.status,
      400,
      `Incorrect status code - ${this.response.status}`
    )
  })

  When('I try to create a new ladder for "gameserver2" gameserver without entering a start date', async function (serverInfo) {
    this.serverInfo = global.testData.getServerInfo(serverInfo)
    this.response = undefined
    this.err = undefined
    this.ladderAuth = global.testData.getLadderAuth()
    this.ladderName = util.generateName()

    try {
      this.response = await request.post(
        `${global.testData.data.url}/ladder`,
        {
          'name': this.ladderName,
          'startDate': '',
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
      global.logger.error(err)
      throw err
    }
    assert.equal(
      this.response.status,
      400,
      `Incorrect status code - ${this.response.status}`
    )
  })

  Then('I shoul see the ladder is not created', async function () {
    global.logger.info('Required fields must be filled')
    global.logger.info(this.response.status)
  })

  When('I request information for {string} ladder', async function (ladderInfo) {
    this.ladderID = global.testData.getLadderInfo(ladderInfo)
    this.ladderAuth = global.testData.getLadderAuth()
    this.response = undefined
    this.err = undefined

    try {
      this.response = await request.get(
        `${global.testData.data.url}/ladder/${this.ladderID.ladder_id}`,
        {
          headers: {
            'Accept': '*/*',
            'Authorization': `Bearer ${this.ladderAuth.auth}`
          }
        }
      )
    } catch (err) {
      global.logger.error(err)
      throw err
    }
    assert.equal(
      this.response.status,
      200,
      `Incorrect status code - ${this.response.status}`
    )
  })

  Then('I should see the ladder on the list of ladders', async function () {
    global.logger.info('Last page of ladders')
    var found = this.response.data.content.filter((ladder) => {
      global.logger.info(`${ladder.name}`)
      if (ladder.name === this.ladderName) {
        return ladder.name
      }
    })
    console.log(`${this.ladderName} - ladder we are searching for`)
    assert.equal(
      this.ladderName,
      found[0].name,
      `Ladder is not present on the list of ladders - ${this.ladderName}`)
  })

  Then('I should get the ID from the created ladder', async function () {
    global.logger.info('Last page of ladders')
    this.idFind = this.response.data.content.filter((ladder) => {
      console.log(`${ladder.name} - ${ladder.id}`)
      if (ladder.name === this.ladderName) {
        return ladder.id
      }
    })
    console.log(`ID of the newly created ladder -> ${this.idFind[0].id}`)
  })

  Then('I should see information for that ladder', async function () {
    console.log(this.response.data.name)
    assert.equal(
      this.response.data.name,
      this.ladderID.name,
      `Wrong ID for searched ladder - ${this.response.data.name}`)
  })

  When('I delete a specific ladder on {string} gameserver', async function (serverInfo) {
    this.response = undefined
    this.err = undefined
    this.ladderAuth = global.testData.getLadderAuth()
    this.serverInfo = global.testData.getServerInfo(serverInfo)

    try {
      this.response = await request.delete(
        `${global.testData.data.url}/ladder/${this.idFind[0].id}`,
        {
          headers: {
            'id': '*/*',
            'Authorization': `Bearer ${this.ladderAuth.auth}`
          }
        }
      )
    } catch (err) {
      global.logger.error(err)
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
    let missing = true
    this.response.data.content.forEach((ladder) => {
      console.log(`${ladder.name}`)
      if (ladder.name === this.ladderName) {
        missing = false
      }
    })
    console.log(`${this.ladderName} - ladder we are searching for`)
    assert(
      missing,
      `Ladder is present on the list of ladders - ${this.ladderName}`)
  })
})
