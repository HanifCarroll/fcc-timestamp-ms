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
	// If the input can be coerced to a truthy number, proceed
	if (Number(input)) {
		let secs = Number(input);
		let ms = secs * 1000;
		const result = {
			'unix': secs,
			'natural': moment(ms).utc().format('MMMM DD, YYYY')
		};
		return result;
	}

	// If it can't, check to see if the string is a valid format for momentjs
	if (moment(input).isValid()) {
		let secs = Number(moment(input).format('X'));

		const result = {
			'unix': secs,
			'natural': input.charAt(0).toUpperCase() + input.slice(1)
		};
		return result;
	} else {
		return result = {
			'unix': null,
			'natural': null
		};
	}
}