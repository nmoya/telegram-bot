const package = require('../../package.json')

const getVersion = (args) =>
  new Promise((resolve, reject) => {
    resolve(`Versão brasileira Herbert Richers... v${package.version}`)
  })

module.exports = {
  run: getVersion,
}
