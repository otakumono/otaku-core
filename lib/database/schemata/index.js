var xport = require('node-xport')(module);

function Schemata() {}

Schemata.CommonSchemata = require('./common');

/* Export the module */
xport(Schemata);