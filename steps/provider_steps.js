const assert = require('assert')
const {When, Then, setDefaultTimeout} = require('cucumber')
const provider = require('../support/api_requests/provider')
const util = require('../support/util/util')
const {StatusCode} = require('../support/util/http_codes')

setDefaultTimeout(30 * 1000)

When('I request a list of all providers', async function () {
  this.response = await provider.getProviders()
  assert.equal(
    this.response.status,
    StatusCode.OK,
    `Incorrect status code - ${this.response.status}`)
})

Then('I should get the list of providers', async function () {
  this.logger(this.response.data.length)

  assert.equal(
    this.response.data.length,
    global.testData.number_of_providers,
    `Wrong number of providers - ${this.response.data.length}`)
})

When('I create a new provider', async function () {
  this.name = util.createUniqueProviderName()
  await provider.createProvider(
    this.name,
    StatusCode.CREATED
  )
})

When('I create a new provider without providing name', async function () {
  this.response = await provider.createProvider(
    undefined,
    StatusCode.BAD_REQUEST
  )
})

Then('I should see that the previously created provider exists', async function () {
  this.response = await provider.getProviders()

  const found = this.response.data.filter((provider) => {
    if (provider.name === this.name) {
      return provider.name
    }
  })

  assert.notStrictEqual(
    found.length,
    0,
    `Provider is not present on the list of providers - ${this.name}`)

  assert.equal(
    this.name,
    found[0].name,
    `Provider is not present on the list of providers - ${this.name}`)

  assert.equal(
    this.response.status,
    StatusCode.OK,
    `Incorrect status code - ${this.response.status}`)
})

Then('I should see that provider creation fails with reason {string}', async function (errorMessage) {
  assert.equal(
    this.response.data.sub_errors[0].message,
    errorMessage,
    `Incorrect error message - ${this.response.data.error_code}`)
})

When('I update a provider status', async function () {
  this.provider = global.testData.providers.provider1
  const getResponse = await provider.getProvider(this.provider.id)
  this.currentStatus = getResponse.data.active

  this.response = undefined
  this.response = await provider.updateProvider(
    this.provider.id,
    getResponse.data.name,
    !this.currentStatus,
    StatusCode.OK
  )
})
// if (this.currentStatus === true) {
//   this.response = await provider.updateProvider(
//     this.provider.id,
//     getResponse.data.name,
//     true,
//     StatusCode.OK
//   )

Then('I should see that the status of the provider has changed', async function () {
  const newProviderResponse = await provider.getProvider(this.provider.id)
  const newStatus = newProviderResponse.data.active

  assert.equal(newStatus, !this.currentStatus, 'Provider status update failed!')

  // ensure that status is true after assertion
  if (this.currentStatus === true) {
    this.response = await provider.updateProvider(
      this.provider.id,
      newProviderResponse.data.name,
      true,
      StatusCode.OK
    )
  }
})

When('I update a provider name', async function () {
  this.provider = global.testData.providers.provider1
  const getResponse = await provider.getProvider(this.provider.id)
  this.response = undefined
  this.newName = 'New QA Provider'

  this.response = await provider.updateProvider(
    this.provider.id,
    this.newName,
    getResponse.data.active,
    StatusCode.OK
  )
})

Then('I should see that the name of the provider has changed', async function () {
  let response = await provider.getProvider(this.provider.id)
  const newName = response.data.name

  assert.equal(newName, this.newName, 'Provider name update failed!')

  // restore original name
  response = await provider.updateProvider(
    this.provider.id,
    this.provider.name,
    response.data.active,
    StatusCode.OK
  )

  assert.equal(response.data.name, this.provider.name, 'Provider name restore failed!')
})

When('I attempt to update the provider name with no parameters', async function () {
  this.provider = global.testData.providers.provider1
  const getResponse = await provider.getProvider(this.provider.id)
  this.response = undefined
  this.newName = ''

  this.response = await provider.updateProvider(
    this.provider.id,
    this.newName,
    getResponse.data.active,
    StatusCode.BAD_REQUEST
  )
})

Then('I should see that the provider name update fails with the reason {string}', async function (errorMessage) {
  assert.equal(
    this.response.data.sub_errors[0].message,
    errorMessage,
    `Incorrect error message - ${this.response.data.error_code}`)
})

When('I attempt to update a provider without providing a name', async function () {
  this.provider = global.testData.providers.provider1
  const getResponse = await provider.getProvider(this.provider.id)
  this.response = undefined
  this.newName = undefined

  this.response = await provider.updateProvider(
    this.provider.id,
    this.newName,
    getResponse.data.active,
    StatusCode.BAD_REQUEST
  )
})

Then('I should see that the provider update fails with the reason {string}', async function (errorMessage) {
  assert.equal(
    this.response.data.sub_errors[0].message,
    errorMessage,
    `Incorrect error message - ${this.response.data.error_code}`)
})
