const replyFeliz = (args) =>
  new Promise((resolve, reject) => {
    if (args.length > 0){
      const felizContent = args.join(' ')
      resolve(`Feliz ${felizContent}`)
    } else {
      reject(false)
    }
  })

module.exports = {
  run: replyFeliz,
}
