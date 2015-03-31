var xport = require('node-xport')(module);

function OtakuCore() {}

OtakuCore.Validation = require('validator');
OtakuCore.Database = require('./lib/database');
OtakuCore.Datatype = require('./lib/datatype');

/* Export the module */
xport(OtakuCore);