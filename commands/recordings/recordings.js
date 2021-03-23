const Discord = require('discord.js');
const recordings = require('../../data/getrecordings');

module.exports = {
	name: 'recording',
	description: 'Gives youtube playlist of recordings of a course\nUsage - !psiva recording <course-name-here>',
	async execute(message, args) {
        let query = ""
        for(let i = 1; i < args.length; i++){
            query += args[i]+" "
        }
		try {
			let data = await recordings.searchRecordings(query);
			const embedMsg = new Discord.MessageEmbed()
				.setTitle(`Here are the requested results for - ${query}`)
				.setDescription(data)
				.setColor('#ECC82C')
				.setTimestamp();
			message.channel.send(embedMsg);
		} catch (e) {
			console.log(e);
		}
	},
};
