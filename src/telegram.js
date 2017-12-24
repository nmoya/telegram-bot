const { TelegramClient } = require('messaging-api-telegram');
let apiKeys;
try {
  apiKeys = require('../apiKeys.json')
} catch (e) {
  apiKeys = {token: process.env.TELEGRAM_KEY};
}


const newClient = (webHook) => {
  const client = TelegramClient.connect(apiKeys.token)
  client.setWebhook(webHook)
  client.getWebhookInfo().then((info) => console.log(info))
  return client;
}

module.exports = {
  new: newClient
}
