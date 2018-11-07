const request = require('axios')
const assert = require('assert')

exports.createGameserver = async function (
  name,
  provider,
  keywords,
  expectedStatus
) {
  let response

  try {
    response = await request.post(
      `${global.testData.url}/gameservers`,
      {
        name: name,
        keywords: keywords,
        provider: {
          'id': provider
        }
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + global.testData.token
        }
      }
    )
  } catch (err) {
    global.logger.error(err)
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
    global.logger.error(err)
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
    global.logger.error(err)
    return err.response
  }
}
