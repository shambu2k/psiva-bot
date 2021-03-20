const Discord = require('discord.js');
const client = new Discord.Client();
const { prefix, token } = require('./config.json');

client.once('ready', () => {
	console.log('Ready!');
});

client.on('message', message => {
	if (message.content === `${prefix}`) {
        message.channel.send('Ay where is Poondi Sheshan!?');
    }
    
});

client.login(token);