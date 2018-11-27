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
  // out: daca+180330163020@mail.com
  return 'qa.at_user_100@gamecredits.com'
}

exports.createUniqueGameserverName = function () {
  const d = new Date()
  return 'qags' + d.getTime()
}

exports.createUniqueProviderName = function () {
  const d = new Date()
  return 'qapro' + d.getTime()
}
