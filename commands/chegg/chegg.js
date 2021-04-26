const Discord = require('discord.js');
const {MessageAttachment} = require('discord.js');
const tele = require('../../data/telegram/tel_init');

module.exports = {
	name: 'chegg',
	description: "Gives chegg answers\nUsage - !psiva chegg <chegg-question-link> Pls don't abuse this command",
	async execute(message, args) {
		let query = '';
		for (let i = 1; i < args.length; i++) {
			query += args[i] + ' ';
		}
		try {
			if (message.channel.id == '829751866308034590') {
				if (message.member.roles.cache.some((role) => role.name === 'RG')) {
					const msg = await tele.teleInit(query);
					message.channel.send(msg.reply);
					if (msg.id != '') {
						const attachment = new MessageAttachment(await tele.downloadMedia(msg.id), 'chegg_ans.html');
						message.channel.send(attachment);
					}
				} else {
					const embedMsg = new Discord.MessageEmbed()
						.setTitle("Eyy, you are not RG. You can't use this command!")
						.setColor('#ECC82C')
						.setTimestamp();
					message.channel.send(embedMsg);
				}
			} else {
				const embedMsg = new Discord.MessageEmbed()
					.setTitle('Use this command only in chegg channel')
					.setColor('#ECC82C')
					.setTimestamp();
				message.channel.send(embedMsg);
			}
		} catch (e) {
			console.log(e);
		}
	},
};
