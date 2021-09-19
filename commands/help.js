const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js")
const auteur = require("../config.json")
const bot = require("../config.json")

module.exports.run = (client, message, args) => {
    const embed = new MessageEmbed()
    .setDescription(`Commande help de ${bot.bot}`)
    .addField("`Admin Commandes : `", "`En cours de dev...`")
    .addField("`Modération Commandes : `", "`En cours de dev...`")
    .addField("`Misc Commandes : `", "`/ping` | `En cours de dev...`")
    .addField("`Musique Commandes : `", "`En cours de dev...`")
    .setFooter(`${auteur.auteur}`)

    message.channel.send({embeds: [embed]})
}
module.exports.config = {
    name: "help"
}
