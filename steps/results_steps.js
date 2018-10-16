const defineSupportCode = require('cucumber').defineSupportCode
const assert = require ('assert')
const request = require ('trae')
const TestData = require('../support/util/test_data')
const util = require('../support/util/util')

defineSupportCode(function ({Given, Then, When})) {
  When('I request a list of results for {string} match on {string} gameserver', async function (match, serverInfo) {
    this.serverInfo = TestData.getServerInfo(serverInfo)
    this.response = undefined
    this.error = undefined

    try {
      this.response = await request.get(
        `${TestData.data.url}/results/matches?gameSlug={{gameSlug}}&page={{page}}&size={{size}}`,
        {
          headers: {
            'Accept': '*/*',
            'Authorization': `Bearer ${this.auth}`

          }
        }
      )
    }
  })

  Then('I should see appropriate results for the query', async function () {

  })
}
