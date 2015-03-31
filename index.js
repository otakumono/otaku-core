var xport = require('node-xport')(module);

function OtakuCore() {}

OtakuCore.Datatype = require('./lib/datatype');
OtakuCore.StringUtils = require('./lib/stringutils');

/* Export the module */
xport(Datatype);