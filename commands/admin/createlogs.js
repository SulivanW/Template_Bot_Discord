const { MessageEmbed } = require("discord.js");

module.exports = {
	name: 'configlogs',
	description: 'Liez un channel logs au bot',
	option:["channelid"],
	execute(Discord, message, args, prefix, connection) {
        if (!message.guild) {
            const error = new Discord.MessageEmbed()
			.setColor("#ff0000")
			.setTitle('Erreur !')
			.setDescription("Commande uniquement dans un serveur !")
			message.channel.send({ embeds: [error] })
        } else {
        connection.query(`SELECT * FROM channellogs WHERE discord = "${message.author.id}"`, (err, result) => {
            if (err) throw err

            if (result.length == 0) {
                    connection.query(`INSERT INTO channellogs (discord, channelid, serverid) VALUES ("${message.author.id}","${args[0]}","${message.guild.id}")`)
                    const réussite = new MessageEmbed()
                    .setColor("#00ff00")
                    .setTitle('Réussite !')
                    .setDescription("Channel logs configurer avec succès !")
                    console.log(`✔️ Commande CreateLogs ! \n👉 ${message.guild.name}`)
                    message.channel.send({ embeds: [réussite] })
                    .catch(function(err) {
                    const error = new MessageEmbed()
                    .setColor("#ff0000")
                    .setTitle('Erreur !')
                    .setDescription("Il me semblerais que vous n'ayez pas donner un channelid !")
                    message.channel.send({ embeds: [error] })
                })
            } else {
                    const réussite = new MessageEmbed()
                    .setColor("#FF8000")
                    .setTitle('Déjà connecté !')
                    .setDescription("Un Salon à déjà été configurer, faite : `/deletelogs` et refaite votre commande !")
                    console.log(`❌ Commande CreateLogs déjà exécuter ! \n👉 ${message.guild.name}`)
                    message.channel.send({ embeds: [réussite] }).catch(function(err) {
                    connection.query(`DELETE FROM channellogs WHERE discord = "${message.author.id}"`)
                        connection.query(`INSERT INTO channellogs (discord, channelid, serverid) VALUES ("${message.author.id}","${args[0]}","${message.guild.id}")`)
                        const réussite = new MessageEmbed()
                        .setColor("#00ff00")
                        .setTitle('Réussite !')
                        .setDescription("Channel logs configurer avec succès !")
                        console.log(`✔️ Commande CreateLogs ! \n👉 ${message.guild.name}`)
                        message.channel.send({ embeds: [réussite] })
                    .catch(function(err) {
                        const error = new MessageEmbed()
                        .setColor("#ff0000")
                        .setTitle('Erreur !')
                        .setDescription(`Merci d'utiliser cette commande de cette manière : "${prefix}configlogs <channelid>"`)
                        message.channel.send({ embeds: [error] })
                    })
                })
            }
        })
    }
    }}