const fs = require('fs');
const gdrive = require('./gdrive');
const {prefix, token} = require('./config.json');

const Discord = require('discord.js');
const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter((file) => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
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
	if (!message.content.startsWith(prefix) || message.author.bot) return;

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
	} else {
		client.commands.get('wrong').execute(message, args);
	}
});

client.login(token);
