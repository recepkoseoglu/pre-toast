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

var _Arrays = require("./Arrays");

var _Arrays2 = _interopRequireDefault(_Arrays);

var _Strings = require("./Strings");

var _Strings2 = _interopRequireDefault(_Strings);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {default: obj};
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

/**
 * Provides some operations on classnames of the dom element.
 */
var ClassName = function () {
    function ClassName() {
        _classCallCheck(this, ClassName);
    }

    _createClass(ClassName, null, [{
        key: "merge",

        /**
         * Provides to merge the given classes and return them as a string.
         * @param {string[]} classNames  You can invoke method with string parameters or a string array.
         * @return {string} return classNames of the given element after the changes.
         * @public
         */
        value: function merge() {
            for (var _len = arguments.length, classNames = Array(_len), _key = 0; _key < _len; _key++) {
                classNames[_key] = arguments[_key];
            }

            if (!classNames || classNames.length < 0) return "";
            classNames = _Strings2.default.stringsToArray(classNames);
            return classNames.join(" ");
        }

        /**
         * Sets the given classNames to the given `element` as new classNames and return them.
         * Note: Previous classNames of the given element removed.
         * @param {Element} element must be a dom element.
         * @param {string[]} classNames  You can invoke method with string parameters or a string array.
         * @return {string} return classNames of the given element after the changes.
         * @public
         */

    }, {
        key: "set",
        value: function set(element) {
            for (var _len2 = arguments.length, classNames = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
                classNames[_key2 - 1] = arguments[_key2];
            }

            element.className = ClassName.merge.apply(undefined, classNames);
            return element.className;
        }

        /**
         * Adds the given classNames to the given `element` and return it's all classNames.
         * Note: Also previous classNames not deleted.
         * @param {Element} element must be a dom element.
         * @param {string[]} classNames  You can invoke method with string parameters or a string array.
         * @return {string} return classNames of the given element after the changes.
         * @public
         */

    }, {
        key: "add",
        value: function add(element) {
            for (var _len3 = arguments.length, classNames = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
                classNames[_key3 - 1] = arguments[_key3];
            }

            var names = _Strings2.default.stringsToArray(classNames);
            if (element.className && element.className !== "") {
                var previousNames = element.className.split(" ");
                names = _Arrays2.default.mergeArraysForNativeType(previousNames, names);
            }
            element.className = names.join(" ");
            return element.className;
        }

        /**
         * Removes the given classNames from the given `element` if exist and then return it's existed classNames.
         * @param {Element} element
         * @param {string[]} classNames classNames  You can invoke method with string parameters or a string array.
         * @return {string}
         * @public
         */

    }, {
        key: "remove",
        value: function remove(element) {
            if (element.className && element.className !== "") {
                for (var _len4 = arguments.length, classNames = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
                    classNames[_key4 - 1] = arguments[_key4];
                }

                var names = _Strings2.default.stringsToArray(classNames);
                var from = element.className.split(" ");
                names = _Arrays2.default.removeAllForNativeType(from, names);
                element.className = names.join(" ");
            }
            return element.className || "";
        }

        /**
         * Replace the given classNames from the given `element` if exist and then return it's existed classNames.
         * @param {Element} element
         * @param {string} remove className
         * @param {string} add classNames
         * @return {string}
         * @public
         */

    }, {
        key: "replace",
        value: function replace(element, removeName, addName) {
            var removeNameArray = [];
            removeNameArray.push(removeName);
            var addNameArray = [];
            addNameArray.push(addName);
            if (element && element.className && element.className !== "") {
                var from = element.className.split(" ");
                var names = _Arrays2.default.removeAllForNativeType(from, [removeName]);
                names = _Arrays2.default.mergeArraysForNativeType(names, [addName]);
                element.className = names.join(" ");
            }
            return element ? element.className || "" : "";
        }
    }]);

    return ClassName;
}();

exports.default = ClassName;