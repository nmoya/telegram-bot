const polls = {}

const createPoll = (args) =>
  new Promise((resolve, reject) => {
    if (args.length <= 1) {
      reject(`Uso inválido do comando enquente. Rode: man enquete para aprender.`)
    } else {
      const pollId = args[0]
      const question = args.splice(1, args.length).join(" ")
      if (question[question.length-1] !== '?') {
        reject('A enquete deve fazer uma pergunta que termine com interrogação.')
      } else if (polls[pollId] !== undefined) {
        reject('O identificador desta enquete já está em uso. Escolha outro.')
      } else {
        polls[pollId] = {
          datetime: new Date(),
          question: question,
          options: [],
          votes: []
        }
        resolve(`Enquete criada! Adicione opcões com: opcao ${pollId} <texto da opcao>`)
      }
    }
  })

const createOption = (args) =>
  new Promise((resolve, reject) => {
    if (args.length <= 1) {
      reject(`Uso inválido do comando opcao. Rode: man enquete para aprender.`)
    } else {
      const pollId = args[0]
      const optionText = args.splice(1, args.length)
      if (polls[pollId] === undefined) {
        reject(`O identificador ${pollId} não existe. Verifique o comando.`)
      } else {
        const poll = polls[pollId]
        poll.options.push(optionText.join(" "))
        poll.votes.push(0)
        polls[pollId] = poll
        resolve(`Opção ${poll.options.length}) criada! Vote com: votar ${pollId} <numero>`)
      }
    }
  })

const createResultText = (poll) => {
  const totalVotes = poll.votes.reduce((acc, val) => acc + val, 0)
  return poll.options.reduce((acc, val, idx) => {
    const optionText = val
    const optionVotes = poll.votes[idx]
    const percentage = ((optionVotes && optionVotes/totalVotes || 0) * 100).toFixed(1)
    return `${acc}${idx+1}) ${val} ---> ${optionVotes} voto(s) (${percentage}%)\n`
  }, `Votos até o momento: ${totalVotes}\nOpções:\n`)
}

const castVote = (args) =>
  new Promise((resolve, reject) => {
    if (args.length === 0) {
      reject(`Uso inválido do comando votar. Rode: man enquete para aprender.`)
    } else {
      const pollId = args[0]
      const poll = polls[pollId]
      if (poll === undefined) {
        reject(`O identificador ${pollId} não existe. Verifique o comando.`)
      } else if (args.length === 1) {
        const optionsText = createResultText(poll)
        resolve(`${pollId}: ${poll.question}\n\n${optionsText}`)
      } else if (args.length === 2) {
        const vote = args[1]
        if (vote >= 1 && vote <= poll.options.length) {
          poll.votes[vote-1]+=1
          polls[pollId] = poll
          resolve(createResultText(poll))
        } else {
          reject(`Opção inválida de voto. Seu voto deve ser: >= 1 && <= ${poll.options.length}`)
        }
      } else {
        reject(`Comando votar precisa de apenas 2 argumentos. Verifique o comando.`)
      }
    }
  })

const getHelp = () => `Para criar uma enquete:
enquete <identificador> <pergunta da enquete>

Para adicionar uma opção na enquete:
opcao <identificador> <texto da opção>

Para votar na enquete:
votar <identificador> <numero da opção>

Para listar as opções e o resultado:
votar <identificador>
`

module.exports = {
  poll: createPoll,
  option: createOption,
  vote: castVote,
  help: getHelp
}
