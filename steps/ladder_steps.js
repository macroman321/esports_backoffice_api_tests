const defineSupportCode = require('cucumber').defineSupportCode
const assert = require('assert')
const request = require('trae')
const TestData = require('../support/util/test_data')
const util = require('../support/util/util')

defineSupportCode(function ({Given, Then, When}) {
  When('I request a list of ladders for {string} gameserver', async function(serverInfo) {
    this.serverInfo = TestData.getServerInfo(serverInfo)
    this.response = undefined
    this.error = undefined

    try {
      this.response = await request.get(
        `${TestData.data.url}/ladder`,
        {
          headers: {
            'Accept': '*/*',
            'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhcGlnYXRld2F5QGdhbWVjcmVkaXRzLmNvbSIsInVzZXJJZCI6Ii0xIiwicm9sZSI6IlJPTEVfQURNSU4ifQ.LaAsYurpW-OcuqgfKgHMNcLBtCrduWt2l37cAbWtTUzniTib2EMkVMzeYGSOIe59QHJkcxk1QD-yTnXJ8weKNQ'
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
      this.serverInfo.number_of_ladders,
      `Wrong number of ladders - ${this.response.data.totalElements}`)
  })


})
