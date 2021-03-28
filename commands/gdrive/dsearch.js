const Discord = require('discord.js');
const gdrive = require('../../data/gdrive');

module.exports = {
	name: 'dsearch',
	description: 'Access the drive files\nUsage - !psiva search <one-word-search-query-here>',
	async execute(message, args) {
		try {
			let data = await gdrive.searchFolder(args[1]);
			const embedMsg = new Discord.MessageEmbed()
				.setTitle(`${args[1]?`Here are your search results for - ${args[1]}`:"Hellooo what is this? Tell me what to search man!! Type !psiva help to see valid commands"}`)
				.setDescription(data)
				.setColor('#ECC82C')
				.setTimestamp();
			message.channel.send(embedMsg);
		} catch (e) {
			console.log(e);
		}
	},
};
