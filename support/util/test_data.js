const path = require('path')
const yaml = require('js-yaml')
const fs = require('fs')
const _ = require('lodash')

const configPath = path.join(
  path.dirname(
    path.dirname(__dirname)),
  'config')

class TestData {
  // Loads the config and test data from the following files:
  //   cd_<environment>.yml
  //   td_<environment>.yml
  //
  // Parameters:
  // environment - stage, prod (default: stage)
  //
  static load (environment) {
    TestData.environment = environment || 'stage'

    let configData
    let testData

    try {
      const cdFile = path.join(configPath, `cd_${TestData.environment}.yml`)
      configData = yaml.safeLoad(fs.readFileSync(cdFile, 'utf8'))
    } catch (e) {
      console.log(`Unable to load config data for ${TestData.environment}!`)
      throw e
    }

    try {
      const tdFile = path.join(configPath, `td_${TestData.environment}.yml`)
      testData = yaml.safeLoad(fs.readFileSync(tdFile, 'utf8'))
    } catch (e) {
      console.log(`Unable to load ${TestData.environment} test data!`)
      throw e
    }

    try {
      TestData.data = _.merge(configData, testData)
    } catch (e) {
      console.log('Unable to load test data!')
      console.log(e)
    }
  }

  getToken () {
    return TestData.data.token
  }

  static getServerInfo (serverInfo) {
    return TestData.data.gameservers[serverInfo]
  }

  static getLadderInfo (ladderInfo) {
    return TestData.data.ladder[ladderInfo]
  }

  static getLadderAuth () {
    return TestData.data.ladder
  }

  static getKnownLadderID (ladderID) {
    return TestData.data.known_ladders[ladderID]
  }

  static getResultsInfo () {
    return TestData.data.results_info
    // return TestData.data.ladders[ladderInfo]
  }

  static getAuthToken () {
    return TestData.data.token
  }
}

module.exports = TestData
