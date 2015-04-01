var xport = require('node-xport')(module);

function Schemata() {}

Schemata.Common = require('./common');

/* Export the module */
xport(Schemata);