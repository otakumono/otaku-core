var xport = require('node-xport')(module),
	OtakuCore = require('../'),
	Enum = OtakuCore.Enum;

function OtakuTest() {}

OtakuTest.print = function () {
	console.log("OtakuCore:");
	console.log(OtakuCore);

	var myEnum = new Enum("Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday");
	console.log(myEnum.toString());
	console.log(myEnum.toString(true));
	console.log(myEnum.toKVString());

	var myEnum2 = new Enum({ key: "Sunday", value: 99 }, "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday");
	console.log(myEnum2.toString());
	console.log(myEnum2.toString(true));
	console.log(myEnum2.toKVString());
};

console.log("Testing otaku-core");
console.log("==================");

OtakuTest.print();

/* Export the module */
xport(OtakuTest);