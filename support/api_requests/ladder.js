const request = require('axios')
const assert = require('assert')

exports.createLadder = async function (
  name,
  startDate,
  endDate,
  gameserver,
  expectedStatus
) {
  let response

  const body = {}
  if (name !== undefined) { body['name'] = name }
  if (startDate !== undefined) { body['startDate'] = startDate }
  if (endDate !== undefined) { body['endDate'] = endDate }
  if (gameserver !== undefined) { body['gameserver'] = gameserver }

  try {
    response = await request.post(
      `${global.testData.url}/ladder`,
      body,
      {
        headers: {
          'Accept': '*/*',
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
    response.status,
    expectedStatus,
    `Incorrect status code - ${response.status}`)

  return response
}

exports.getLadders = async function () {
  try {
    const response = await request({
      method: 'get',
      url: `${global.testData.url}/ladder`,
      headers: {
        'Authorization': `Bearer ${global.testData.token}`
      }
    })
    return response
  } catch (err) {
    global.logger.debug(err)
    return err.response
  }
}

exports.getLadder = async function (id) {
  try {
    const response = await request({
      method: 'get',
      url: `${global.testData.url}/ladder/${id}`,
      headers: {
        'Authorization': 'Bearer ' + global.testData.token
      }
    })
    return response
  } catch (err) {
    global.logger.debug(err)
  }
}

exports.deleteLadder = async function (id) {
  let response
  try {
    response = await request.delete(
      `${global.testData.url}/#/ladder/380`,
      {
        headers: {
          'Authorization': 'Bearer' + global.testData.token
        }
      })
    return response
  } catch (err) {
    global.logger.debug(err)
    throw err
  }
}

// exports.searchForDeletedLadder = async function (id) {
//   let response
//   try {
//     response = await request.delete(
//       `${global.testData.url}/ladder/${id}`,
//       {
//         headers: {
//           'Accept'
//         }
//       }
//     )
//   }
// }
