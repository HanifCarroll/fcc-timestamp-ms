const express = require('express');
const moment = require('moment');

const port = process.env.PORT || 3000;
const app = express();

app.use(express.static('public'));

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/public/views/index.html');
});

app.get('/:query', (req, res) => {
	res.send(time(req.params.query));
});

app.listen(port, () => {
	console.log('Server started');
});

function time (input) {
	if (Number(input)) {
		let secs = Number(input);
		let ms = secs * 1000;
		const result = {
			'unix': secs,
			'natural': moment(ms).utc().format('MMMM DD, YYYY')
		};
		return result;
	}

	let secs = Number(moment(input).format('X'));

	const result = {
		'unix': secs,
		'natural': input.charAt(0).toUpperCase() + input.slice(1)
	};
	return result;
}