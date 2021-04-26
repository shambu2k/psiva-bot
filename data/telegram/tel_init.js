const {TelegramClient} = require('telegram');
const {StringSession} = require('telegram/sessions');
const input = require('input');
const dotenv = require('dotenv');
dotenv.config();

const apiId = process.env.tele_api_id;
const apiHash = process.env.tele_hash;
const stringSession = new StringSession(!process.env.tel_session ? '' : process.env.tel_session); // fill this later with the value from session.save()
const delay = (ms) => new Promise((res) => setTimeout(res, ms));
const client = new TelegramClient(stringSession, apiId, apiHash, {connectionRetries: 5});
async function teleInit(message) {
	await client.start({
		phoneNumber: async () => await input.text('number ?'),
		password: async () => await input.text('password?'),
		phoneCode: async () => await input.text('Code ?'),
		onError: (err) => console.log(err),
	});
	console.log('You should now be connected.');
	console.log(client.session.save()); // Save this string to avoid logging in again
	await sendMessages(message);
	await delay(9000);
	return await getMessages();
}

async function sendMessages(message) {
	await client.sendMessage('cheggVIPbot', {message: message});
}

async function getMessages() {
	await client.connect();
	const msgs = await client.getMessages('cheggVIPbot', {
		limit: 2,
	});
	console.log('the total number of msgs are', msgs.total);
	console.log('what we got is ', msgs.length);
	await client.disconnect();
	return await getLatestMessage(msgs);
}

async function getLatestMessage(msgs) {
	let reply = '';
	let id = '';
	msgs.forEach((msg) => {
		if (msg.text.slice(0, 7) != 'Payment' && msg.text.slice(0, 9) != 'FOR CHEGG') {
			reply += msg.text + '\n';
			if (msg.text.slice(0, 17) == 'Here is your file') {
				id = msg.id;
			}
		}
	});
	return {reply: reply, id: id};
}

async function downloadMedia(msgId) {
	await client.connect();
	const result = await client.getMessages('me', {
		ids: msgId, // the id of the message you want to download
	});
	const media = result[0].media;
	if (media) {
		const buffer = await client.downloadMedia(media, {
			workers: 1,
		});
		console.log(buffer);
		await client.disconnect();
		return buffer;
	}
	await client.disconnect();
	return '';
}

module.exports = {
	teleInit,
	downloadMedia,
};
