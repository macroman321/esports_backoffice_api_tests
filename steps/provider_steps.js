const TestData = require('../support/util/test_data')
const request = require('trae')
const assert = require('assert')
const defineSupportCode = require('cucumber').defineSupportCode

defineSupportCode(function ({Given, Then, When}) {
  When('I request a list of all providers', async function () {
    this.response = undefined
    this.token = TestData.getToken()

    try {
      this.response = await request.get(
        `${TestData.data.url}/provider`,
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

  Then('I should get the list of providers', async function () {
    console.log(this.response.data.length)

    assert.equal(
      this.response.data.length,
      TestData.data.number_of_providers,
      `Wrong number of providers - ${this.response.data.length}`)
  })

  When('I create a new provider', async function () {
    this.token = TestData.getToken()
    this.response = undefined

    try {
      this.response = await request.post(
        `${TestData.data.url}/provider`,
        {
          name: 'super_kul_provajder'
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

  Then('I should see that the previously created provider exists', async function () {
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

  When('I update a provider', async function () {
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
  Then('I should see that the status of the provider has changed', async function () {
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
