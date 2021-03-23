const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Psiva bot'));

app.listen(port, () => console.log(`Psiva bot listening at http://localhost:${port}`));

// ================= START BOT CODE ===================
const Discord = require('discord.js');
const gdrive = require('../../data/gdrive');

module.exports = {
	name: 'drive_search',
	description: 'Access the drive files\nUsage - !psiva search <one-word-search-query-here>',
	async execute(message, args) {
		try {
			let data = await gdrive.searchFolder(args[1]);
			const embedMsg = new Discord.MessageEmbed()
				.setTitle(`Here are your search results for - ${args[1]}`)
				.setDescription(data)
				.setColor('#ECC82C')
				.setTimestamp();
			message.channel.send(embedMsg);
		} catch (e) {
			console.log(e);
		}
	},
};
