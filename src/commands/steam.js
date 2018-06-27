const requestLib = require('request')
const STEAM_GAMES_URL = 'http://api.steampowered.com/ISteamApps/GetAppList/v0002/'
const STEAM_PRICE_URL = 'https://store.steampowered.com/api/appdetails?cc=de&appids='
const EXACT_ARG = '--exact'
const CURRENCY_ARG = '--currency='
const DEFAULT_CURRENCY = 'EUR'
const VALID_CURRENCIES = {
  'EUR': 'de',
  'BRL': 'br',
  'USD': 'us'
}
let STEAM_DB = null;

const steamDbRequest = () =>
  new Promise((resolve, reject) => {
    if (STEAM_DB != null) {
      resolve(STEAM_DB)
      return;
    }
    requestLib(STEAM_GAMES_URL, (error, response, body) => {
      const rawResponse = JSON.parse(body)
      const catalog = rawResponse.applist.apps;
      STEAM_DB = catalog;
      resolve(catalog)
    })
  })

const formatPriceNumber = (number) => {
  const stringPrice = number.toString()
  const dotOffset = stringPrice.length - 2;
  const preliminaryResult = stringPrice.slice(0, dotOffset) + '.' + stringPrice.slice(dotOffset, stringPrice.length)
  if (preliminaryResult.startsWith('.'))
    return '0' + preliminaryResult
  else
    return preliminaryResult
}

const formatPrice = (price_overview) => {
  const final = price_overview.final
  const discount = price_overview.discount_percent
  const currency = price_overview.currency
  const string = formatPriceNumber(final) + " " + currency
  if (discount != 0) {
    return `(${discount}% Off!) ${string}`
  }
  return string
}

const getPrice = (game, currency) => {
  return new Promise((resolve, reject) => {
    const customUrl = STEAM_PRICE_URL.replace("cc=de", `cc=${currency}`)
    requestLib(customUrl + game.appid, (error, response, body) => {
      const gameInfo = JSON.parse(body)
      if (gameInfo
          && gameInfo[game.appid]
          && gameInfo[game.appid].data
          && gameInfo[game.appid].data.type
          && gameInfo[game.appid].data.price_overview) {
        const gameData = gameInfo[game.appid].data
        if (gameData.type != 'game' && gameData.type != 'dlc') {
          resolve(null)
        } else {
          resolve(`${game.name}\n${formatPrice(gameData.price_overview)}\n`)
        }
      }
      else {
        resolve(null)
      }
    })
  })
}

const processGame = (givenName, exact, currency) =>
  new Promise((resolve, reject) => {
    steamDbRequest().then((catalog) => {
      const games = catalog.filter((game) => {
        const gameName = game.name.toLowerCase()
        if (exact) {
          return gameName == givenName.toLowerCase()
        } else {
          return gameName.startsWith(givenName.toLowerCase())
        }
      })
      if (games.length === 0) {
        reject(`Game not found. Double check if the name really starts with: '${givenName}'`)
      } else if (games.length > 5) {
        reject("Too many results:\n" + games.map((game) => game.name).join("\n"))
      } else {
        const promises = []
        games.forEach((game) => {
          promises.push(getPrice(game, currency))
        });
        Promise.all(promises).then((results) => {
          valid = results.filter((result) => result != null)
          if (valid.length === 0) {
            reject("Doesn't work for this game")
          } else {
            resolve(valid.join('\n'))
          }
        })
        .catch((error) => {
          reject("Something unexpected happened. Don't try again.")
        })
      }
    })
  })

const isExact = (args) => {
  const exact = args.filter((arg) => arg.toLowerCase() === EXACT_ARG)
  return exact.length != 0
}

const getCurrency = (args) => {
  const currency = args.filter((arg) => arg.toLowerCase().startsWith(CURRENCY_ARG))
  if (currency.length != 0) {
    const parts = currency[0].split("=")
    const givenCurrency = parts[parts.length-1]
    return VALID_CURRENCIES[givenCurrency.toUpperCase()]
  } else {
    return VALID_CURRENCIES[DEFAULT_CURRENCY]
  }
}

const getGamePrice = (args) =>
  new Promise((resolve, reject) => {
    if (args.length == 0) {
      reject('You need to specify the game name or command')
    } else if (args[0] == 'wishlist') {
      // TODO: Implement wishlist
    } else {
      const currency = getCurrency(args)
      if (currency === undefined) {
        reject("Invalid currency, please use: " + Object.keys(VALID_CURRENCIES).join(", "))
        return
      }
      args = args.filter((arg) => !arg.toLowerCase().startsWith(CURRENCY_ARG))

      const exact = isExact(args)
      if (exact) {
        args = args.filter((arg) => arg.toLowerCase() != EXACT_ARG)
      }

      const gameName = args.join(" ")
      processGame(gameName, exact, currency)
        .then((result) => {
          resolve(result)
        })
        .catch((error) => {
          if (error.length > 4024) {
            reject("Too many options, refine your search")
          } else {
            reject(error)
          }
        })
    }
  })

const getHelp = () => `Commando steam:
Uso básico:
steam <nome do jogo>

Uso busca exata:
steam <nome do jogo> --exact

Uso moeda especifica (USD, EUR, BRL, etc):
steam <nome do jogo> --currency=BRL

Todos juntos:
steam <nome do jogo> --currency=BRL --exact
`

module.exports = {
  run: getGamePrice,
  help: getHelp,
}
