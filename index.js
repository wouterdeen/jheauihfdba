const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client({disableEveryone: true});
bot.commands = new Discord.Collection();


const trig = ['fuk', 'fuck', 'fkcing', 'nigg', 'neger', 'cunt' ,'cnut' ,'bitch' ,'dick' ,'d1ck' ,'pussy' ,'asshole' ,'b1tch' ,'b!tch', 'bitch' ,'blowjob' ,'cock' ,'c0ck' ,'kkr' ,'kanker' ,'tyfus' ,'tievus' ,'tiefus' ,'tering' ,'homo' ,'gay' ,'neuk' ,'neuke' ,'kker' ,'kankr' ,'kenker' ,'seks' ,'s3ks' ,'sex' ,'sperm' ,'orgasm' ,'fking' ,'fcking' ,'fckn', 'fuck', 'fucking' ,'fucken' ,'s3x' ,'jew' ,'j3w' ,'cameltoe' ,'oraal' ,'kutje' ,'orale' ,'klaarkomen' ,'cum' ,'anaal' ,'penis' ,'piemel' ,'piemol' ,'veluws college' ,'walterbosch'];

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
  bot.user.setStatus("dnd")
  .then(console.log)
  .catch(console.error);
});

bot.on("guildMemberAdd", member => {
  member.send("Welkom op de Roediementair Discord server! Ik ben de enige echte Roodster bot, en vanaf nu jouw persoonlijke assistent. 😎 Lees #welkom voordat je begint.");
});

bot.on("message", async message => {
  if(message.author.bot) return;
  if (message.channel.type === "dm") return;

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ")
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  let commandFile = bot.commands.get(cmd.slice(prefix.length));
  if(commandFile) commandFile.run(bot,message,args);

  if(trig.some(word => message.content.toLowerCase().includes(word))) {
    message.delete();
    message.author.send("Let een beetje op je taalgebruik. 😉");

    let botbesturing = message.guild.channels.find(`name`, "botbesturing");
    let swearEmbed = new Discord.RichEmbed()
    .setDescription("Een bericht van een gebruiker is verwijderd.")
    .setThumbnail("http://www.mediafire.com/convkey/ebb1/slt6kx95avxjyfszg.jpg")
    .setColor("#ff0000")
    .addField("Gebruiker", message.author.username)
    .addField("Bericht", message);

    botbesturing.send(swearEmbed);
  }
});

bot.login (botconfig.token);
