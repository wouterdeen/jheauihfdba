const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  let boticon = bot.user.displayAvatarURL;

  let botEmbed = new Discord.RichEmbed()
  .setDescription("Beep beep boop.")
  .setColor("#ef8e07")
  .setThumbnail(boticon)
  .setFooter("Ik heb geen moeder btw")
  .addField("Naam", bot.user.username)
  .addField("Geboren op", "2/6/2018 om 13:58")
  .addField("Gewicht bij geboorte", "2,73 megabytes")
  .addField("Papa", "Brickconomy (Wouter)")
  .addField("Versie", "v0.2 (Beta)");

  return message.channel.send(botEmbed);
}

module.exports.help = {name: "botinfo"}
