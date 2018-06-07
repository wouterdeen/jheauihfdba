const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
let reports = JSON.parse(fs.readFileSync("./Reports.json", "utf8"));

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
  let reportkanaal = message.guild.channels.find(`name`, "reports");
  if(!rUser) return message.channel.send("Er is geen gebruiker opgegeven/de opgegeven gebruiker is onvindbaar. Gebruik: '!report <persoon> <reden>'.");
  let reason = args.join(" ").slice(22);
  if(!reason) return message.channel.send("Je moet een reden opgeven. Gebruik: '!report <persoon> <reden>'.");

  if(!reportkanaal) {
    message.channel.send("Fout: error 1 (kon kanaal niet vinden).");
  } else {

    let reportEmbedUser = new Discord.RichEmbed()
    .setDescription("Je hebt net een gebruiker gerapporteerd. Let op: zorg dat je DM's open staan zodat wij je een berichtje kunnen sturen wanneer we meer informatie nodig hebben.")
    .setColor("#ff0000")
    .setThumbnail("http://www.mediafire.com/convkey/87df/i8mzru41bcvzbztzg.jpg")
    .addField("Gebruiker", `${rUser}`)
    .addField("Tijd van rapportage", getDateTime())
    .addField("Reden", reason);

    let reportEmbedModerator = new Discord.RichEmbed()
    .setDescription("Er is net een gebruiker gerapporteerd.")
    .setColor("#ff0000")
    .setThumbnail("http://www.mediafire.com/convkey/87df/i8mzru41bcvzbztzg.jpg")
    .addField("Desbetreffende gebruiker", `${rUser} met het ID ${rUser.id}`)
    .addField("Rapporteerder", message.author)
    .addField("Tijd van rapportage", getDateTime())
    .addField("Kanaal", message.channel.toString())
    .addField("Reden", reason);

    if(!reports[rUser.id]) reports[rUser.id] = {
      gebruiker: rUser.id,
      rapporteerder: message.author.id,
      tijd: getDateTime(),
      kanaal: message.channel.toString(),
      reden: reason
    };

    reports[rUser.id].gebruiker;
    reports[rUser.id].rapporteerder;
    reports[rUser.id].tijd;
    reports[rUser.id].kanaal;
    reports[rUser.id].reden;

    fs.writeFile("./Reports.json", JSON.stringify(reports), (err) => {
      if (err) console.log(err);
    });

    setTimeout(function(){
      if(![rUser.id]) {
        console.log("De recent nieuwe informatie (reports) is NIET naar 'Reports.json' geschreven!");
      } else {
        console.log("De recent nieuwe informatie (reports) is succesvol naar 'Reports.json' geschreven!");
      }
    }, 400);

    message.delete().catch(O_o=>{});
    message.author.send(reportEmbedUser);
    reportkanaal.send(reportEmbedModerator);
  }
}

module.exports.help = {name: "report"}
