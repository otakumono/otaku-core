var xport = require('node-xport')(module),
	mongoose = require('mongoose');

var Log = mongoose.Schema({
	action: { type: Number, required: true },
	time: { type: Number, required: true },
	description: { type: String, required: false },
	created: { type: Number, required: true }
});

xport(Log);