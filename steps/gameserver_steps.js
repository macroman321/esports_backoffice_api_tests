const TestData = require('../support/util/test_data')
const request = require('axios')
const assert = require('assert')
const {When, Then} = require('cucumber')
const gameserver = require('../support/api_requests/gameserver')
const util = require('../support/util/util')

When('I request a list of all gameservers', async function () {
  this.response = await gameserver.getGameservers()
  assert.equal(
    this.response.status,
    200,
    `Incorrect status code - ${this.response.status}`)
})

Then('I should get the list of gameservers', async function () {
  global.logger.debug(this.response.data.length)

  assert.equal(
    this.response.data.length,
    TestData.data.number_of_gameservers,
    `Wrong number of gameservers - ${this.response.data.length}`)
})

When('I create a new gameserver', async function () {
  this.response = undefined
  this.name = util.createUniqueGameserverName()
  console.log('napravljeno ime', this.name)

  try {
    this.response = await request.post(
      `${global.testData.url}/gameservers`,
      {
        keywords: [
          'pogibijaa'
        ],
        name: this.name,
        provider: {
          'id': 1
        }
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + global.testData.token
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
    `Incorrect status code - ${this.response.status}`)
})

Then('I should see that the previously created gameserver exists', async function () {
  this.response = undefined
  this.response = await gameserver.getGameservers()

  const found = this.response.data.filter((gameserver) => {
    if (gameserver.name === this.name) {
      return gameserver.name
    }
  })
  assert.equal(
    this.name,
    found[0].name,
    `Gameserver is not present on the list of ladders - ${this.name}`)

  assert.equal(
    this.response.status,
    200,
    `Incorrect status code - ${this.response.status}`)
})

When('I update a gameserver', async function () {
  this.response = undefined
  const gameserverResponse = await gameserver.getGameserver(global.testData.test_gameserver)
  this.currentStatus = gameserverResponse.data.active

  try {
    this.response = await request.put(
      `${global.testData.url}/gameservers/${global.testData.test_gameserver}`,
      {
        active: !this.currentStatus,
        keywords: [
          'pogibijaa'
        ],
        name: 'qabugtestinggameserver',
        provider: {
          id: 3
        }
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + global.testData.token
        }
      }
    )
  } catch (err) {
    this.logger(err)
    throw err
  }

  assert.equal(
    this.response.status,
    200,
    `Incorrect status code - ${this.response.status}`)
})

Then('I should see that the status of the gameserver has changed', async function () {
  const newGameserverResponse = await gameserver.getGameserver(global.testData.test_gameserver)
  const newStatus = newGameserverResponse.data.active

  assert.equal(newStatus, !this.currentStatus, 'Gameserver status update failed!')
})
