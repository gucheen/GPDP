/**
 * @license
 * Copyright (c) 2016 Cheng Gu
 * GPDP
 * Author: guchengf@live.com
 * Version: 0.1.4
 * Link: https://github.com/gucheen/GPDP
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var DPInitial = (function () {
    function DPInitial() {
        this.settings = {};
        this.store = {};
        this.nodes = {};
    }
    return DPInitial;
})();
var DPMethods = (function (_super) {
    __extends(DPMethods, _super);
    function DPMethods() {
        _super.apply(this, arguments);
    }
    DPMethods.prototype.getValue = function () {
        var value;
        var index;
        index = parseInt(this.store.currentIndex, 10);
        if (index > -1) {
            value = this.data[index].value;
            if (typeof value === 'function') {
                value = value();
            }
        }
        else {
            value = this.store.value;
        }
        return value;
    };
    DPMethods.prototype.setValue = function (value) {
        this.store.currentIndex = null;
        this.store.value = value;
        this.trigger('changeValue');
        return true;
    };
    DPMethods.prototype.setValueIndex = function (index) {
        this.store.value = null;
        this.store.currentIndex = index;
        this.trigger('changeValue');
    };
    DPMethods.prototype.open = function () {
        this.nodes.menu.classList.add('open');
    };
    DPMethods.prototype.close = function () {
        this.nodes.menu.classList.remove('open');
    };
    DPMethods.prototype.listen = function (event, func) {
        this._events = this._events || {};
        this._events[event] = this._events[event] || [];
        this._events[event].push(func);
    };
    DPMethods.prototype.unlisten = function (event, func) {
        this._events = this._events || {};
        if (event in this._events === false)
            return;
        this._events[event].splice(this._events[event].indexOf(func), 1);
    };
    DPMethods.prototype.trigger = function (event) {
        this._events = this._events || {};
        if (event in this._events === false)
            return;
        for (var i = 0; i < this._events[event].length; i++) {
            this._events[event][i].apply(this, [this.getValue(), Array.prototype.slice.call(arguments, 1)]);
        }
    };
    return DPMethods;
})(DPInitial);
var DP = (function (_super) {
    __extends(DP, _super);
    function DP(element, options) {
        _super.call(this);
        var self = this;
        this.container = element;
        if (typeof options === 'undefined' || typeof options.data === 'undefined') {
            // DOM already
            // store all elements
            this.nodes.unit = this.container.getElementsByClassName('dp-unit')[0];
            this.nodes.span = this.container.getElementsByClassName('dp-span')[0];
            this.nodes.menu = this.container.getElementsByClassName('dp-menu')[0];
        }
        else {
            // automatically getting return value of function types data
            this.settings.valueReturnByFunction = options.valueReturnByFunction || true;
            // create all elements from data of options
            // store data
            this.data = options.data;
            // validate if data's type is Array
            if (Array.isArray(this.data)) {
                // empty current container (if any)
                while (this.container.hasChildNodes()) {
                    this.container.removeChild(this.container.lastChild);
                }
                this.container.classList.add('dp-container');
                // create all elements
                // unit
                this.nodes.unit = document.createElement('div');
                this.nodes.unit.classList.add('dp-unit');
                this.container.appendChild(this.nodes.unit);
                // span(label)
                this.nodes.span = document.createElement('div');
                this.nodes.span.classList.add('dp-span');
                this.nodes.span.textContent = options.name;
                this.nodes.unit.appendChild(this.nodes.span);
                // menu(ul)
                this.nodes.menu = document.createElement('ul');
                this.nodes.menu.classList.add('dp-menu');
                this.nodes.unit.appendChild(this.nodes.menu);
                // insert menu list
                var listElement;
                this.data.forEach(function (element, index) {
                    listElement = document.createElement('li');
                    listElement.classList.add('dp-item');
                    listElement.textContent = element.label;
                    listElement.dataset.index = index;
                    self.nodes.menu.appendChild(listElement);
                });
            }
            else {
                console.error('Unsupported data type');
            }
        }
        /* bind click event */
        document.addEventListener('click', function (event) {
            var target = event.target;
            if (self.nodes.menu.classList.contains('open') && !self.isDescendant(self.container, target)) {
                self.nodes.menu.classList.remove('open');
            }
        });
        // click on tag
        this.nodes.span.addEventListener('click', function () {
            self.nodes.menu.classList.toggle('open');
        });
        // click on menu
        this.nodes.menu.addEventListener('click', function (event) {
            var target = event.target;
            if (target.classList.contains('dp-item')) {
                var index = parseInt(target.dataset['index'], 10);
                if (index > -1) {
                    self.setValueIndex(index);
                }
                else {
                    self.setValue(target.dataset['value']);
                }
                self.close();
            }
        });
    }
    DP.prototype.isDescendant = function (parent, child) {
        var node = child.parentNode;
        while (node != null) {
            if (node == parent) {
                return true;
            }
            node = node.parentNode;
        }
        return false;
    };
    return DP;
})(DPMethods);
