const Discord = require("discord.js");

function getDateTime() {
    var date = new Date();

    var hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;

    var min  = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;

    var sec  = date.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;

    var year = date.getFullYear();

    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;

    var day  = date.getDate();
    day = (day < 10 ? "0" : "") + day;

    return day + "/" + month + "/" + year + " om " + hour + ":" + min + " en " + sec + " seconden";
}

module.exports.run = async (bot, message, args) => {
  let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!rUser) return message.channel.send("Er is geen gebruiker opgegeven/de opgegeven gebruiker is onvindbaar. Gebruik: '!report <persoon> <reden>'.");
  let reason = args.join(" ").slice(22);
  if(!reason) return message.channel.send("Je moet een reden opgeven. Gebruik: '!report <persoon> <reden>'.");

  let reportEmbedUser = new Discord.RichEmbed()
  .setDescription("Je hebt net een gebruiker gerapporteerd. Let op: zorg dat je DM's open staan zodat wij je een berichtje kunnen sturen wanneer we meer informatie nodig hebben.")
  .setColor("#ff0000")
  .addField("Gebruiker", `${rUser}`)
  .addField("Tijd van rapportage", getDateTime())
  .addField("Reden", reason)

  let reportEmbedModerator = new Discord.RichEmbed()
  .setDescription("Er is net een gebruiker gerapporteerd.")
  .setColor("#ff0000")
  .addField("Desbetreffende gebruiker", `${rUser} met het ID ${rUser.id}`)
  .addField("Rapporteerder", message.author)
  .addField("Tijd van rapportage", getDateTime())
  .addField("Reden", reason)

  message.delete().catch(O_o=>{});
  message.author.send(reportEmbedUser);

  let reportkanaal = message.guild.channels.find(`name`, "staff");
  if(!reportkanaal) return message.channel.send("Fout: error 1 (kon).")

  reportkanaal.send(reportEmbedModerator);
}

module.exports.help = {name: "report"}
