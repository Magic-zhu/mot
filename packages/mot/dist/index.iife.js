(function () {
    'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var EventEmitter = /** @class */ (function () {
        function EventEmitter() {
        }
        EventEmitter.on = function (eventName, listener, options) {
            if (options === void 0) { options = {}; }
            if (eventName === undefined || listener === undefined) {
                console.error("event or listener is required!");
                return;
            }
            if (!(eventName in this._events)) {
                this._events[eventName] = [];
            }
            if (this._events[eventName].length >= this.MAX_LISTENERS) {
                console.error(eventName + "'s number of listeners has reached the limit");
                return;
            }
            this._events[eventName].push({
                handler: listener,
                once: options.once != undefined ? options.once : false,
            });
        };
        EventEmitter.emit = function (eventName) {
            var _this = this;
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            if (!(eventName in this._events)) {
                return false;
            }
            var listeners = this._events[eventName];
            try {
                listeners.forEach(function (eventTarget) {
                    eventTarget.handler.apply(eventTarget, args);
                    if (eventTarget.once === true) {
                        _this.removeListener(eventName, eventTarget.handler);
                    }
                });
            }
            catch (error) {
                console.error(error);
            }
        };
        EventEmitter.once = function (eventName, listener) {
            this.on(eventName, listener, { once: true });
        };
        EventEmitter.off = function (eventName, listener) {
            this.removeListener(eventName, listener);
        };
        EventEmitter.removeListener = function (eventName, listener) {
            if (!(eventName in this._events)) {
                console.warn("there is no event named " + eventName);
                return false;
            }
            var listenerIndex = null;
            for (var i = 0, l = this._events[eventName].length; i < l; i++) {
                if (this._events[eventName][i].handler === listener) {
                    listenerIndex = i;
                    break;
                }
            }
            if (listenerIndex !== null) {
                this._events[eventName].splice(listenerIndex, 1);
            }
        };
        EventEmitter.removeAllListener = function (eventName) {
            if (this._events[eventName] === undefined) {
                console.warn("there is no event named " + eventName);
                return false;
            }
            this._events[eventName] = null;
        };
        EventEmitter.setMaxListeners = function (num) {
            this.MAX_LISTENERS = num;
        };
        //_proto_ no need
        EventEmitter._events = Object.create(null);
        EventEmitter.MAX_LISTENERS = 10;
        return EventEmitter;
    }());

    function isUndef(v) {
        return v === undefined || v === null;
    }
    function isObject(obj) {
        return obj !== null && typeof obj === 'object';
    }
    function isArray(obj) {
        return Array.isArray(obj);
    }
    function clone(origin) {
        if (!isObject(origin) && !isArray(origin)) {
            console.error("The argument must be an object or an array");
            return;
        }
        return JSON.parse(JSON.stringify(origin));
    }
    function copyOptions(origin, target, map) {
        if (!isObject(origin) || !isObject(target)) {
            console.error("The argument must be an object");
            return;
        }
        map.forEach(function (t) {
            if (!isUndef(origin[t])) {
                if (isObject(origin[t])) {
                    target[t] = clone(origin[t]);
                }
                else {
                    target[t] = origin[t];
                }
            }
        });
    }

    var AnimationLanguageSupport = /** @class */ (function () {
        function AnimationLanguageSupport() {
            this.actions = {
                parent: null,
                children: [],
            };
        }
        AnimationLanguageSupport.prototype.initAction = function () {
            return {
                type: 'single',
                parent: this.actions,
                duration: 400,
                timeFunction: "linear",
            };
        };
        AnimationLanguageSupport.prototype.statusOn = function (statusDescription) {
            //    [{
            //        type:'',
            //        description:''
            //    }]
        };
        AnimationLanguageSupport.prototype.statusOff = function (type) {
        };
        AnimationLanguageSupport.prototype.step = function (args, options) {
            if (options === void 0) { options = {}; }
            if (args.length == 0)
                return;
            var actions = {
                type: 'group',
                parent: null,
                children: [],
            };
            actions.duration = isUndef(options.duration) ? 400 : options.duration;
            actions.timeFunction = isUndef(options.timeFunction) ? 'linear' : options.timeFunction;
            args.forEach(function (res) {
                res.parent = actions;
                res.duration = actions.duration;
                res.timeFunction = res.timeFunction === undefined ? actions.timeFunction : res.timeFunction;
                actions.children.push(res);
            });
            this.actions.children.push(actions);
            return this;
        };
        AnimationLanguageSupport.prototype.translate = function (options, y, duration) {
            var action = this.initAction();
            action.action = 'translate';
            if (isObject(options)) {
                copyOptions(options, action, ['x', 'y', 'z', 'duration', 'timeFunction']);
            }
            else {
                action.x = options;
                action.y = y;
                action.duration = duration || 400;
            }
            this.actions.children.push(action);
            return this;
        };
        AnimationLanguageSupport.prototype.moveTo = function (options, y, duration) {
            var action = this.initAction();
            action.action = 'move';
            if (isObject(options)) {
                copyOptions(options, action, ['x', 'y', 'duration', 'timeFunction']);
            }
            else {
                action.x = options;
                action.y = y;
                action.duration = duration || 400;
            }
            this.actions.children.push(action);
            return this;
        };
        AnimationLanguageSupport.prototype.scale = function (options, y, duration) {
            var action = this.initAction();
            action.action = 'scale';
            if (isObject(options)) {
                copyOptions(options, action, ['x', 'y', 'z', 'duration', 'timeFunction']);
            }
            else {
                if (isUndef(y)) {
                    action.x = options;
                    action.y = options;
                }
                else {
                    action.x = options;
                    action.y = options;
                    action.duration = duration || 400;
                }
            }
            this.actions.children.push(action);
            return this;
        };
        AnimationLanguageSupport.prototype.rotate = function (options, duration) {
            var action = this.initAction();
            action.action = 'rotate';
            if (isObject(options)) {
                copyOptions(options, action, ['x', 'y', 'z', 'duration', 'timeFunction']);
            }
            else {
                action.z = options;
                action.duration = duration || 400;
            }
            this.actions.children.push(action);
            return this;
        };
        AnimationLanguageSupport.prototype.skew = function (options, y, duration) {
            var action = this.initAction();
            action.action = 'skew';
            if (isObject(options)) {
                copyOptions(options, action, ['x', 'y', 'z', 'duration', 'timeFunction']);
            }
            else {
                action.x = options;
                action.y = y;
                action.duration = duration || 400;
            }
        };
        AnimationLanguageSupport.prototype.attribute = function (options, value, duration) {
            var action = this.initAction();
            action.action = 'attribute';
            if (isObject(options)) {
                copyOptions(options, action, ['key', 'value', 'duration', 'timeFunction']);
            }
            else {
                action.key = options;
                action.value = value;
                action.duration = duration || 400;
            }
            this.actions.children.push(action);
            return this;
        };
        AnimationLanguageSupport.prototype.path = function () {
            var action = this.initAction();
            action.action = 'path';
            return action;
        };
        AnimationLanguageSupport.prototype.wait = function (time) {
            var action = this.initAction();
            action.action = 'wait';
            action.time = time;
            this.actions.children.push(action);
            return this;
        };
        return AnimationLanguageSupport;
    }());

    var Motion = /** @class */ (function (_super) {
        __extends(Motion, _super);
        function Motion() {
            return _super.call(this) || this;
        }
        Motion.use = function (plugin) {
            var pluginName = plugin.pluginName;
            if (isUndef(pluginName)) {
                console.error("Plugin Class must specify plugin's name in static property by 'name' field.");
                return this;
            }
            if (isUndef(plugin.installed)) {
                console.error("Plugin Class must specify plugin's installed in static property by 'installed' field.");
                return this;
            }
            if (isUndef(plugin.install)) {
                console.error("Plugin Class must have an install method.");
                return this;
            }
            if (this.plugins[pluginName] != undefined) {
                console.log("🌈This plugin has been registered, maybe you could change plugin's name");
                return this;
            }
            plugin.install(Motion);
            plugin.installed = true;
            this.plugins[pluginName] = plugin;
            return this;
        };
        Motion.register = function (methodName, method) {
            if (!isUndef(this[methodName])) {
                console.error(methodName + " has already exist");
                return;
            }
            this[methodName] = method;
        };
        Motion.create = function () {
            return new AnimationLanguageSupport();
        };
        Motion.plugins = {};
        return Motion;
    }(EventEmitter));

    var mot = Motion;
    if (window['mot']) {
        console.warn("'mot' had been used,and it will be covered");
    }
    window['mot'] = mot;

    return mot;

}());
