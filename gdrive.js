const {google} = require('googleapis');
const credentials = require('./credentials.json');
const scopes = ['https://www.googleapis.com/auth/drive'];

let drive;

async function gdriveInit() {
	const auth = new google.auth.JWT(credentials.client_email, null, credentials.private_key, scopes);
	drive = google.drive({version: 'v3', auth});
}

async function listFiles() {
	let files = await drive.files.list({
		pageSize: 10,
		fields: 'nextPageToken, files(id, name)',
	});
	return files;
}

module.exports = {
	gdriveInit,
	listFiles,
};
