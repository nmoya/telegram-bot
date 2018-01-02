const weather = require('yahoo-weather')
const sprintf = require('sprintf').sprintf

const getWeatherInfo = (args) =>
  new Promise((resolve, reject) => {
    if (args.length > 0){
      const city = args.join(' ')
      weather(city)
      .then(data => {
        const resultCity = data.title.split(" - ")[1];
        const temperature = data.item.condition.temp
        const windSpeed = (data.wind.speed / 1.6).toFixed(0)
        const sunset = data.astronomy.sunset
        const sunrise = data.astronomy.sunrise
        const condition = data.item.condition.text
        resolve(
`${resultCity}
Temperatura: ${temperature}°C
Vento: ${windSpeed} km/h
Nascer do sol: ${sunrise}
Por do sol: ${sunset}
Condição: ${condition}`)
      }).catch(err => {
        reject('Hm.. Something went wrong in the weather code.')
      })
    } else {
      reject(`Wrong command weather. Didn't you forget the city name?`)
    }
  })

module.exports = {
  run: getWeatherInfo,
}
