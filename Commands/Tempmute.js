const Discord = require("discord.js");
const ms = require("ms");

module.exports.run = async (bot, message, args) => {
  let botbesturing = message.guild.channels.find(`name`, "botbesturing");
  if(message.channel == botbesturing) {
    let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!tomute) return message.channel.send("Vul een (geldige) gebruiker in. Is de ingevulde gebruiker de server geleavt?");

    if(tomute.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Die persoon kun je natuurlijk niet muten xD");

    let muterole = message.guild.roles.find(`name`, "Gemute");
    //rol aanmaken
    if(!muterole){
      try{
        muterole = await message.guild.createRole({
          name: "Gemute",
          color: "#000000",
          permissions:[]
        })
        message.guild.channels.forEach(async (channel, id) => {
          await channel.overwritePermissions(muterole, {
            SEND_MESSAGES: false,
            ADD_REACTIONS: false
          });
        });
      }catch(e){
        console.log(e.stack);
      }
    }
    //einde rol aanmaken
    let mutetime = args[1];
    if (!mutetime) return message.channel.send("Geef een geldige tijd op.");
    await(tomute.addRole(muterole.id));

    let muteEmbed = new Discord.RichEmbed()
    .setDescription("Een gebruiker is gemute.")
    .setColor("#ff0000")
    .setThumbnail("http://www.mediafire.com/convkey/037f/2pke2ywnayng3nazg.jpg")
    .addField("Gebruiker", `<@${tomute.id}>`)
    .addField("Moderator", `<@${message.author.id}>`)
    .addField("Tijd", mutetime);

    let unmuteEmbed = new Discord.RichEmbed()
    .setDescription("Een gebruiker is automatisch geunmute.")
    .setColor("#1cd81c")
    .setThumbnail("http://www.mediafire.com/convkey/68eb/i9sqlmdze74aakazg.jpg")
    .addField("Gebruiker", `<@${tomute.id}>`)
    .addField("Moderator", `<@${message.author.id}>`)
    .addField("Tijd", mutetime);

    let muteEmbedUser = new Discord.RichEmbed()
    .setDescription("Je bent gemute.")
    .setColor("#ff0000")
    .setThumbnail("http://www.mediafire.com/convkey/037f/2pke2ywnayng3nazg.jpg")
    .addField("Gebruiker", `Jij`)
    .addField("Tijd", mutetime);

    let unmuteEmbedUser = new Discord.RichEmbed()
    .setDescription("Je bent geunmute.")
    .setColor("#1cd81c")
    .setThumbnail("http://www.mediafire.com/convkey/68eb/i9sqlmdze74aakazg.jpg")
    .addField("Gebruiker", `Jij`)
    .addField("Tijd", mutetime);

    tomute.send(muteEmbedUser);

    if(!botbesturing) {
      message.channel.send("Fout: error 3 (kon kanaal niet vinden).");
    } else {
      botbesturing.send(muteEmbed);
    }

    setTimeout(function(){
      tomute.removeRole(muterole.id);
      tomute.send(unmuteEmbedUser);
      botbesturing.send(unmuteEmbed);
    }, ms(mutetime));
  } else {
      console.log("geen botbesturing")
      message.delete();
  }
}

module.exports.help = {name: "tempmute"}
