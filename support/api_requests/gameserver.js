const request = require('axios')
const assert = require('assert')

exports.createGameserver = async function (
  name,
  provider,
  keywords,
  expectedStatus
) {
  let response

  body = {}
  if (name !== undefined) { body['name'] = name }
  if (provider !== undefined) { body['provider'] = {'id': provider} }
  if (keywords !== undefined) { body['keywords'] = keywords }

  try {
    response = await request.post(
      `${global.testData.url}/gameservers`,
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

exports.updateGameserver = async function (
  id,
  name,
  active,
  provider,
  keywords,
  expectedStatus
) {
  let response

  body = {}
  if (name !== undefined) { body['name'] = name }
  if (active !== undefined) { body['active'] = active }
  if (provider !== undefined) { body['provider'] = {'id': provider} }
  if (keywords !== undefined) { body['keywords'] = keywords }

  try {
    response = await request.put(
      `${global.testData.url}/gameservers/${id}`,
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

exports.getGameservers = async function () {
  try {
    const response = await request({
      method: 'get',
      url: `${global.testData.url}/gameservers`,
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

exports.getGameserver = async function (id) {
  try {
    const response = await request({
      method: 'get',
      url: `${global.testData.url}/gameservers/${id}`,
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
