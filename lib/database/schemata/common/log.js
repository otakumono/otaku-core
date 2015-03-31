var xport = require('node-xport')(module),
	mongoose = require('mongoose'),
	Record = require('./record');

var Log = mongoose.Schema({
	action: Number,
	time: Number,
	record: Record,
});

xport(Log);