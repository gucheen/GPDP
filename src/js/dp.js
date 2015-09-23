/**
 * GPDP dropdown selector
 * Constructor for building object
 * @param element
 * @param options
 * @returns {DP}
 * @constructor
 */
var DP = function (element, options) {
  var self = this;

  // store all elements
  self.container = element;
  self.unit = self.container.getElementsByClassName('dp-unit')[0];
  self.span = self.container.getElementsByClassName('dp-span')[0];
  self.menu = self.container.getElementsByClassName('dp-menu')[0];

  /* bind click event */
  // TODO: more efficient method
  document.addEventListener('click', function (event) {
    if (self.menu.classList.contains('open') && !isDescendant(self.container, event.target)) {
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
      self.setValue(event.target.dataset.value);
      self.close();
    }
  });

  return this;
};

/**
 * Attach an event
 * @param event - event's name
 * @param func - callback function
 */
DP.prototype.listen = function (event, func) {
  this._events = this._events || {};
  this._events[event] = this._events[event] || [];
  this._events[event].push(func);
};

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
 * @param event - event's name
 */
DP.prototype.trigger = function (event /* , args... */) {
  this._events = this._events || {};
  if (event in this._events === false) return;
  for (var i = 0; i < this._events[event].length; i++) {
    this._events[event][i].apply(this, Array.prototype.slice.call(arguments, 1));
  }
};

/**
 * get current selected value
 * @returns {*} - current value
 */
DP.prototype.getValue = function () {
  return this.container.dataset.value;
};

/**
 * set current selected value
 * @param value
 */
DP.prototype.setValue = function (value) {
  this.container.dataset.value = value;
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
 * @param parent - parent element
 * @param child - child element
 * @returns {boolean} - if is descendant
 */
var isDescendant = function (parent, child) {
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
