// sleep as Promise
//
// Usage with async-await:
// await sleep(2000);
//
// Usage with promise:
// (todo)
exports.sleep = function (milliseconds) {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

exports.emailTimestamp = function (email) {
  // in: daca@mail.com
  // out: daca+timestamp@mail.com
  const parts = email.split('@')
  return `${parts[0]}+${global.createTimestamp()}@${parts[1]}`
}

exports.makeMatchId = function (idLength = 7) {
  let text = ''
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  for (let i = 0; i < idLength; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return text
}

exports.generateName = function (nameLength = 10) {
  let text = ''
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  for (let i = 0; i < nameLength; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return text
}

/*
Create timestamp as number of milliseconds since 1970/01/01
*/
exports.createTimestamp = function () {
  var d = new Date()
  return d
}

exports.createUniqueGameserverName = function () {
  return 'qags' + global.createTimestamp()
}

exports.createUniqueProviderName = function () {
  const d = new Date()
  return 'qapro' + d.getTime()
}
