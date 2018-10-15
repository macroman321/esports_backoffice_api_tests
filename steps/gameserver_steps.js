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
            'pogibija'
          ],
          name: 'upravo si ovo napravio bote',
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
        `${TestData.data.url}/provider/6`,
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

    // assert.equal(
    //   this.response.data.matchId,
    //   this.matchId,
    //   `Incorrect match ID - ${this.response.data.matchId}`)
  })

  When('I update a gameserver', async function () {
    this.response = undefined
    this.token = TestData.getToken()

    try {
      this.response = await request.put(
        `${TestData.data.url}/provider/1`,
        {
          id: '1',
          name: 'gplay',
          token: 'd0c51963-63e9-4619-bd57-27d1da9a5907',
          createdDate: '2018-05-25T13:37:27.037+0000',
          updatedDate: '2018-05-25T13:37:27.037+0000',
          gameserverList: [],
          active: false
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
        `${TestData.data.url}/provider/1`,
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
