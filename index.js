const gdrive = require('./gdrive');
const {prefix, token} = require('./config.json');

const Discord = require('discord.js');
const client = new Discord.Client();

client.once('ready', async () => {
	try {
		await gdrive.gdriveInit()
	} catch(e) {
		console.log(`Gdrive Error: ${e}`)
	}
	console.log('Ready!');
});

client.on('message', async (message) => {
	if (message.content === `${prefix}`) {
		message.channel.send(`Ay where is Poondi Sheshan!?`);
	} else if (message.content === `${prefix} drive`) {
		try {
			let res = await gdrive.listFiles();
			message.channel.send(JSON.stringify(res.data))
		} catch(e) {
			console.log(e);
		}
	}
});

client.login(token);
