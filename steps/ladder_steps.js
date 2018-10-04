const defineSupportCode = require('cucumber').defineSupportCode
const assert = require('assert')
const request = require('trae')
const TestData = require('../support/util/test_data')
const util = require('../support/util/util')

defineSupportCode(function ({Given, Then, When}) {
  When('I request a list of ladders for all gameservers', async function () {
    this.ladderInfo = TestData.getLadder()
    this.response = undefined
    this.err = undefined

    try {
      this.response = await request.get(
        `${TestData.data.url}/ladder`,
        {
          headers: {
            'Accept': '*/*',
            'Authorization': `Bearer ${this.ladderInfo.auth}`
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
    this.ladderInfo = TestData.getLadder()
    this.response = undefined
    this.err = undefined

    try {
      this.response = await request.get(
        `${TestData.data.url}/ladder?page=9999`,
        {
          headers: {
            'Accept': '*/*',
            'Authorization': `Bearer ${this.ladderInfo.auth}`
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
    console.log(this.response.data.totalElements)

    assert.equal(
      this.response.data.totalElements,
      this.ladderInfo.number_of_ladders,
      `Wrong number of ladders - ${this.response.data.totalElements}`)
  })

  When('I send POST request for new ladder for {string} gameserver', async function (serverInfo) {
    this.serverInfo = TestData.getServerInfo(serverInfo)
    this.response = undefined
    this.err = undefined
    this.ladderInfo = TestData.getLadder()
    this.ladderName = util.generateName()

    try {
      this.response = await request.post(
        `${TestData.data.url}/ladder`,
        {
          'name': this.ladderName,
          'startDate': util.momentTimestamp(),
          'endDate': util.momentTimestamp(),
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
            'Authorization': `Bearer ${this.ladderInfo.auth}`
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

  Then('I should see the new ladder created', async function () {
    console.log(this.response.data.totalElements)

    assert.equal(
      this.response.data.totalElements,
      this.ladderInfo.number_of_ladders,
      `Wrong number of ladders - ${this.response.data.totalElements}`)
  })

  When('I request information for {string} ladder', async function (ladderInfo) {
    this.ladderID = TestData.getLadderInfo(ladderInfo)
    this.ladderInfo = TestData.getLadder()
    this.response = undefined
    this.err = undefined

    try {
      this.response = await request.get(
        `${TestData.data.url}/ladder/${this.ladderID.ladder_id}`,
        {
          headers: {
            'Accept': '*/*',
            'Authorization': `Bearer ${this.ladderInfo.auth}`
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
    let found = this.response.data.content.filter((ladder) => {
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

    try {
      this.response = await request.get(
        `${TestData.data.url}/ladder/{id}`,
        {
          headers: {
            'id': '*/*',
            'Authorization': `Bearer ${this.auth}`
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
})
