const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  let helpEmbed = new Discord.RichEmbed()
  .setDescription("Hey, " + message.author.username + ". Heb je hulp nodig? Hieronder staan een paar doorverwijzingen.")
  .setColor("85ba5b")
  .setThumbnail("http://www.mediafire.com/convkey/ce42/68ihq79cjo5h9y9zg.jpg")
  .setFooter("Groetjes, je favoriete persoonlijke assistent. 😎")
  .addField("1. Hulp met commando's", "Alle commando's samen met de betekenis ervan staan opgesomd in het #commands tekstkanaal, onder de '🎓Informatie' kanaalcategorie.")
  .addField("2. Ik wil iemand rapporteren", "Gebruik '!report <gebruiker> <reden>'. Geen zorgen, je bericht wordt automatisch meteen weer verwijderd. Vlak na je rapportage krijg je een DM met alle informatie.")
  .addField("3. Ik heb een andere of persoonlijke vraag, idee of reactie", "Deze kun je naar ons sturen via Twitter.");

  message.delete();
  message.author.send(helpEmbed);
}

module.exports.help = {name: "help"}
