const Discord = require('discord.js');
const prenks = require('../../assets/prenks.json');

module.exports = {
	name: 'prenk',
	description: 'Plays random Danish Sait Prank call\nUsage - !psiva prenk',
	async execute(message, args) {
		try {
			if (message.member.voice.channel) {
				prenk_link = prenks[Math.floor(Math.random() * prenks.length)];
				message.channel.send(`!p ${prenk_link.substring(0, prenk_link.length - 49)}`);
			} else {
				const embedMsg = new Discord.MessageEmbed()
					.setTitle(`Join some voice channel man! `)
					.setColor('#ECC82C')
					.setTimestamp();
				message.channel.send(embedMsg);
			}
		} catch (e) {
			console.log(e);
		}
	},
};
