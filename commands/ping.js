const { MessageEmbed } = require('discord.js');
const { auteur, bot } = require("../config.json")

module.exports.run = async (client, message, args) => {
    var ping = Math.round(client.ws.ping)
    const PingEmbed = new MessageEmbed()
        .setColor('#3cff00')
        .setDescription(`Commande Ping de ${bot}`)
        .addFields(
            { name: 'Ping trouver !', value: `${ping}` },
        )
        .setFooter(`${auteur}`)
        message.channel.send({ embeds: [PingEmbed] });
    console.log(`🏓 Commande Ping ! \nDans le serveur : ${message.guild.name}`)

}
module.exports.config = {
    name: "ping"
}
