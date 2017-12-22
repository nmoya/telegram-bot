const package = require('../../package.json')

const getVersion = (args) =>
  new Promise((resolve, reject) => {
    resolve(`Versão brasileira Herbert Richers... v${package.version} (${package.description})`)
  })

module.exports = {
  run: getVersion,
}
