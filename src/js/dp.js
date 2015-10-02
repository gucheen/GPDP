/**
 * GPDP dropdown selector
 * Constructor for building object
 * @param element
 * @param {Object=} options
 * @param {Array.<Object>=} options.data
 * @param {boolean=} options.valueReturnByFunction
 * @returns {DP}
 * @constructor
 */
var DP = function (element, options) {
  var self = this;

  // store container
  self.container = element;
  if (typeof options === 'undefined' || typeof options.data === 'undefined') {
    // DOM already
    // store all elements
    self.unit = self.container.getElementsByClassName('dp-unit')[0];
    self.span = self.container.getElementsByClassName('dp-span')[0];
    self.menu = self.container.getElementsByClassName('dp-menu')[0];
  } else {
    // automatically getting return value of function types data
    self.valueReturnByFunction = options.valueReturnByFunction;

    // create all elements from data of options
    // store data
    self.data = options.data;

    // validate if data's type is Array
    if (Array.isArray(self.data)) {
      // empty current container (if any)
      self.container.innerHTML = '';
      self.container.classList.add('dp-container');

      // create all elements
      // unit
      self.unit = document.createElement('div');
      self.unit.classList.add('dp-unit');
      self.container.appendChild(self.unit);

      // span(label)
      self.span = document.createElement('div');
      self.span.classList.add('dp-span');
      self.span.textContent = options.name;
      self.unit.appendChild(self.span);

      // menu(ul)
      self.menu = document.createElement('ul');
      self.menu.classList.add('dp-menu');
      self.unit.appendChild(self.menu);

      // insert menu list
      var listElement;

      self.data.map(function (element, index) {
        listElement = document.createElement('li');
        listElement.classList.add('dp-item');
        listElement.textContent = element.label;
        listElement.dataset.index = index;
        self.menu.appendChild(listElement);
      });
    } else {
      console.error('Unsupported data type');
    }
  }

  /* bind click event */
  document.addEventListener('click', function (event) {
    if (self.menu.classList.contains('open') && !self.isDescendant(self.container, event.target)) {
      self.menu.classList.remove('open');
    }
  });

  // click on tag
  self.span.addEventListener('click', function (event) {
    self.menu.classList.toggle('open');
  });

  // click on menu
  self.menu.addEventListener('click', function (event) {
    if (event.target.classList.contains('dp-item')) {
      var index = parseInt(event.target.dataset.index, 10);

      if (index > -1) {
        self.setValueIndex(index);
      } else {
        self.setValue(event.target.dataset.value);
      }
      self.close();
    }
  });

  return this;
};

/**
 * Attach an event
 * @param event - event's name
 * @param {eventCallback}func - callback function
 */
DP.prototype.listen = function (event, func) {
  this._events = this._events || {};
  this._events[event] = this._events[event] || [];
  this._events[event].push(func);
};

/**
 * callback function definition of events
 * @callback eventCallback
 * @param {*} value - current selected value
 */

/**
 * Detach an event
 * @param event - event's name
 * @param func - callback function
 */
DP.prototype.unlisten = function (event, func) {
  this._events = this._events || {};
  if( event in this._events === false  )	return;
  this._events[event].splice(this._events[event].indexOf(func), 1);
};

/**
 * Trigger an event
 * @private
 * @param event - event's name
 */
DP.prototype.trigger = function (event) {
  this._events = this._events || {};
  if (event in this._events === false) return;
  for (var i = 0; i < this._events[event].length; i++) {
    this._events[event][i].apply(this, [this.getValue(), Array.prototype.slice.call(arguments, 1)]);
  }
};

/**
 * get current selected value
 * @returns {*} - current value
 */
DP.prototype.getValue = function () {
  var value;
  var index;

  index = parseInt(this.container.dataset.index, 10);
  if (index > -1) {
    value = this.data[index].value;
    if (typeof value === 'function') {
      value = value();
    }
  } else {
    value = this.container.dataset.value;
  }
  return value;
};

/**
 * set current selected value
 * @param value
 */
DP.prototype.setValue = function (value) {
  this.container.dataset.index = null;
  this.container.dataset.value = value;
  this.trigger('changeValue');
  return true;
};

/**
 * set current selected value(index mode)
 * @private
 * @param index
 */
DP.prototype.setValueIndex = function (index) {
  this.container.dataset.value = null;
  this.container.dataset.index = index;
  this.trigger('changeValue');
};

/**
 * open dropdown menu
 */
DP.prototype.open = function () {
  this.menu.classList.add('open');
};

/**
 * close dropdown menu
 */
DP.prototype.close = function () {
  this.menu.classList.remove('open');
};

//region Function for checking descendant
/**
 * Check descendant
 * @private
 * @param parent - parent element
 * @param child - child element
 * @returns {boolean} - if is descendant
 */
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
//endregion