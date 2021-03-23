const Discord = require('discord.js');
const gdrive = require('../../data/gdrive');

module.exports = {
	name: 'drive_list',
	description: 'List contents of a folder\nUsage - !psiva list <drive-link-of-folder-here>',
	async execute(message, args) {
		try {
			let data = await gdrive.listFiles(args[1].slice(args[1].length - 33));
			const embedMsg = new Discord.MessageEmbed()
				.setTitle(`Here are the contents of - ${args[1]}`)
				.setDescription(data)
				.setColor('#ECC82C')
				.setTimestamp();
			message.channel.send(embedMsg);
		} catch (e) {
			console.log(e);
		}
	},
};
