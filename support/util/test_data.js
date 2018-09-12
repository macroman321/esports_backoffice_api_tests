const path = require('path')
const yaml = require('js-yaml')
const fs = require('fs')
const _ = require('lodash')
const isSubset = require('obj-subset')

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

  static getGameInfo (gameId) {
    return TestData.data.games[gameId]
  }
}

module.exports = TestData
