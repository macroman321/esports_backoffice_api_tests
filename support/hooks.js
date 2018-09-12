const {BeforeAll, Before, After} = require('cucumber')
const Logger = require('logplease')
const TestData = require('./util/test_data')

let testData

const logger = Logger.create(
  'cmatest',
  { filename: 'cmatest.log', appendFile: true }
)
Logger.setLogLevel(Logger.LogLevels.INFO)

BeforeAll(async function () {
  logger.info('Initialize test run...')
})

Before(async function (scenario) {
  logger.debug(`Before scenario ${scenario.pickle.name}`)
  if (!testData) {
    logger.info(`parameters: ${JSON.stringify(this.parameters)}`)
    TestData.load(this.parameters.environment)
    testData = TestData.data
  } else {
    logger.debug('test data already initialized!')
  }

  this.testData = testData
  this.logger = logger
  this.logger.info(`Start test: ${scenario.pickle.name}`)
})

After(async function (scenario) {
  this.logger.info(`${scenario.result.status}: '${scenario.pickle.name}'!`)
})
