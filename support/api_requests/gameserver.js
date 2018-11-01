const axios = require('axios')

exports.getGameservers = async function () {
  try {
    const response = await axios({
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
    const response = await axios({
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
