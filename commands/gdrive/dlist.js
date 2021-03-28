const Discord = require('discord.js');
const gdrive = require('../../data/gdrive');

module.exports = {
	name: 'dlist',
	description: 'List contents of a folder\nUsage - !psiva list <drive-link-of-folder-here>',
	async execute(message, args) {
		try {
			let data = await gdrive.listFiles(args[1]?args[1].slice(args[1].length - 33):null);
			const embedMsg = new Discord.MessageEmbed()
				.setTitle(`${args[1]?`Here are the contents of - ${args[1]}`:"Hellooo what is this? Tell me what list you want man!! Type !psiva help to see valid commands"}`)
				.setDescription(data)
				.setColor('#ECC82C')
				.setTimestamp();
			message.channel.send(embedMsg);
		} catch (e) {
			console.log(e);
		}
	},
};
