var xport = require('node-xport')(module);

function OtakuCore() {}

OtakuCore.Validation = require('validator');
OtakuCore.HTTPError = require('./httperror');
OtakuCore.Database = require('./database');
OtakuCore.Datatype = require('./datatype');
OtakuCore.Enum = require('./enum');

/* Export the module */
xport(OtakuCore);