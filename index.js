const Discord = require("discord.js");
const client = new Discord.Client({intents: Object.values(Discord.Intents.FLAGS)})
const AsciiTable = require('ascii-table')
const fs = require("fs");
const { readdirSync } = require("fs");
const mysql = require("mysql")
const { prefix, token, bdd} = require('./config.json');

var table = new AsciiTable('Bot is Activate')
table
  .setBorder('*')
  .setHeading('Command ', 'and', 'Event')
  .addRow('active', 'in', 'activate')
console.log(table.toString())

client.on('ready', () => { 
    client.user.setActivity("En dev, patientez !");
    client.user.setStatus('dnd'); //dnd(ne pas déranger), invisible(Déconnecter), online(Activer vert), idle(Absent)
});

var connection = mysql.createConnection({
    host: bdd.host,
    port: bdd.port,
    user: bdd.user,
    password: bdd.password,
    database: bdd.database,
    charset : 'utf8mb4',
});
connection.connect((err) => {
    if (err){
        console.log('Error connecting to ' + connection.config.host + " to db " + connection.config.database);
        throw err
    } else {
        console.log("Connected!");
    }
  });

client.commands = new Array()
client.commands.bot = new Discord.Collection();
client.commands.misc = new Discord.Collection();
client.commands.admin = new Discord.Collection();
client.commands.moderation = new Discord.Collection();
client.commands.music = new Discord.Collection();
const commandFiles = [fs.readdirSync(__dirname + '/commands/bot').filter(file => file.endsWith('.js')), fs.readdirSync(__dirname + '/commands/misc').filter(file => file.endsWith('.js')), fs.readdirSync(__dirname + '/commands/admin').filter(file => file.endsWith('.js')), fs.readdirSync(__dirname + '/commands/moderation').filter(file => file.endsWith('.js')), fs.readdirSync(__dirname + '/commands/music').filter(file => file.endsWith('.js'))]

for (const file of commandFiles[0]) {
	const command = require(__dirname + `/commands/bot/${file}`);
	client.commands.bot.set(command.name, command);
}
for (const file of commandFiles[1]) {
	const command = require(__dirname + `/commands/misc/${file}`);
	client.commands.misc.set(command.name, command);
}
for (const file of commandFiles[2]) {
	const command = require(__dirname + `/commands/admin/${file}`);
	client.commands.admin.set(command.name, command);
}
for (const file of commandFiles[3]) {
	const command = require(__dirname + `/commands/moderation/${file}`);
	client.commands.moderation.set(command.name, command);
}
for (const file of commandFiles[4]) {
	const command = require(__dirname + `/commands/music/${file}`);
	client.commands.music.set(command.name, command);
}

const loadEvents = (client, dir = "./events") => {
    readdirSync(dir).forEach(dirs => {
        const events = readdirSync(`${dir}/${dirs}/`).filter(files => files.endsWith(".js"));
  
      for (const event of events) {
        const evt = require(`./${dir}/${dirs}/${event}`);
        const evtName = event.split(".")[0];
        client.on(evtName, evt.bind(null, client, connection));
        console.log(`🟢 Evenement chargé: ${evtName}`);
      };
    });
  };
loadEvents(client);

client.on("error", async error => {
    console.log(error)
})

client.on('messageCreate', async message => {
    if (message.channel.partial) await message.channel.fetch()
    if (message.author.bot) return
    if (!message.content.startsWith(prefix)) return
    
    var args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (!client.commands.bot.has(command) && !client.commands.misc.has(command) && !client.commands.admin.has(command) && !client.commands.moderation.has(command) && !client.commands.music.has(command)) return;

    try {
        if (client.commands.bot.has(command)) {
            client.commands.bot.get(command).execute(client, message, args, prefix, connection, Discord);
        }
        if (client.commands.misc.has(command)) {
            client.commands.misc.get(command).execute(client, message, args, prefix, connection, Discord);
        }
        if (client.commands.admin.has(command)) {
            client.commands.admin.get(command).execute(client, message, args, prefix, connection, Discord);
        }
        if (client.commands.moderation.has(command)) {
            client.commands.moderation.get(command).execute(client, message, args, prefix, connection, Discord);
        }
        if (client.commands.music.has(command)) {
            client.commands.music.get(command).execute(client, message, args, prefix, connection, Discord);
        }
	} catch (error) {
		console.error(error);
		message.reply("Erreur, lors de l'exécution de fichiers...");
	}
})


client.login(token);