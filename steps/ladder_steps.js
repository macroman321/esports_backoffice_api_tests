const { When, Then } = require('cucumber')
const assert = require('assert')
const request = require('axios')
const testData = require('../support/util/test_data')
const util = require('../support/util/util')
const ladder = require('../support/api_requests/ladder')
const { StatusCode } = require('../support/util/http_codes')

When('I request a list of ladders for all gameservers', async function () {
  this.authToken = testData.getAuthToken()
  this.response = undefined
  this.err = undefined

  try {
    this.response = await request.get(
      `${testData.data.url}/ladder`,
      {
        headers: {
          'Accept': '*/*',
          'Authorization': `Bearer ${this.authToken}`
        }
      }
    )
  } catch (err) {
    global.logger.error(err)
    throw err
  }

  assert.equal(
    this.response.status,
    StatusCode.OK,
    `Incorrect status code - ${this.response.status}`
  )
})

When('I request a list of ladders for all gameservers with wrong authorization token', async function () {
  this.response = undefined
  this.err = undefined

  try {
    this.response = await request.get(
      `${testData.data.url}/ladder`,
      {
        headers: {
          'Accept': '*/*',
          'Authorization': `Intentionally wrong token`
        }
      }
    )
  } catch (err) {
    global.logger.debug(err)
    this.response = err.response
  }

  assert.equal(
    this.response.status,
    StatusCode.UNAUTHORIZED,
    `Correct status code - ${this.response.status}`
  )
})

When('I request the latest page of the list of ladders for all gameservers', async function () {
  this.authToken = testData.getAuthToken()
  this.response = undefined
  this.err = undefined

  try {
    this.response = await request.get(
      `${testData.data.url}/ladder?page=9999`,
      {
        headers: {
          'Accept': '*/*',
          'Authorization': `Bearer ${this.authToken}`
        }
      }
    )
  } catch (err) {
    global.logger.error(err)
    throw err
  }

  assert.equal(
    this.response.status,
    StatusCode.OK,
    `Incorrect status code - ${this.response.status}`
  )
})

Then('I should see a list of ladders', async function () {
  global.logger.info(`The total number of ladders - ${this.response.data.totalElements}`)

  assert.equal(
    this.response.data.totalElements,
    global.testData.number_of_ladders,
    `Wrong number of ladders - ${this.response.data.totalElements}`)
})

When('I create new ladder for {string} gameserver', async function (serverInfo) {
  this.serverInfo = testData.getServerInfo(serverInfo)
  this.response = undefined
  this.err = undefined
  this.authToken = testData.getAuthToken()
  this.ladderName = util.generateName()

  try {
    this.response = await request.post(
      `${testData.data.url}/ladder`,
      {
        'name': this.ladderName,
        'startDate': util.createTimestamp(),
        'endDate': util.createTimestamp(),
        'gameserver': {
          'id': 7,
          'gameSlug': 'f0641a58-8e82-487f-b7ca-375d6132746d'
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
          'Authorization': `Bearer ${this.authToken}`
        }
      }
    )
  } catch (err) {
    global.logger.error(err)
    throw err
  }
  assert.equal(
    this.response.status,
    StatusCode.CREATED,
    `Incorrect status code - ${this.response.status}`
  )
})

When('I try to create a new ladder for {string} gameserver without choosing a gameserver', async function (serverInfo) {
  this.serverInfo = testData.getServerInfo(serverInfo)
  this.response = undefined
  this.err = undefined
  this.authToken = testData.getAuthToken()
  this.ladderName = util.generateName()

  try {
    this.response = await request.post(
      `${testData.data.url}/ladder`,
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
          'Authorization': `Bearer ${this.authToken}`
        }
      }
    )
  } catch (err) {
    global.logger.error(err)
    throw err
  }
  assert.equal(
    this.response.status,
    StatusCode.BAD_REQUEST,
    `Incorrect status code - ${this.response.status}`
  )
})

When('I try to create a new ladder for {string} gameserver without entering a name for the ladder', async function (serverInfo) {
  this.serverInfo = testData.getServerInfo(serverInfo)
  this.response = undefined
  this.err = undefined
  this.authToken = testData.getAuthToken()
  console.log(`${util.createTimestamp()}`)
  try {
    this.response = await request.post(
      `${testData.data.url}/ladder`,
      {
        'name': 'bugtest1',
        'startDate': util.createTimestamp(),
        'endDate': util.createTimestamp(),
        'gameserver': {
          'id': 7,
          'gameSlug': 'nekirandomslug1'
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
          'Authorization': `Bearer ${this.authToken}`
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

When('I try to create a new ladder for {string} gameserver without entering a start date', async function (serverInfo) {
  this.serverInfo = testData.getServerInfo(serverInfo)
  this.response = undefined
  this.err = undefined
  this.authToken = testData.getAuthToken()
  this.ladderName = util.generateName()

  try {
    this.response = await request.post(
      `${testData.data.url}/ladder`,
      {
        'name': this.ladderName,
        'startDate': util.createTimestamp(),
        'endDate': util.createTimestamp(),
        'gameserver': {
          'id': 7,
          'gameSlug': 'f0641a58-8e82-487f-b7ca-375d6132746d'
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
          'Authorization': `Bearer ${this.authToken}`
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

Then('I should see the ladder is not created', async function () {
  global.logger.info('Required fields must be filled')
  global.logger.info(this.response.status)
})

When('I request information for {string} ladder', async function (ladderInfo) {
  this.ladderID = testData.getLadderInfo(ladderInfo)
  this.authToken = testData.getAuthToken()
  this.response = undefined
  this.err = undefined

  try {
    this.response = await request.get(
      `${testData.data.url}/ladder/${this.ladderID.id}`,
      {
        headers: {
          'Accept': '*/*',
          'Authorization': `Bearer ${this.authToken}`
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
  let found = this.response.data.content.filter((ladder) => {
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
  this.authToken = testData.getAuthToken()
  this.serverInfo = testData.getServerInfo(serverInfo)

  try {
    this.response = await request.delete(
      `${testData.data.url}/ladder/${this.idFind[0].id}`,
      {
        headers: {
          'id': '*/*',
          'Authorization': `Bearer ${this.authToken}`
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

When('I use this function to delete ladder with {string} id', async function (ladderId) {
  this.response = await ladder.deleteLadder(ladderId)
})
