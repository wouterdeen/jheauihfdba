const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  let boticon = bot.user.displayAvatarURL;

  let botEmbed = new Discord.RichEmbed()
  .setDescription("Wat is deze bot wollah")
  .setColor("#ef8e07")
  .setThumbnail(boticon)
  .addField("Naam", bot.user.username)
  .addField("Geboren op", bot.user.createdAt)
  .addField("Favoriete game", "Krullensimulator 3000");

  return message.channel.send(botEmbed);
}

module.exports.help = {name: "botinfo"}
