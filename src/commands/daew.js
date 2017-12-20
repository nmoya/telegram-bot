const getDaew = (args) =>
  new Promise((resolve, reject) => {
    resolve(`Daew!`)
  })

module.exports = {
  run: getDaew,
}
