const { MessageEmbed } = require("discord.js");

module.exports = {
	name: 'deletelogs',
	description: 'supprimez un channel logs',
	option:["channelid"],
	execute(Discord, message, args, prefix, connection) {
        if (!message.guild) {
            const error = new Discord.MessageEmbed()
			.setColor("#ff0000")
			.setTitle('Erreur !')
			.setDescription("Commande uniquement dans un serveur !")
			message.channel.send({ embeds: [error] })
        } else {
                        connection.query(`DELETE FROM channellogs WHERE serverid = "${message.guild.id}"`)
                        const réussite = new MessageEmbed()
                        .setColor("#00ff00")
                        .setTitle('Réussite !')
                        .setDescription("Le channel Logs à bien été delete !")
                        console.log(`✔️ Commande DeleteLogs ! \n👉 ${message.guild.name}`)
                        message.channel.send({ embeds: [réussite] })
                    .catch(function(err) {
                        const error = new MessageEmbed()
                        .setColor("#ff0000")
                        .setTitle('Erreur !')
                        .setDescription(`Merci d'utiliser cette commande de cette manière : "${prefix}deletelogs"`)
                        console.log(`❌ Commande DeleteLogs fail ! \n👉 ${message.guild.name}`)
                        message.channel.send({ embeds: [error] })
                    })
                }
            }
        }
