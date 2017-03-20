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

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _Generator = require("./utils/Generator");

var _Generator2 = _interopRequireDefault(_Generator);

var _Arrays = require("./utils/Arrays");

var _Arrays2 = _interopRequireDefault(_Arrays);

var _ClassName = require("./utils/ClassName");

var _ClassName2 = _interopRequireDefault(_ClassName);

require("./Toast.css");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {default: obj};
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _possibleConstructorReturn(self, call) {
    if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            enumerable: false,
            writable: true,
            configurable: true
        }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var TIMEOUTS = {
    REMOVE: 500,
    RETRY: 500,
    SHOW: 5000
};
var Constants = {
    INFO: "toast-item-info",
    SUCCESS: "toast-item-success",
    WARNING: "toast-item-warning",
    ERROR: "toast-item-error"
};

var Toast = function (_Component) {
    _inherits(Toast, _Component);

    /**
     * Creates an instance of Toast.
     */
    function Toast(props) {
        _classCallCheck(this, Toast);

        var _this = _possibleConstructorReturn(this, (Toast.__proto__ || Object.getPrototypeOf(Toast)).call(this, props));

        _this.__removeAction = true;
        _this.__queueList = [];

        _this.__renderItems = function () {
            var arr = [];
            for (var index in _this.state.listToast) {
                var item = _this.state.listToast[index];
                arr.push(_react2.default.createElement(
                    "div",
                    {
                        key: item.id,
                        id: item.id,
                        className: "toast-item toast-item-open " + item.type,
                        style: {zIndex: item.zIndex},
                        onClick: item.onClick
                    },
                    _react2.default.createElement(
                        "div",
                        null,
                        _react2.default.createElement("img", {src: _this.__getIcon(item), width: 32, height: 32}),
                        _react2.default.createElement(
                            "div",
                            {
                                className: "toast-item-title",
                                style: {padding: item.message ? "12px 12px 6px 12px" : "20px"}
                            },
                            item.title
                        )
                    ),
                    _react2.default.createElement(
                        "div",
                        {
                            className: "toast-item-content",
                            style: {padding: item.title ? "0px 12px 12px 12px" : "17px"}
                        },
                        item.message
                    )
                ));
            }
            return arr;
        };

        _this.__getIcon = function (item) {
            switch (item.type) {
                case Constants.INFO:
                    return require('./images/info.png');
                case Constants.ERROR:
                    return require('./images/error.png');
                case Constants.SUCCESS:
                    return require('./images/success.png');
                case Constants.WARNING:
                    return require('./images/warning.png');
                default:
                    return require('./images/success.png');
            }
        };

        _this.__addQueue = function (toast) {
            if (_this.state.listToast.length >= _this.props.maxVisible || _this.__queueList[0] && _this.__queueList[0].id != toast.id) {
                if (!_Arrays2.default.isExistByKey(_this.__queueList, "id", toast)) {
                    _this.__queueList.push(toast);
                }
                setTimeout(function () {
                    _this.__addQueue(toast);
                }, TIMEOUTS.RETRY);
                return;
            }
            _Arrays2.default.removeByKey(_this.__queueList, "id", toast);
            _this.__addToast(toast);
        };

        _this.__addToast = function (toast) {
            var list = _this.state.listToast.slice(0);
            var item = _this.state.listToast[_this.state.listToast.length - 1];
            toast.zIndex = item ? item.zIndex - 1 : _this.props.maxVisible;
            if (_this.props.position === "top-right" || _this.props.position === "top-left") {
                list.push(toast);
            } else {
                list.unshift(toast);
            }
            _this.setState({
                listToast: list
            }, _this.__removeToast.bind(undefined, toast));
        };

        _this.__removeToast = function (toast) {
            var element = document.getElementById(toast.id);
            if (element === undefined) {
                return;
            }
            if (!_this.__removeAction) {
                setTimeout(function () {
                    _this.__removeToast(toast);
                }, TIMEOUTS.REMOVE);
                return;
            }
            setTimeout(function () {
                _this.__removeAction = true;
            }, TIMEOUTS.REMOVE);
            _this.__removeAction = false;
            setTimeout(function () {
                _ClassName2.default.replace(element, "toast-item-open", "toast-item-close");
                setTimeout(function () {
                    var arr = _this.state.listToast.slice(0);
                    _Arrays2.default.removeByKey(arr, "id", toast);
                    _this.setState({listToast: arr});
                }, TIMEOUTS.REMOVE);
            }, toast.timeOut);
        };

        _this.__closeOnClick = function (e) {
            var id = e.target.getAttribute("id");
            var element = e.target;
            if (!id) {
                id = e.target.parentNode.getAttribute("id");
                element = e.target.parentNode;
            }
            _ClassName2.default.replace(element, "toast-item-open", "toast-item-close");
            setTimeout(function () {
                var arr = _this.state.listToast.slice(0);
                _Arrays2.default.removeByKey(arr, "id", {id: parseInt(id)});
                _this.setState({listToast: arr});
            }, TIMEOUTS.REMOVE);
        };

        _this.__getTime = function () {
            var d = new Date();
            return d.getTime();
        };

        _this.info = function (message, title, timeOut, onClick) {
            _this.__addQueue({
                id: _this.__getTime(),
                type: Constants.INFO,
                message: message,
                title: title,
                timeOut: timeOut || _this.props.timeOut,
                onClick: onClick || _this.__closeOnClick
            });
        };

        _this.success = function (message, title, timeOut, onClick) {
            _this.__addQueue({
                id: _this.__getTime(),
                type: Constants.SUCCESS,
                message: message,
                title: title,
                timeOut: timeOut || _this.props.timeOut,
                onClick: onClick || _this.__closeOnClick
            });
        };

        _this.warning = function (message, title, timeOut, onClick) {
            _this.__addQueue({
                id: _this.__getTime(),
                type: Constants.WARNING,
                message: message,
                title: title,
                timeOut: timeOut || _this.props.timeOut,
                onClick: onClick || _this.__closeOnClick
            });
        };

        _this.error = function (message, title, timeOut, onClick) {
            _this.__addQueue({
                id: _this.__getTime(),
                type: Constants.ERROR,
                message: message,
                title: title,
                timeOut: timeOut || _this.props.timeOut,
                onClick: onClick || _this.__closeOnClick
            });
        };

        _this.state = {
            listToast: []
        };

        Toast.success = _this.success;
        Toast.info = _this.info;
        Toast.warning = _this.warning;
        Toast.error = _this.error;
        return _this;
    }

    _createClass(Toast, [{
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "div",
                {className: "toast toast-" + this.props.position},
                this.__renderItems()
            );
        }

        /**
         * Toast.info(message, title, timeOut, callback)
         * @param message
         * @param title
         * @param timeOut
         * @param onClick
         */


        /**
         *  Toast.success(message, title, timeOut, callback)
         * @param message
         * @param title
         * @param timeOut
         * @param onClick
         */


        /**
         *  Toast.warning(message, title, timeOut, callback)
         * @param message
         * @param title
         * @param timeOut
         * @param onClick
         */


        /**
         *  Toast.error(message, title, timeOut, callback)
         * @param message
         * @param title
         * @param timeOut
         * @param onClick
         */

    }], [{
        key: "configuration",


        /**
         * Toast.configuration({maxVisible:5,position:"top-right"})
         * @param props
         */
        value: function configuration(props) {
            _reactDom2.default.render(_react2.default.createElement(Toast, props), this.containerNode);
        }
    }]);

    return Toast;
}(_react.Component);

Toast.componentId = _Generator2.default.guid();
Toast.propTypes = {
    /**
     * Desired position of toast to be shown on screen
     * { "top-right", "top-left", "bottom-right", "bottom-left" }
     */
    position: _react2.default.PropTypes.oneOf(["top-right", "top-left", "bottom-right", "bottom-left"]).isRequired,
    /**
     * Maximum available number of visible toasts
     */
    maxVisible: _react2.default.PropTypes.number,
    /**
     *  Message to be shown on Toast
     */
    message: _react2.default.PropTypes.string,
    /**
     *  Message to be shown on Toast
     */
    title: _react2.default.PropTypes.string,
    /**
     *  Display time of toast
     */
    timeOut: _react2.default.PropTypes.number,
    /**
     *  Function to be called when toast is clicked
     */
    onClick: _react2.default.PropTypes.func
};
Toast.defaultProps = {
    position: "top-right",
    timeOut: TIMEOUTS.SHOW,
    maxVisible: 5
};


var element = document.createElement("div");
element.setAttribute("id", Toast.componentId);
document.body.appendChild(element);
Toast.containerNode = document.getElementById(Toast.componentId);
Toast.configuration();
exports.default = Toast;