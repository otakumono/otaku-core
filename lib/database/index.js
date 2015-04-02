var xport = require('node-xport')(module);

function Database() {}

Database.Actions = require('./actions');
Database.Schemata = require('./schemata');
Database.Common = require('./common');

/* Export the module */
xport(Database);