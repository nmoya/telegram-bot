const emoji = {
  "innocent": `ʘ‿ʘ`,
  "reddit disapproval": `ಠ_ಠ`,
  "table flip": "(╯°□°）╯︵ ┻━┻",
  "double angry": "┻━┻ ︵ヽ(`Д´)ﾉ︵﻿ ┻━┻",
  "fisticuffs": "ლ(｀ー´ლ)",
  "cute bear": "ʕ•ᴥ•ʔ",
  "squinting bear": "ʕᵔᴥᵔʔ",
  "cute face with big eyes": "(｡◕‿◕｡)",
  "surprised / loudmouthed": "（　ﾟДﾟ）",
  "shrug face": "¯\_(ツ)_/¯",
  "meh": `¯\(°"_o)/¯`,
  "feel perky": "(`･ω･´)",
  "angry face": "(╬ ಠ益ಠ)",
  "excited": "☜(⌒▽⌒)☞",
  "happy face": "ヽ(´▽`)/",
  "basking in glory": "ヽ(´ー｀)ノ",
  "kitty": "ᵒᴥᵒ#",
  "fido": "V●ᴥ●V",
  "meow": `ฅ^•ﻌ•"^ฅ`,
  "cheers": `（ ^_^）o"自自o（^_^ ）`,
  "devious": "ಠ‿ಠ",
  "4chan": "( ͡° ͜ʖ ͡°)",
  "crying face": "ಥ_ಥ",
  "breakdown": "ಥ﹏ಥ",
  "disagree": "٩◔̯◔۶",
  "flexing": "ᕙ(⇀‸↼‶)ᕗ",
  "do you even lift bro?": "ᕦ(ò_óˇ)ᕤ",
  "kirby": `"⊂(◉‿◉)"つ`,
  "tripping out": "q(❂‿❂)p",
  "discombobulated": "⊙﹏⊙",
  "sad and confused": "¯\_(⊙︿⊙)_/¯",
  "japanese lion face": "°‿‿°",
  "confused": "¿ⓧ_ⓧﮌ",
  "confused scratch": "(⊙.☉)7",
  "worried": "(´･_･`)",
  "dear god why": "щ（ﾟДﾟщ）",
  "staring": "٩(͡๏_๏)۶",
  "pretty eyes": "ఠ_ఠ",
  "strut": `ᕕ( ᐛ )"ᕗ`,
  "zoned": "(⊙_◎)",
  "crazy": "ミ●﹏☉ミ",
  "trolling": `༼∵༽ ༼⍨༽ ༼"⍢༽ ༼⍤༽`,
  "angry troll": "ヽ༼ ಠ益ಠ ༽ﾉ",
  "fuck it": "t(-_-t)",
  "sad face": "(ಥ⌣ಥ)",
  "hugger": `(づ￣ ³￣)"づ`,
  "stranger danger": "(づ｡◕‿‿◕｡)づ",
  "flip friend": `(ノಠ ∩ಠ)ノ彡( \"o°o)\``,
  "cry face": `｡ﾟ( ﾟஇ‸இﾟ")ﾟ｡`,
  "cry troll": "༼ ༎ຶ ෴ ༎ຶ༽",
  "tgif": `“ヽ(´▽"｀)ノ”`,
  "dancing": "┌(ㆆ㉨ㆆ)ʃ",
  "sleepy": "눈_눈",
  "angry birds": "( ఠൠఠ )ﾉ",
  "no support": `乁( ◔ ౪◔)「  "    ┑(￣Д ￣)┍`,
  "shy": `(๑•́" ₃ •̀๑)`,
  "fly away": `⁽⁽ଘ( ˊᵕˋ ")ଓ⁾⁾`,
  "careless": "◔_◔",
  "love": "♥‿♥",
  "Touchy Feely": "ԅ(≖‿≖ԅ)",
  "kissing": "( ˘ ³˘)♥",
  "shark face": "( ˇ෴ˇ )",
  "emo dance": "ヾ(-_- )ゞ",
  "dance": `♪♪ ヽ(ˇ"∀ˇ )ゞ`,
  "winnie the pooh": "ʕ •́؈•̀ ₎",
  "boxing": "ლ(•́•́ლ)",
  "robot": `{•̃_•̃"}`,
  "seal": "(ᵔᴥᵔ)",
  "questionable": "(Ծ‸ Ծ)",
  "winning": `"(•̀ᴗ•́)و" ̑̑`,
  "zombie": "[¬º-°]¬",
  "pointing": "(☞ﾟヮﾟ)☞",
  "running away": "''⌐(ಠ۾ಠ)¬'''",
  "music": "(っ•́｡•́)♪♬",
  "injured": "(҂◡_◡)",
  "creeper": `ƪ(ړײ)‎ƪ​`,
  "eye roll": "⥀.⥀",
  "flying": "ح˚௰˚づ",
  "cannot be unseen": "♨_♨",
  "looking down": "(._.)",
  "hugger": "(⊃｡•́‿•̀｡)⊃",
  "wizard": `(∩｀-´)⊃"━☆ﾟ.*･｡ﾟ`,
  "yum": `(っ˘ڡ"˘ς)`,
  "judging": `( ఠ ͟ʖ ఠ")`,
  "older": "( ͡ಠ ʖ̯ ͡ಠ)",
  "depressed": "( ಠ ʖ̯ ಠ)",
}


const getAsciiEmoji = (args) =>
  new Promise((resolve, reject) => {
    if (args.length > 0) {
      const query = args.join(' ')
      const ascii = emoji[query];
      if (ascii) {
        resolve(ascii)
      } else {
        reject('Wrong ascii code.')
      }
    } else {
      reject('Empty arguments for ascii. Example: ascii meow')
    }
  })

module.exports = {
  run: getAsciiEmoji,
}
