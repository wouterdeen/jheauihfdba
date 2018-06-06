const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
let reports = JSON.parse(fs.readFileSync("./Reports.json", "utf8"))

module.exports.run = async (bot, message, args) => {
  let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  let reportkanaal = message.guild.channels.find(`name`, "moderatorchat");
  if(!rUser) return message.channel.send("Er is geen gebruiker opgegeven/de opgegeven gebruiker is onvindbaar. Gebruik: '!report <persoon> <reden>'.");

  if(!reports[rUser.id]) return message.channel.send("Deze gebruiker staat niet in de database en is dus nog nooit gereport.");

  let infoEmbed = new Discord.RichEmbed()
  .setDescription("Wat weergegeven wordt is alle informatie over de laatste report van deze gebruiker. Bij een nieuwe report over deze gebruiker zal deze informatie permanent gewist worden!")
  .setColor("#3158bc")
  .setThumbnail("http://www.mediafire.com/convkey/037f/2pke2ywnayng3nazg.jpg")
  .addField("Gebruiker", `<@${reports[rUser.id].gebruiker}>`)
  .addField("Rapporteerder", `<@${reports[rUser.id].rapporteerder}>`)
  .addField("Tijd", reports[rUser.id].tijd)
  .addField("Kanaal", reports[rUser.id].kanaal)
  .addField("Reden", reports[rUser.id].reden);

  message.channel.send(infoEmbed);
}

module.exports.help = {name: "reportinfo"}
