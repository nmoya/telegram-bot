const cmdVersion = require('./version')
const cmdWeather = require('./weather')
const cmdDaew = require('./daew')
const cmdAscii = require('./emoji')
const cmdAlergies = require('./alergies')
const cmdFeliz = require('./feliz')
const cmdPoll = require('./poll')

const getMan = (args) =>
  new Promise((resolve, reject) => {
    if (args.length == 1) {
      const func = manCommands[args[0]]
      if (func) {
        resolve(func())
      } else {
        reject(`Sorry, *${args[0]}* doesn't have a manual page.`)
      }
    } else {
      reject(`Wrong usage of man command. Try: man emoji`)
    }
  })

const commands = {
  "weather": cmdWeather.run,
  "tempo": cmdWeather.run,
  "version": cmdVersion.run,
  "versao": cmdVersion.run,
  "daew": cmdDaew.run,
  "dae": cmdDaew.run,
  "emoji": cmdAscii.run,
  "man": getMan,
  "alergias": cmdAlergies.run,
  "feliz": cmdFeliz.run,
  "enquete": cmdPoll.poll,
  "poll": cmdPoll.poll,
  "opcao": cmdPoll.option,
  "option": cmdPoll.option,
  "votar": cmdPoll.vote,
  "vote": cmdPoll.vote
}

const manCommands = {
  "emoji": cmdAscii.help,
  "man": () => "Nice try ;)\nUsage: man <command>",
  "poll": cmdPoll.help,
  "enquete": cmdPoll.help
}


module.exports = {
  commands: commands,
  manCommands: manCommands,
}
