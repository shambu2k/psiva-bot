const Discord = require('discord.js');
module.exports = {
	name: 'swag',
	description: 'Ey what you want?\nUsage - !psiva swag',
	execute(message, args) {
		const embedMsg = new Discord.MessageEmbed()
			.setColor('#ECC82C')
			.setTitle('Antha bayapunda irruku la')
			.setURL('https://alchemy.nitt.edu/')
			.attachFiles(['./assets/psivanos.jpg'])
			.setImage('attachment://psivanos.jpg')
			.setTimestamp();

		message.channel.send(embedMsg);
	},
};
