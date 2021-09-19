const Discord = require("discord.js");
const token = require('./config.json');
const AsciiTable = require('ascii-table')

var table = new AsciiTable('Status On/Off')
table
  .setHeading('Bot : ', `${client.user.tag}`)
  .addRow('Commande : ', 'Not Found')
  .addRow('Event : ', 'Not Found')
  .addRow('Api : ', 'Online')
 
console.log(table.toString())

client.on('ready', () => { 
    client.user.setActivity("En dev, patientez !");
    client.user.setStatus('dnd'); //dnd(ne pas déranger), invisible(Déconnecter), online(Activer vert), idle(Absent)
});

client.login(token)
