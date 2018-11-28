const assert = require('assert')
const { When, Then, setDefaultTimeout } = require('cucumber')
const gameserver = require('../support/api_requests/gameserver')
const util = require('../support/util/util')
const {StatusCode} = require('../support/util/http_codes')

setDefaultTimeout(30 * 1000)

When('I request a list of all gameservers', async function () {
  this.response = await gameserver.getGameservers()
  assert.equal(
    this.response.status,
    200,
    `Incorrect status code - ${this.response.status}`)
})

Then('I should get the list of gameservers', async function () {
  global.logger.debug(this.response.data.length)

  assert.equal(
    this.response.data.length,
    global.testData.number_of_gameservers,
    `Wrong number of gameservers - ${this.response.data.length}`)
})

When('I create a new gameserver', async function () {
  this.name = util.createUniqueGameserverName()
  await gameserver.createGameserver(
    this.name,
    global.testData.test_provider,
    ['pogibijaa'],
    StatusCode.CREATED
  )
})

When('I create a new gameserver without providing name', async function () {
  this.response = await gameserver.createGameserver(
    undefined,
    global.testData.test_provider,
    ['pogibijaa'],
    StatusCode.BAD_REQUEST
  )
})

When('I create a new gameserver without providing provider', async function () {
  this.response = await gameserver.createGameserver(
    util.createUniqueGameserverName(),
    undefined,
    ['pogibijaa'],
    StatusCode.BAD_REQUEST
  )
})

When('I create a new gameserver without providing keywords', async function () {
  this.response = await gameserver.createGameserver(
    util.createUniqueGameserverName(),
    global.testData.test_provider,
    undefined,
    StatusCode.BAD_REQUEST
  )
})

Then('I should see that the previously created gameserver exists', async function () {
  this.response = await gameserver.getGameservers()

  const found = this.response.data.filter((gameserver) => {
    if (gameserver.name === this.name) {
      return gameserver.name
    }
  })

  assert.notStrictEqual(
    found.length,
    0,
    `Gameserver is not present on the list of gameservers - ${this.name}`)

  assert.equal(
    this.name,
    found[0].name,
    `Gameserver is not present on the list of gameservers - ${this.name}`)

  assert.equal(
    this.response.status,
    StatusCode.OK,
    `Incorrect status code - ${this.response.status}`)
})

Then('I should see that gameserver creation fails with reason {string}', async function (errorMessage) {
  assert.equal(
    this.response.data.sub_errors[0].message,
    errorMessage,
    `Incorrect error message - ${this.response.data.error_code}`)
})

When('I update a gameserver status', async function () {
  this.gameserver = global.testData.gameservers.gameserver1
  const getResponse = await gameserver.getGameserver(this.gameserver.id)
  this.currentStatus = getResponse.data.active

  this.response = undefined
  this.response = await gameserver.updateGameserver(
    this.gameserver.id,
    getResponse.data.name,
    !this.currentStatus,
    getResponse.data.package_name,
    getResponse.data.provider.id,
    getResponse.data.keywords,
    StatusCode.OK
  )

  if (this.currentStatus === true) {
    this.response = await gameserver.updateGameserver(
      this.gameserver.id,
      getResponse.data.name,
      true,
      getResponse.data.package_name,
      getResponse.data.provider.id,
      getResponse.data.keywords,
      StatusCode.OK
    )
  }
})

Then('I should see that the status of the gameserver has changed', async function () {
  const newGameserverResponse = await gameserver.getGameserver(this.gameserver.id)
  const newStatus = newGameserverResponse.data.active

  assert.equal(newStatus, !this.currentStatus, 'Gameserver status update failed!')
})

When('I update a gameserver name', async function () {
  this.gameserver = global.testData.gameservers.gameserver1
  const getResponse = await gameserver.getGameserver(this.gameserver.id)
  this.response = undefined
  this.newName = 'New QA Gameserver'

  this.response = await gameserver.updateGameserver(
    this.gameserver.id,
    this.newName,
    getResponse.data.active,
    getResponse.data.package_name,
    getResponse.data.provider.id,
    getResponse.data.keywords,
    StatusCode.OK
  )
})

Then('I should see that the name of the gameserver has changed', async function () {
  let response = await gameserver.getGameserver(this.gameserver.id)
  const newName = response.data.name

  assert.equal(newName, this.newName, 'Gameserver name update failed!')

  // restore original name
  response = await gameserver.updateGameserver(
    this.gameserver.id,
    this.gameserver.name,
    response.data.active,
    response.data.package_name,
    response.data.provider.id,
    response.data.keywords,
    StatusCode.OK
  )

  assert.equal(response.data.name, this.gameserver.name, 'Gameserver name restore failed!')
})

When('I update the gameserver keyword', async function () {
  this.gameserver = global.testData.gameservers.gameserver1
  const getResponse = await gameserver.getGameserver(this.gameserver.id)
  this.response = undefined
  this.newKeyword = 'New QA Keyword'

  this.response = await gameserver.updateGameserver(
    this.gameserver.id,
    getResponse.data.name,
    getResponse.data.active,
    getResponse.data.package_name,
    getResponse.data.provider.id,
    this.newKeyword,
    StatusCode.OK
  )
})

Then('I should see that the gameserver keyword has changed', async function () {
  let response = await gameserver.getGameserver(this.gameserver.id)
  const newKeyword = response.data.keywords

  assert.equal(newKeyword, this.newKeyword, 'Gameserver keyword update failed!')

  // restore original keyword
  response = await gameserver.updateGameserver(
    this.gameserver.id,
    this.gameserver.name,
    response.data.active,
    response.data.package_name,
    response.data.provider.id,
    response.data.keywords,
    StatusCode.OK
  )

  assert.equal(response.data.keywords, this.gameserver.keyword, 'Gameserver keyword restore failed!')
})

When('I update the gameserver package name', async function () {
  this.gameserver = global.testData.gameservers.gameserver1
  const getResponse = await gameserver.getGameserver(this.gameserver.id)
  this.response = undefined
  this.newPackageName = 'New QA Package name'

  this.response = await gameserver.updateGameserver(
    this.gameserver.id,
    getResponse.data.name,
    getResponse.data.active,
    this.newPackageName,
    getResponse.data.provider.id,
    getResponse.data.keywords,
    StatusCode.OK
  )
})

Then('I should see that the gameserver package name has changed', async function () {
  let response = await gameserver.getGameserver(this.gameserver.id)
  const newPackageName = response.data.package_name

  assert.equal(newPackageName, this.newPackageName, 'Gameserver package name update failed!')

  // restore original package name
  response = await gameserver.updateGameserver(
    this.gameserver.id,
    this.gameserver.name,
    response.data.active,
    response.data.package_name,
    response.data.provider.id,
    response.data.keywords,
    StatusCode.OK
  )

  assert.equal(response.data.package_name, this.gameserver.package_name, 'Gameserver package name restore failed!')
})

When('I attempt to update the gameserver name with no parameters', async function () {
  this.gameserver = global.testData.gameservers.gameserver1
  const getResponse = await gameserver.getGameserver(this.gameserver.id)
  this.response = undefined
  this.newName = ''

  this.response = await gameserver.updateGameserver(
    this.gameserver.id,
    this.newName,
    getResponse.data.active,
    getResponse.data.package_name,
    getResponse.data.provider.id,
    getResponse.data.keywords,
    StatusCode.BAD_REQUEST
  )
})

Then('I should see that the gameserver name update fails with the reason {string}', async function (errorMessage) {
  assert.equal(
    this.response.data.sub_errors[0].message,
    errorMessage,
    `Incorrect error message - ${this.response.data.error_code}`)
})

When('I attempt to update a gameserver without providing a name', async function () {
  this.gameserver = global.testData.gameservers.gameserver1
  const getResponse = await gameserver.getGameserver(this.gameserver.id)
  this.response = undefined
  this.newName = undefined

  this.response = await gameserver.updateGameserver(
    this.gameserver.id,
    this.newName,
    getResponse.data.active,
    getResponse.data.package_name,
    getResponse.data.provider.id,
    getResponse.data.keywords,
    StatusCode.BAD_REQUEST
  )
})

Then('I should see that the gameserver update fails with the reason {string}', async function (errorMessage) {
  assert.equal(
    this.response.data.sub_errors[0].message,
    errorMessage,
    `Incorrect error message - ${this.response.data.error_code}`)
})

When('I attempt to update the gameserver without providing the status', async function () {
  this.gameserver = global.testData.gameservers.gameserver1
  const getResponse = await gameserver.getGameserver(this.gameserver.id)
  this.response = undefined
  this.newStatus = undefined

  this.response = await gameserver.updateGameserver(
    this.gameserver.id,
    getResponse.data.name,
    this.newStatus,
    getResponse.data.package_name,
    getResponse.data.provider.id,
    getResponse.data.keywords,
    StatusCode.INTERNAL_SERVER_ERROR
  )
})

Then('I should see that gameserver status update fails with reason {string}', async function (errorMessage) {
  assert.equal(
    this.response.data.error,
    errorMessage,
    `Incorrect error message - ${this.response.data.error_code}`)
})

When('I attempt to update the gameserver without providing the provider', async function () {
  this.gameserver = global.testData.gameservers.gameserver1
  const getResponse = await gameserver.getGameserver(this.gameserver.id)
  this.response = undefined
  this.newPackageName = undefined

  this.response = await gameserver.updateGameserver(
    this.gameserver.id,
    getResponse.data.name,
    getResponse.data.active,
    this.newPackageName,
    getResponse.data.provider.id,
    getResponse.data.keywords,
    StatusCode.BAD_REQUEST
  )
})

Then('I should see that gameserver update fails with reason {string}', async function (errorMessage) {
  assert.equal(
    this.response.data.error,
    errorMessage,
    `Incorrect error message - ${this.response.data.error_code}`)
})

When('I attempt to update the gameserver without providing the keyword', async function () {
  this.gameserver = global.testData.gameservers.gameserver1
  const getResponse = await gameserver.getGameserver(this.gameserver.id)
  this.response = undefined
  this.newKeyword = undefined

  this.response = await gameserver.updateGameserver(
    this.gameserver.id,
    getResponse.data.name,
    getResponse.data.active,
    getResponse.data.package_name,
    getResponse.data.provider.id,
    this.newKeyword,
    StatusCode.BAD_REQUEST
  )
})

Then('I should see that gameserver update fails with reason {string}', async function (errorMessage) {
  assert.equal(
    this.response.data.sub_errors[0].message,
    errorMessage,
    `Incorrect error message - ${this.response.data.error_code}`)
})
