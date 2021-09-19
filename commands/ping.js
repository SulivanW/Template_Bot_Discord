const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
module.exports.run = async (client, message, args) => {
    var ping = Math.round(client.ws.ping)
    const newEmbed = new MessageEmbed()
        .setColor('#e38f0e')
        .setTitle('Commande Ping !')
        .addFields(
            { name: 'Ping trouver !', value: `${ping}` },
        )
        .setTimestamp()
        message.channel.send({ embeds: [newEmbed] });
    console.log(`🏓 Commande Ping ! \nDans le serveur : ${message.guild.name}`)

}
module.exports.config = {
    name: "ping"
}