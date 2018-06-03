const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  let helpEmbed = new Discord.RichEmbed()
  .setDescription("Hey, " + message.author.username + ". Heb je hulp nodig? Volg de onderstaande doorwijzingen.")
  .setColor("85ba5b")
  .setThumbnail(message.guild.displayAvatarURL)
  .setFooter("Groetjes, je favoriete persoonlijke assistent. 😎")
  .addField("1. Hulp met commando's", "Alle commando's samen met de betekenis ervan staan opgesomd in het #commands tekstkanaal, onder de '🎓Informatie' kanaalcategorie.")
  .addField("2. Ik wil iemand rapporteren", "Om dit te doen moet je een Moderator een berichtje sturen via Discord of ons contacteren via Twitter. Het is verplicht bewijsmateriaal mee te sturen (audio/video-opname, screenshot e.d.).")
  .addField("3. Ik heb een andere of persoonlijke vraag, idee of reactie", "Deze kun je naar ons sturen via Twitter");

  message.author.send(helpEmbed);
}

module.exports.help = {name: "help"}
