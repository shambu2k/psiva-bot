const express = require('express');
const app = express();
const port = 3001;

app.get('/', (req, res) => res.send('Psiva discord bot'));

app.listen(port, () => console.log(`Listening at http://localhost:${port}`));

// ================= START BOT CODE ===================
const fs = require('fs');
const gdrive = require('./data/gdrive');
const dotenv = require('dotenv');
dotenv.config();

const Discord = require('discord.js');
const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFolders = fs.readdirSync('./commands');
for (const folder of commandFolders) {
	const commandFiles = fs.readdirSync(`./commands/${folder}`).filter((file) => file.endsWith('.js'));
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

	if (!client.commands.get(args[0]) && args.length != 0) client.commands.get('wrong').execute(message, args);
	else client.commands.get(!args[0] ? 'poondi' : args[0]).execute(message, args);
});

client.login(process.env.token);
