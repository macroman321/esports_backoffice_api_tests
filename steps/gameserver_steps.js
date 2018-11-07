const request = require('axios')
const assert = require('assert')
const {When, Then} = require('cucumber')
const gameserver = require('../support/api_requests/gameserver')
const util = require('../support/util/util')
const {StatusCode} = require('../support/util/http_codes')

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
    global.testData.number_of_gameservers,
    `Wrong number of gameservers - ${this.response.data.length}`)
})

When('I create a new gameserver', async function () {
  this.name = util.createUniqueGameserverName()
  await gameserver.createGameserver(
    this.name,
    global.testData.test_provider,
    ['pogibijaa'],
    StatusCode.CREATED
  )
})

When('I create a new gameserver without providing name', async function () {
  this.response = await gameserver.createGameserver(
    '',
    global.testData.test_provider,
    ['pogibijaa'],
    StatusCode.BAD_REQUEST
  )
})

Then('I should see that the previously created gameserver exists', async function () {
  this.response = await gameserver.getGameservers()

  const found = this.response.data.filter((gameserver) => {
    if (gameserver.name === this.name) {
      return gameserver.name
    }
  })

  assert.notStrictEqual(
    found.length,
    0,
    `Gameserver is not present on the list of gameservers - ${this.name}`)

  assert.equal(
    this.name,
    found[0].name,
    `Gameserver is not present on the list of gameservers - ${this.name}`)

  assert.equal(
    this.response.status,
    StatusCode.OK,
    `Incorrect status code - ${this.response.status}`)
})

Then('I should see that gameserver creation fails with reason {string}', async function (errorCode) {
  assert.equal(
    errorCode,
    this.response.data.error_code,
    `Incorrect error message - ${this.response.data.error_code}`)
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
