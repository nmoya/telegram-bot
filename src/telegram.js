const { TelegramClient } = require('messaging-api-telegram');
const apiKeys = require('../apiKeys.json')

const newClient = (webHook) => {
  const client = TelegramClient.connect(apiKeys.token)
  client.setWebhook(webHook)
  client.getWebhookInfo().then((info) => console.log(info))
  return client;
}

module.exports = {
  new: newClient
}
