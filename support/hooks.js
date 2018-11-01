const {BeforeAll, Before, After} = require('cucumber')
const Logger = require('logplease')
const TestData = require('./util/test_data')

let testData

global.logger = Logger.create(
  'cmatest',
  { filename: 'cmatest.log', appendFile: true }
)
Logger.setLogLevel(Logger.LogLevels.INFO)

BeforeAll(async function () {
  global.logger.info('Initialize test run...')
})

Before(async function (scenario) {
  global.logger.debug(`Before scenario ${scenario.pickle.name}`)
  if (!testData) {
    global.logger.info(`parameters: ${JSON.stringify(this.parameters)}`)
    TestData.load(this.parameters.environment)
    testData = TestData.data
  } else {
    global.logger.debug('test data already initialized!')
  }

  global.testData = testData
  global.logger.info(`Start test: ${scenario.pickle.name}`)
})

After(async function (scenario) {
  global.logger.info(`${scenario.result.status}: '${scenario.pickle.name}'!`)
})
