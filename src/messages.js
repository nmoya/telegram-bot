const cmdVersion = require('./commands/version')
const cmdWeather = require('./commands/weather')
const cmdDaew = require('./commands/daew')

const commands = {
  "weather": cmdWeather.run,
  "tempo": cmdWeather.run,
  "version": cmdVersion.run,
  "versao": cmdVersion.run,
  "daew": cmdDaew.run,
  "dae": cmdDaew.run,
}

const parseMessage = (message) => {
  const text = message.text
  const segments = text.replace('\n', ' ').split(' ')
  const command = segments[0]
  segments.shift()
  return {
    "command": command.toLowerCase(),
    "args": segments
  }
}

const execute = (message) => {
  return new Promise ((resolve, reject) => {
    const func = commands[message.command]
    if (func) {
      func(message.args).then((result) => {
        resolve(result)
      }).catch((reason) => {
        reject(reason)
      })
    } else {
      reject(false)
    }
  })

}

const handleMessage = (rawMessage) => {
  return new Promise((resolve, reject) => {
    const message = parseMessage(rawMessage)
    console.log(`Running ${message.command} on ${message.args}`)
    execute(message)
    .then((result) => {
      resolve(result)
    }).catch((error) => {
      reject(error)
    })
  })
}

module.exports = {
  handleMessage: handleMessage
}
