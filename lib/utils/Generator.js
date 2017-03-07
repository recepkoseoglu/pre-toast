"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

var Generator = function Generator() {
    var _this = this;

    _classCallCheck(this, Generator);

    this.s4 = function () {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    };

    this.guid = function () {
        var s = _this.s4;
        return "" + s() + s() + "-" + s() + "-" + s() + "-" + s() + "-" + s() + s() + s();
    };
};

exports.default = new Generator();