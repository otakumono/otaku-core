var xport = require('node-xport')(module),
	OtakuCore = require('../');

function OtakuTest() {}

OtakuTest.print = function () {
	console.log("OtakuCore:");
	console.log(OtakuCore);
};

console.log("Testing otaku-core");
console.log("==================");

OtakuTest.print();

/* Export the module */
xport(OtakuTest);