let handler = async (m, { conn, args }) => {
  let sortedExp = Object.entries(global.DATABASE.data.users).sort((a, b) => b[1].exp - a[1].exp)
  let sortedLim = Object.entries(global.DATABASE.data.users).sort((a, b) => b[1].limit - a[1].limit)
  let usersExp = sortedExp.map(v => v[0])
  let usersLim = sortedLim.map(v => v[0])
  let len = args[0] && args[0].length > 0 ? Math.min(1000, Math.max(parseInt(args[0]), 5)) : Math.min(200, sortedExp.length)
  let text = `
π *ππππππ«ππ¨ππ«π πππ¦ππ§π­ππ«π*

β *ππ ππππππ«ππ¨ππ«π ππ¨π© π - ${len}* β’

βͺ πππ§π€π’π§π  kamu: *${usersExp.indexOf(m.sender) + 1}* πππ«π’ *${usersExp.length} User All*

${sortedExp.slice(0, len).map(([user, data], i) => (i + 1) + '. @' + user.split`@`[0] + ': *' + data.exp + ' Exp*').join`\n`}

============================================

β *ππ’π¦π’π­ ππππππ«ππ¨ππ«π ππ¨π© π - ${len}* β’

βͺ πππ§π€π’π§π  kamu: *${usersLim.indexOf(m.sender) + 1}* πππ«π’ *${usersLim.length} User All*

${sortedLim.slice(0, len).map(([user, data], i) => (i + 1) + '. @' + user.split`@`[0] + ': *' + data.limit + ' Limit*').join`\n`}

*Terus Aktif Menggunakan Bot Untuk Menjadi Top!*
α΅ΚΈ: α΄΄β±α΅Λ’
`.trim()
  conn.reply(m.chat, text, m, {
    contextInfo: {
      mentionedJid: [...usersExp.slice(0, len), ...usersLim.slice(0, len)]
    }
  })
}
handler.help = ['leaderboard [jumlah user]', 'lb [jumlah user]']
handler.tags = ['xp']
handler.command = /^(leaderboard|lb)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null
handler.exp = 3

module.exports = handler

