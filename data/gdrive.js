const {google} = require('googleapis');
const scopes = ['https://www.googleapis.com/auth/drive'];
const dotenv = require('dotenv');
dotenv.config();

let drive;

async function gdriveInit() {
	const auth = new google.auth.JWT(process.env.client_email, null, process.env.private_key, scopes);
	drive = google.drive({version: 'v3', auth});
}

async function listFiles(folder_id) {
	try {
		if(folder_id==null) return;
		let files = await drive.files.list({
			folderId: folder_id,
			pageSize: 10,
			fields: 'files(id, name, mimeType, webViewLink)',
			q: `'${folder_id}' in parents`,
			orderBy: 'folder,name',
		});
		let parsedFiles = await parseFiles(files.data.files);
		return parsedFiles;
	} catch (e) {
		console.log(e);
		return 'Invalid link or nothing found.';
	}
}

async function searchFolder(query) {
	try {
		let results = await drive.files.list({
			folderId: process.env.root_folder_id,
			pageSize: 10,
			fields: 'files(id, name, mimeType, webViewLink)',
			q: `(mimeType='application/vnd.google-apps.folder') and (name contains '${query}')`,
			orderBy: 'folder',
		});
		let parsedFiles = await parseFiles(results.data.files);
		return parsedFiles;
	} catch (e) {
		console.log(e);
		return 'Nothing found';
	}
}

async function parseFiles(files) {
	if (files.length == 0) return 'Nothing found';
	let parsedFiles = '';
	files.forEach((file) => {
		parsedFiles += `${file.name} - ${file.webViewLink}\n`;
	});
	return parsedFiles;
}

module.exports = {
	gdriveInit,
	listFiles,
	searchFolder,
};
