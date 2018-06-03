const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  let sicon = message.guild.displayAvatarURL;
  let serverEmbed = new Discord.RichEmbed()
  .setDescription("Je bent blijkbaar ooit beland op de Roediementair Discord server. Hier kun je er alle informatie over terugvinden!")
  .setColor("#ef07d0")
  .setThumbnail(message.guild.displayAvatarURL)
  .setFooter("Fun fact: je kunt je vrienden inviten via www.discord.gg/roedie")
  .addField("Servernaam", message.guild.name + ". Ha! Dat wist je nog niet!")
  .addField("Geboren op", message.guild.createdAt)
  .addField("Mentairder geworden op", message.member.joinedAt + ". Dat ja. Eerst was je nog zo'n newbie, weet je wel? Maar nú ben je de next level mentairder!")
  .addField("Leeft samen met", message.guild.memberCount + " mentairders, om precies te zijn. Da's veel. 😮");

  message.channel.send(serverEmbed);
}

module.exports.help = {name: "serverinfo"}
