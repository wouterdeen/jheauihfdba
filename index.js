const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client({disableEveryone: true});
bot.commands = new Discord.Collection();

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
});

bot.login (botconfig.token);
