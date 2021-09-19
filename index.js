const Discord = require("discord.js");
const client = new Discord.Client({intents: Object.values(Discord.Intents.FLAGS)})
const AsciiTable = require('ascii-table')
const { prefix, token} = require('./config.json');

var table = new AsciiTable('Bot is Activate')
table
  .setBorder('*')
  .setHeading('Command ', 'and', 'Event')
  .addRow('active', 'in', 'activate')
 
console.log(table.toString())

client.on('ready', () => { 
    client.user.setActivity("En dev, patientez !");
    client.user.setStatus('dnd'); //dnd(ne pas déranger), invisible(Déconnecter), online(Activer vert), idle(Absent)
});

client.login(token);
