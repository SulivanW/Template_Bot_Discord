const { MessageEmbed } = require('discord.js');
const { bot } = require('../../config.json');

module.exports = async (client, connection, message) => {
    
    connection.query(`SELECT * FROM channellogs WHERE serverid = "${message.guild.id}"`, (err, req) => {
    const embed = new MessageEmbed()
    .setTitle("Message supprimer")
    .setDescription(`Message supprimer : \n ${message}`)
    .setFooter(`${bot}`)
    .setTimestamp()
    console.log(`🟢 Logs MessageDelete ! \n👉 ${message.guild.name}`)
    if(!req[0]?.channelid || req[0]?.channelid === 'none') return;
    client.channels.cache.get(req[0]?.channelid)?.send({embeds: [embed]})
})}