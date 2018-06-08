const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client({disableEveryone: true});
bot.commands = new Discord.Collection();


const badwords = ['fuk', 'fuck', 'fkcing', 'nigg', 'neger', 'cunt' ,'cnut' ,'bitch' ,'dick' ,'d1ck' ,'pussy' ,'asshole' ,'b1tch' ,'b!tch', 'bitch' ,'blowjob' ,'cock' ,'c0ck' ,'kkr' ,'kanker' ,'tyfus' ,'tievus' ,'tiefus' ,'tering' ,'homo' ,'gay' ,'neuk' ,'neuke' ,'kankr' ,'kenker' ,'seks' ,'s3ks' ,'sperm' ,'orgasm' ,'fking' ,'fcking' ,'fckn', 'fuck', 'fucking' ,'fucken' ,'s3x' ,'j3w' ,'cameltoe' ,'oraal' ,'kutje' ,'orale' ,'klaarkomen' ,'cum' ,'anaal' ,'penis' ,'piemel' ,'piemol'];
const invites = ['discord.gg/', 'discordapp.com/invite']
const reclame = ['youtube.com', 'youtu.be', 'twitch.tv']

fs.readdir("./Commands/", (err, files) => {
  if(err) console.log(err);
  let jsfile = files.filter(f => f.split(".").pop() === "js");
  if(jsfile.length <= 0) {
    console.log("Fout: er zijn geen commando's gevonden.");
    return;
  }
  jsfile.forEach((f, i) => {
    let props = require(`./Commands/${f}`);
    console.log(`${f} is ingeladen.`);
    bot.commands.set(props.help.name, props);
  });
});

bot.on("ready", async () => {
  console.log("Bot is online!");
  bot.user.setActivity("Roediementair", {type: "WATCHING"});
  /*/bot.user.setStatus("dnd")
  .then(console.log)
  .catch(console.error);/*/
});

bot.on("guildMemberAdd", member => {
  member.send("Welkom op de Roediementair Discord server! Ik ben de enige echte Roodster bot, en vanaf nu jouw persoonlijke assistent. 😎 Lees #welkom voordat je begint.\n\nHulp nodig? Typ '!help' in een willekeurig chatkanaal op onze server!");
});

bot.on("message", async message => {
  if(message.author.bot) return;
  if (message.channel.type === "dm") return message.channel.send("Je kunt mij helaas geen DM's sturen. Heb je een vraag? Typ dan '!help' in een chatkanaal.");

  let twitchclips = message.guild.channels.find(`name`, "twitch-clips");
  let memes = message.guild.channels.find(`name`, "memes");
  let roods = message.guild.channels.find(`name`, "roods-official");
  let subsnroods = message.guild.channels.find(`name`, "subs-en-roods");
  let twitchsubs = message.guild.channels.find(`name`, "twitchsubs-official");

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ")
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  let commandFile = bot.commands.get(cmd.slice(prefix.length));
  if(commandFile) commandFile.run(bot,message,args);

  //Chat auto mod systeem
  if(badwords.some(word => message.content.toLowerCase().includes(word))) {
    if(!message.member.hasPermission("ADMINISTRATOR")) {
      message.delete();
      message.author.send("Let een beetje op je taalgebruik. 😉");

      let botbesturing = message.guild.channels.find(`name`, "botbesturing");
      let swearEmbed = new Discord.RichEmbed()
      .setDescription("Een bericht van een gebruiker is verwijderd.")
      .setThumbnail("http://www.mediafire.com/convkey/ebb1/slt6kx95avxjyfszg.jpg")
      .setColor("#ff0000")
      .addField("Gebruiker", `<@${message.author.id}>`)
      .addField("Kanaal", message.channel.toString())
      .addField("Bericht", message)
      .addField("Reden", "Ongepast taalgebruik");;

      botbesturing.send(swearEmbed);
    }
  }
  if(reclame.some(word => message.content.toLowerCase().includes(word))) {
    if(!message.member.hasPermission("ADMINISTRATOR")) {
      if(message.channel != twitchclips || memes || roods || subsnroods || twitchsubs) {
        message.delete();
        message.author.send("Geen reclame!");

        let botbesturing = message.guild.channels.find(`name`, "botbesturing");
        let reclameEmbed = new Discord.RichEmbed()
        .setDescription("Een bericht van een gebruiker is verwijderd.")
        .setThumbnail("http://www.mediafire.com/convkey/ebb1/slt6kx95avxjyfszg.jpg")
        .setColor("#ff0000")
        .addField("Gebruiker", `<@${message.author.id}>`)
        .addField("Kanaal", message.channel.toString())
        .addField("Bericht", message)
        .addField("Reden", "Reclame maken (overig)");

        botbesturing.send(reclameEmbed);
      }
    }
  }
  if(invites.some(word => message.content.toLowerCase().includes(word))) {
    if(!message.member.hasPermission("ADMINISTRATOR")) {
      message.delete();
      message.author.send("Geen reclame!");

      let botbesturing = message.guild.channels.find(`name`, "botbesturing");
      let inviteEmbed = new Discord.RichEmbed()
      .setDescription("Een bericht van een gebruiker is verwijderd.")
      .setThumbnail("http://www.mediafire.com/convkey/ebb1/slt6kx95avxjyfszg.jpg")
      .setColor("#ff0000")
      .addField("Gebruiker", `<@${message.author.id}>`)
      .addField("Kanaal", message.channel.toString())
      .addField("Bericht", message)
      .addField("Reden", "Reclame maken (server invite)");

      botbesturing.send(inviteEmbed);
      }
    }
});

bot.login (botconfig.token);
