const { MessageEmbed } = require('discord.js');
const os = require('os')
const cpuStat = require("cpu-stat");
const memStat = require('mem-stat');
const ms = require('ms')
const tiret = "`"
const { auteur, bot, version } = require("../../config.json")


module.exports = {
	name: 'botinfo',
	description: `Savoir plus d'info sur : ${bot}`,
    option:["robotinfo"],
	execute(client, message, args) {
    var totalCores = cpuStat.totalCores();
    var avgClockMHz = cpuStat.avgClockMHz();
    var usedPercent = memStat.usedPercent();
    var free = memStat.free('GiB');
    const embed = new MessageEmbed()
    .setDescription(`Commande BotInfo de ${bot}`)
    .addField("**__Informations Créateur et Bot :__** ", `${tiret}Créateur : ${auteur}${tiret}`)
    .addField("**__Informations Bot :__** ", `${tiret}Nom : ${bot} \nLibrairie : Discord.js v13 \nDéveloppé sous : Node.js v16.x \nLangue : Français \nVersion : ${version} ${tiret}`)
    .addField("**__Information Hébergement :__** ", `${tiret}CPU : ${os.cpus().map(i => `${i.model}`)[0]}${tiret} \n${tiret}Plateforme : linux${tiret} \n${tiret}Cores Maximum : ${totalCores}${tiret} \n${tiret}Puissance Maximum du processeur : ${avgClockMHz}Mhz${tiret} \n${tiret}Mémoire utilisée : ${usedPercent} / ${free}GiB${tiret}`)
    .addField("**__Information Total :__** ", `${tiret}Serveurs : ${client.guilds.cache.size} \nUtilisateurs : ${client.guilds.cache.reduce((a, g) => a + g.memberCount,0)}${tiret}`)
    message.channel.send({ embeds: [embed] });
    console.log(`🤖 Commande BotInfo ! \n👉 ${message.guild.name}`)
}}