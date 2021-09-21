const { MessageEmbed } = require('discord.js');
const { bot } = require('../../config.json');

module.exports = async (client, connection, oldMessage, newMessage) => {

    connection.query(`SELECT * FROM channellogs WHERE serverid = "${oldMessage.guild.id}"`, (err, req) => {

        if(oldMessage.content === newMessage.content) return;
        
        const embedEdit = new MessageEmbed()
        .setTitle("Message Update")
        .addField("Message Avant : ", oldMessage.content)
        .addField("Message Update : ", newMessage.content)
        .setFooter(`${bot}`)
        .setTimestamp();
        console.log(`🟢 Logs MessageUpdate ! \n👉 ${oldMessage.guild.name}`)
        if(!req[0]?.channelid || req[0]?.channelid === 'none') return;
        client.channels.cache.get(req[0]?.channelid)?.send({embeds: [embedEdit]})
        })}