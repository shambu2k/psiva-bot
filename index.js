const fs = require('fs');
const gdrive = require('./data/gdrive');
const dotenv = require('dotenv');
dotenv.config();

const Discord = require('discord.js');
const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFolders = fs.readdirSync('./commands');
for (const folder of commandFolders) {
	const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const command = require(`./commands/${folder}/${file}`);
		client.commands.set(command.name, command);
	}
}

client.once('ready', async () => {
	try {
		await gdrive.gdriveInit();
	} catch (e) {
		console.log(`Gdrive Error: ${e}`);
	}
	console.log('Ready!');
});

client.on('message', async (message) => {
	if (!message.content.startsWith(process.env.prefix) || message.author.bot) return;

	const args = message.content.trim().split(' ');
	const command = args.shift().toLowerCase();

	if (args.length == 0) {
		client.commands.get('poondi').execute(message, args);
	} else if (args[0] === 'search') {
		client.commands.get('drive_search').execute(message, args);
	} else if (args[0] === 'list') {
		client.commands.get('drive_list').execute(message, args);
	} else if (args[0] === 'swag') {
		client.commands.get('swag').execute(message, args);
	} else if(args[0] === 'recording') {
		client.commands.get('recording').execute(message, args);
	} else {
		client.commands.get('wrong').execute(message, args);
	}
});

client.login(process.env.token);
