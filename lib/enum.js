var xport = require('node-xport')(module);

function Enumeration() {
    this.keys = [];
}

Enumeration.prototype.toString = function (kv) {
    if (kv === true)
        return this.toKVString();

    var valstr = null;
    for (var i in this.keys)
        if (valstr !== null)
            valstr += ", " + this.keys[i];
        else
            valstr = "[Enum (" + this.keys[i];

    return (valstr + ")]");
};

Enumeration.prototype.toKVString = function () {
    var valstr = null;
    for (var i in this.keys)
        if (valstr !== null)
            valstr += ", { " + this.keys[i] + ":" + this[this.keys[i]] + " }";
        else
            valstr = "[Enum ({ " + this.keys[i] + ":" + this[this.keys[i]] + " }";

    return (valstr + ")]");
};

var Enum = function () {
    var args = arguments;
    var instance = new Enumeration();

    for (var i = 0; i < args.length; i++) {
        var key = args[i];
        var val = i;

        if (typeof args[i] === 'object' && args[i].key && args[i].value) {
            key = args[i].key;
            val = args[i].value;
        }

        key = String(key);

        if (instance[key] !== undefined || instance.keys.indexOf(key) > -1) {
            throw new Error("Key '" + key + "' already exists in this enum.");
        }

        instance[key] = val;
        instance.keys.push(key);
    }

    Object.freeze(instance.keys);
    Object.freeze(instance);

    return instance;
};

xport(Enum);