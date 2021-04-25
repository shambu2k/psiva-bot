const Fuse = require('fuse.js');
const list = require('../assets/recordings.json');

const options = {
	keys: ['sub', 'short', 'sem'],
};
const fuse = new Fuse(list, options);

async function searchRecordings(query) {
	try {
		let results = await fuse.search(query);
		if (results.length == 0) return 'Nothing Found';
		else {
			return await parseResults(results);
		}
	} catch (e) {
		console.log(`Fuse error: ${e}`);
		return 'Bot Error';
	}
}

async function parseResults(results) {
	let parsedResult = '';
	results.forEach((result) => {
		parsedResult += `${result.item.sub} - ${result.item.link}\n`;
	});
	return parsedResult;
}

module.exports = {
	searchRecordings,
};
