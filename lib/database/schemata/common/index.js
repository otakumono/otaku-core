var xport = require('node-xport')(module);

function CommonSchemata() {}

CommonSchemata.Log = require('./log');

/* Export the module */
xport(CommonSchemata);