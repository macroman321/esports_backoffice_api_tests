const request = require('axios')
const assert = require('assert')

exports.getProviders = async function () {
  try {
    const response = await request({
      method: 'get',
      url: `${global.testData.url}/provider`,
      headers: {
        'Authorization': 'Bearer ' + global.testData.token
      }
    })
    return response
  } catch (err) {
    global.logger.debug(err)
    return err.response
  }
}

exports.getProvider = async function (id) {
  try {
    const response = await request({
      method: 'get',
      url: `${global.testData.url}/provider/${id}`,
      headers: {
        'Authorization': 'Bearer ' + global.testData.token
      }
    })

    return response
  } catch (err) {
    global.logger.debug(err)
    return err.response
  }
}

exports.createProvider = async function (name, expectedStatus) {
  let response

  const body = {}
  if (name !== undefined) { body['name'] = name }
  try {
    response = await request.post(
      `${global.testData.url}/provider`,
      body,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + global.testData.token
        }
      }
    )
  } catch (err) {
    global.logger.debug(err.response.data)
    response = err.response
  }

  assert.equal(
    expectedStatus,
    response.status,
    `Incorrect status code - ${response.status}`)

  return response
}

// ovde si stao magarče
exports.updateProvider = async function (
  id,
  name,
  active,
  expectedStatus
) {
  let response

  const body = {}
  if (id !== undefined) { body['id'] = id }
  if (name !== undefined) { body['name'] = name }

  try {
    response = await request.put(
      `${global.testData.url}/provider/${id}`,
      body,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + global.testData.token
        }
      }
    )
  } catch (err) {
    global.logger.error(err.response.data)
    response = err.response
  }

  assert.equal(
    expectedStatus,
    response.status,
    `Incorrect status code - ${response.status}`)

  return response
}
