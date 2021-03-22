const Discord = require('discord.js');

module.exports = {
	name: 'wrong',
	description: 'Wrong command pa! Get help',
	execute(message, args) {
		args[0] = args[0].toLowerCase();
		const title = args[0] != 'help' ? 'Hellooo, NO NO NO.. WRONG COMMAND!' : 'Refer the lab manual';
		const embedMsg = new Discord.MessageEmbed()
			.setColor('#ECC82C')
			.setTitle(title)
			.setURL('https://alchemy.nitt.edu/')
			.setDescription('Commands available:')
			.addFields(
				{name: '!psiva', value: 'Try it'},
				{name: '!psiva swag', value: 'My swag you will get'},
				{
					name: '!psiva search <query-here>',
					value: 'Replace <query-here> with a file you want to search in chem drive.',
				},
				{
					name: '!psiva list <drive-folder-link>',
					value:
						'Replace <drive-folder-link> with the google drive folder link you want to list the contents of',
				}
			)
			.setTimestamp();

		message.channel.send(embedMsg);
	},
};
