var xport = require('node-xport')(module);

function CommonSchemata() {}

CommonSchemata.Log = require('./log');
CommonSchemata.Record = require('./record');

/* Export the module */
xport(CommonSchemata);