var xport = require('node-xport')(module);

function Database() {}

Database.Schemata = require('./schemata');
Database.CommonDB = require('./common');

/* Export the module */
xport(Database);