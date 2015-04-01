var xport = require('node-xport')(module),
	Enum = require('../enum');

var Actions = new Enum(
	"CREATE",
	"REMOVE",
	"ACCESS",
	"MODIFY"
	);

xport(Actions);