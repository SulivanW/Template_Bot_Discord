const { idfonda, bot, staffs } = require("../../config.json")
const Discord = require('discord.js');

module.exports = {
	name: 'verif-staff',
	description: `Fait ta description`,
    option:"vs",
	execute(client, message, args) {
        let mentionedUser = message.mentions.users.first() || message.author;
        var user = message.mentions.users.first() || message.author;
        
        if (!staffs.includes(user.id)) {
    
            let embed = new Discord.MessageEmbed()
            .setColor("RED")
            .setTitle(`${bot} || Vérification`)
            .setDescription(`${user.toString()}, \nNe fait donc pas partis du staff de : ${bot}`)
            .setThumbnail(mentionedUser.displayAvatarURL());;
            
          return message.channel.send({ embeds: [embed] });
        };
    
        let verifembed = new Discord.MessageEmbed()
            .setColor("GREEN")
            .setTitle(`${bot} || Vérification`)
            .setDescription(`${user.toString()}, \nC'est belle est bien un staff de : ${bot}`)
            .setThumbnail(mentionedUser.displayAvatarURL());
    
        message.channel.send({ embeds: [verifembed] });
    }}