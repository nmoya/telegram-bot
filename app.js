const express = require('express')
const app = express()
const PORT = process.env.PORT || 5000;
const bodyParser = require('body-parser')
const messages = require('./src/messages')
const TelegramClient = require('./src/telegram')

const getChatId = (message) => {
  return message.chat.id;
}

const start = (webhookUrl) => {
  const client = TelegramClient.new(webhookUrl)
  app.use(bodyParser.json())
  app.get('/', (req, res) => {
    res.send("It works!!!")
  })
  app.post('/', (req, res) => {
      const message = req.body.message;
      console.log(message)
      if (message && message.text) {
        const chatId = getChatId(message)
        messages.handleMessage(message)
        .then((response) => {
          client.sendMessage(chatId, response)
          res.sendStatus(200)
        }).catch((reason) => {
          if (reason) {
            client.sendMessage(chatId, `[ERROR] ${reason}`)
          }
          res.sendStatus(200)
        })
      } else {
        res.sendStatus(200)
      }
  })
  app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))
}

const main = () => {
  if (process.argv.length != 3) {
    console.log("Calling with wrong number of arguments.")
    console.log("node app.js <webhookUrl>")
    process.exit(1);
  } else {
    const webhookUrl = process.argv[2];
    console.log(`Webhook: ${webhookUrl}\nPort: ${PORT}`)
    start(webhookUrl)
  }
}

main()
