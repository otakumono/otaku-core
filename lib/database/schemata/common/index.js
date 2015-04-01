var xport = require('node-xport')(module);

function Common() {}

Common.Log = require('./log');

/* Export the module */
xport(Common);