const Discord = require("discord.js");
const client = new Discord.Client({intents: Object.values(Discord.Intents.FLAGS)})
const AsciiTable = require('ascii-table')
const fs = require("fs");
const { prefix, token} = require('./config.json');

var table = new AsciiTable('Bot is Activate')
table
  .setBorder('*')
  .setHeading('Command ', 'and', 'Event')
  .addRow('active', 'in', 'activate')
console.log(table.toString())

client.commands = new Discord.Collection();
fs.readdir("./commands/", (err, files) => {
    if (err) console.log(err);
    let jsfile = files.filter(f => f.split(".").pop() === "js");
    if (jsfile.length <= 0) {
        return console.log("Impossible de trouver des commandes");
    }
    jsfile.forEach((f, i) => {
        let pull = require(`./commands/${f}`);
        client.commands.set(pull.config.name, pull);
    });
});

client.on("messageCreate", async message => {
    if (message.author.bot || message.channel.type === "dm") return;
    let messagearray = message.content.split(" ")
    let cmd = messagearray[0];
    let args = message.content.trim().split(/ +/g);

    if (!message.content.startsWith(prefix)) return;
    let commandfile = client.commands.get(cmd.slice(prefix.length))
    if (commandfile) commandfile.run(client, message, args);
});

client.on('ready', () => { 
    client.user.setActivity("En dev, patientez !");
    client.user.setStatus('dnd'); //dnd(ne pas déranger), invisible(Déconnecter), online(Activer vert), idle(Absent)
});

client.login(token);
