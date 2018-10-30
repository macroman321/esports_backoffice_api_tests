const axios = require('axios')

exports.getGameservers = async function () {
  try {
    const response = await axios({
        method: 'get',
        url: `${testData.url}/gameservers`,
        headers: {
            'Authorization': 'Bearer ' + testData.getToken()
        }
    })
    return response
  } catch (err) {
      // console.log('-----error-------------------------------')
      // console.log(err)
      // console.log('------------------------------------')
      return err.response
  }
}