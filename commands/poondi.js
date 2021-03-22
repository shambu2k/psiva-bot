const Discord = require('discord.js');
module.exports = {
	name: 'poondi',
	description: 'Just to call psiva sir',
	execute(message, args) {
		const embedMsg = new Discord.MessageEmbed()
			.setTitle('Ay where is Poondi Sheshan!?')
			.setColor('#ECC82C')
			.setURL('https://alchemy.nitt.edu/')
			.setTimestamp();
		message.channel.send(embedMsg);
	},
};
