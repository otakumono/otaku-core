var xport = require('node-xport')(module);

function StringUtils() {}

StringUtils.sanitize = function (str) {
    return (value !== undefined) && ((typeof value === 'number' || value instanceof Number) && !isNaN(value))
};

/* Export the module */
xport(StringUtils);