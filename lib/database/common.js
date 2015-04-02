var xport = require('node-xport')(module),
	Datatype = require('../datatype'),
	mongoose = require('mongoose'),
	Schemata = require('./schemata');

function CommonDB() {}

CommonDB.Schemata = Schemata;

CommonDB.sanitizeOptions = function (options) {
	options = (options || {});
	options.host = (options.host || "localhost");
	options.port = (options.port || 27017);
	options.pass = (options.user || undefined);
	options.user = (options.user || "");
	options.name = (options.name || "otaku");
};

CommonDB.connectionString = function (options) {
	CommonDB.sanitizeOptions(options);

	return ("mongodb://" + CommonDB.userString(options) + CommonDB.hostString(options) + "/" + options.name);
};

CommonDB.hostString = function (options, sanitize) {
	if (sanitize === true) {
		CommonDB.sanitizeOptions(options);
	}

	return (options.host + ":" + options.port);
};

CommonDB.userString = function (options, sanitize) {
	if (sanitize === true) {
		CommonDB.sanitizeOptions(options);
	}

	return (options.user + (options.pass ? ":" + options.pass : "") + "@");
};

CommonDB.createInstance = function (ctor, options) {
	var instance = new ctor(options);

	instance.options = options;
	instance.connection = null;

	instance.connectionString = function () {
		return CommonDB.connectionString(instance.options);
	};

	instance.onOpen = function () {
		console.log("Established connection to: \"%s\".", instance.connectionString());
	};

	instance.onError = function (error) {
		console.log("Failed to connect to: \"%s\".", instance.connectionString());
		console.log('This is a critical failure, application will exit. More information below.');
		console.log('Error: ' + error);
		process.exit(1);
	};

	instance.onClose = function () {
		console.log("Disconnected from: \"%s\".", instance.connectionString());
	};

	return instance;
};

CommonDB.connect = function (instance) {
	instance.connection = mongoose.createConnection(instance.connectionString());
	instance.connection.on('error', instance.onError);
	instance.connection.on('open', instance.onOpen);
	instance.connection.on('close', instance.onClose);
};

CommonDB.disconnect = function (instance, callback) {
	instance.connection.disconnect(callback || function () {});
};

CommonDB.nullCallback = function (error, result) {
	console.log('[CATCH-NULL] Null callback received error "' + error + '" and result "' + result + '".');
	console.trace();
};

CommonDB.validateCallback = function (callback) {
	return (callback ? callback : CommonDB.nullCallback);
};

CommonDB.wrap = function (callback, processor) {
	callback = CommonDB.validateCallback(callback);

	return function (error, result) {
		if (processor) {
			return processor(error, result, callback);
		}

		var response = { 'exit': 0, 'result': result };

		if (error) {
			response.exit = 1;
			response.error = error;
		} else if (!result) {
			response.exit = 2;
			response.result = {};
			response.info = 'Result is null, but there is no error. This may be an expected behavior.';
		}

		return callback(error, response);
	}
};

CommonDB.count = function (model, criteria, callback) {
	if (typeof criteria === 'function') {
		callback = criteria;
		criteria = {};
	}

	if (!model) {
		return CommonDB.wrap(callback)('Attempted to count documents of null model.', null);
	}

	return model.count(criteria, CommonDB.wrap(callback));
};

CommonDB.find = function (model, criteria, selector, callback) {
	if (typeof selector === 'function') {
		callback = selector;
		selector = null;
	}

	if (!model) {
		return CommonDB.wrap(callback)('Attempted to find documents of null model.', null);
	}

	if (selector) {
		return model.find(criteria, selector, CommonDB.wrap(callback));
	}

	return model.find(criteria, CommonDB.wrap(callback));
};

CommonDB.findOne = function (model, criteria, selector, callback) {
	if (typeof selector === 'function') {
		callback = selector;
		selector = null;
	}

	if (!model) {
		return CommonDB.wrap(callback)('Attempted to find a document of null model.', null);
	}

	if (selector) {
		return model.findOne(criteria, selector, CommonDB.wrap(callback));
	}
	
	return model.findOne(criteria, CommonDB.wrap(callback));
};

CommonDB.update = function (model, criteria, update, callback) {
	if (!model) {
		return CommonDB.wrap(callback)('Attempted to update documents of null model.', null);
	}

	return model.update(criteria, update, { multi: true }, CommonDB.wrap(callback));
};

CommonDB.updateOne = function (model, criteria, update, callback) {
	if (!model) {
		return CommonDB.wrap(callback)('Attempted to update a document of null model.', null);
	}

	return model.findOneAndUpdate(criteria, update, { new: true }, CommonDB.wrap(callback));
};

CommonDB.remove = function (model, criteria, callback) {
	if (!model) {
		return CommonDB.wrap(callback)('Attempted to remove documents of null model.', null);
	}

	return model.remove(criteria, CommonDB.wrap(callback));
};

CommonDB.removeOne = function (model, criteria, callback) {
	if (!model) {
		return CommonDB.wrap(callback)('Attempted to remove a document of null model.', null);
	}

	return model.findOneAndRemove(criteria, CommonDB.wrap(callback));
};

CommonDB.insert = function (model, document, callback) {
	if (!model) {
		return CommonDB.wrap(callback)('Attempted to insert documents of null model.', null);
	}

	return CommonDB.count(model, {}, function (error, result) {
		if (result.exit !== 0) {
			result.info = 'Failed to insert document.';
			return CommonDB.validateCallback(callback)(error, result);
		}

		document.id = result;
		return model.create(document, CommonDB.wrap(callback));
	});
};

CommonDB.stringQuery = function (strQuery) {
	strQuery = strQuery.replace(/\+/g, ' ');

	return { $in: [ new RegExp(strQuery, 'i') ] };
};

xport(CommonDB);