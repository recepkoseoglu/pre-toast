"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
        }
    }

    return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);
        if (staticProps) defineProperties(Constructor, staticProps);
        return Constructor;
    };
}();

var _Assertions = require("./Assertions");

var _Assertions2 = _interopRequireDefault(_Assertions);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {default: obj};
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

/**
 * A singleton class which implements mostly used string operations.
 *
 * @class Strings
 */
var Strings = function () {
    function Strings() {
        _classCallCheck(this, Strings);
    }

    _createClass(Strings, null, [{
        key: "startsWith",

        /**
         * The startsWith() method determines whether a string begins with the characters of another string, returning true or false as appropriate.
         * @param src
         * @param dest
         * @returns {boolean}
         */
        value: function startsWith(value, searchString, position) {
            position = position || 0;
            return value.substr(position, searchString.length) === searchString;
        }

        /**
         * The endsWith() method determines whether a string ends with the characters of another string, returning true or false as appropriate.
         * @param value
         * @param searchString
         * @param position
         * @returns {boolean}
         */

    }, {
        key: "endsWith",
        value: function endsWith(value, searchString, position) {
            if (!value || !searchString || value.length < searchString.length) {
                return false;
            }
            position = position || value.length;
            return value.substring(position - searchString.length, position) === searchString;
        }

        /**
         * Converts the given arguments as string aray but difference is check arguments if arguments has one parameter and the parameter is an array then return it as string array.
         * @param {Array<string>} args
         * @return {Array<string>}
         */

    }, {
        key: "stringsToArray",
        value: function stringsToArray(args) {
            if (!args) return [];
            if (args.length === 0) return args;
            if (args.length === 1 && _Assertions2.default.isArray(args[0])) {
                return args[0];
            }
            return args;
        }
    }]);

    return Strings;
}();

exports.default = Strings;