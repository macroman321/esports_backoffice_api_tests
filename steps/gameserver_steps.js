const TestData = require('../support/util/test_data')
const request = require('axios')
const assert = require('assert')
const When = require('cucumber')
const Then = require('cucumber')

When('I request a list of all gameservers', async function () {
  this.response = gameserver_api.getGameservers()

  assert.equal(
    this.response.status,
    200,
    `Incorrect status code - ${this.response.status}`)
})

Then('I should get the list of gameservers', async function () {
  this.logger(this.response.data.length)

  assert.equal(
    this.response.data.length,
    TestData.data.number_of_gameservers,
    `Wrong number of gameservers - ${this.response.data.length}`)
})

When('I create a new gameserver', async function () {
  this.token = TestData.getToken()
  this.response = undefined
  this.name = util.createUniqueGameserverName()

  try {
    this.response = await request.post(
      `${TestData.data.url}/gameservers`,
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
          'Authorization': this.token
        }
      }
    )
  } catch (err) {
    this.logger('Error', err)
    throw err
  }
  assert.equal(
    this.response.status,
    201,
    `Incorrect status code - ${this.response.status}`)
})

Then('I should see that the previously created gameserver exists', async function () {
  this.response = undefined
  this.token = TestData.getToken()

  // request list of all gameservers
  try {
    this.response = await request.get(
      `${TestData.data.url}/gameservers/10`,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': this.token
        }
      }
    )
  } catch (err) {
    this.logger('Error', err)
    throw err
  }

  assert.equal(
    this.response.status,
    200,
    `Incorrect status code - ${this.response.status}`)

  // search the list for the name 'this.name' starting from the end of the list
})

When('I update a gameserver', async function () {
  this.response = undefined
  this.token = TestData.getToken()

  try {
    this.response = await request.put(
      `${TestData.data.url}/gameservers/9`,
      {
        active: true,
        keywords: [
          'pogibijaa'
        ],
        name: 'usluzivac_igara',
        provider: {
          id: 1
        }
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': this.token
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
  this.response = undefined
  this.token = TestData.getToken()

  try {
    this.response = await request.get(
      `${TestData.data.url}/gameservers/9`,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': this.token
        }
      }
    )
  } catch (err) {
    this.logger('Error', err)
    throw err
  }
  assert.equal(
    this.response.status,
    200,
    `Incorrect status code - ${this.response.status}`)

  this.logger(this.response.data.active)
  assert.equal(
    this.response.data.active,
    false,
    `Incorrect provider status - ${this.response.data.active}`)
})
