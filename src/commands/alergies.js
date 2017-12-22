const getAlergies = (args) =>
  new Promise((resolve, reject) => {
    resolve(
`
Bruno: Fígado
Camila: Abacaxi, Camarão e Lactose
Daniele: Canela
Mattioli: Beterraba
Pamela: Ácido Acetilsalicílico e Picanha
`)
  })

module.exports = {
  run: getAlergies,
}
