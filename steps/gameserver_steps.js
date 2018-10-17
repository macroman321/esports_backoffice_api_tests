const TestData = require('../support/util/test_data')
const request = require('trae')
const assert = require('assert')
const defineSupportCode = require('cucumber').defineSupportCode

defineSupportCode(function ({Given, Then, When}) {
  When('I request a list of all gameservers', async function () {
    this.response = undefined
    this.token = TestData.getToken()

    try {
      this.response = await request.get(
        `${TestData.data.url}/gameservers`,
        {
          headers: {
            'Authorization': this.token
          }
        }
      )
      console.log(this.response.data.length)
    } catch (err) {
      console.log('Error', err)
      throw err
    }
    assert.equal(
      this.response.status,
      200,
      `Incorrect status code - ${this.response.status}`)
  })

  Then('I should get the list of gameservers', async function () {
    console.log(this.response.data.length)

    assert.equal(
      this.response.data.length,
      TestData.data.number_of_gameservers,
      `Wrong number of gameservers - ${this.response.data.length}`)
  })

  When('I create a new gameserver', async function () {
    this.token = TestData.getToken()
    this.response = undefined

    try {
      this.response = await request.post(
        `${TestData.data.url}/gameservers`,
        {
          keywords: [
            'pogibijaa'
          ],
          name: 'usluzivac_igara',
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
      console.log('Error', err)
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

    try {
      this.response = await request.get(
        `${TestData.data.url}/gameservers/78`,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': this.token
          }
        }
      )
    } catch (err) {
      console.log('Error', err)
      throw err
    }

    assert.equal(
      this.response.status,
      200,
      `Incorrect status code - ${this.response.status}`)
  })

  When('I update a gameserver', async function () {
    this.response = undefined
    this.token = TestData.getToken()

    try {
      this.response = await request.put(
        `${TestData.data.url}/gameservers/78`,
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
      console.log(err)
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
        `${TestData.data.url}/gameservers/78`,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': this.token
          }
        }
      )
    } catch (err) {
      console.log('Error', err)
      throw err
    }
    assert.equal(
      this.response.status,
      200,
      `Incorrect status code - ${this.response.status}`)

    console.log(this.response.data.active)
    assert.equal(
      this.response.data.active,
      false,
      `Incorrect provider status - ${this.response.data.active}`)
  })
})
