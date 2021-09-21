const { MessageEmbed } = require('discord.js');
const { auteur, bot } = require("../../config.json")

module.exports = {
	name: 'ping',
	description: 'Savoir la latence du robot',
    option:["latence"],
	execute(client, message, args) {
    var ping = Math.round(client.ws.ping)
    const PingEmbed = new MessageEmbed()
        .setColor('#3cff00')
        .setDescription(`Commande Ping de ${bot}`)
        .addFields(
            { name: 'Ping trouver !', value: `${ping}` },
        )
        .setFooter(`${auteur}`)
        message.channel.send({ embeds: [PingEmbed] });
    console.log(`🏓 Commande Ping ! \n👉 ${message.guild.name}`)

}}