interface DPDataItem {
  label: string;
  value: any;
}

interface DPOptions {
  name: string;
  data: DPDataItem[];
  valueReturnByFunction?: boolean;
}

interface DPNodes {
  unit?: Element;
  span?: Element;
  menu?: Element;
}

interface DPSettings {
  valueReturnByFunction?: boolean;
}

interface DPStore {
  currentIndex?: any;
  value?: any;
}

interface DPMethodStructure {
  getValue(): any;
    
  setValue(value: string): boolean;
  
  open();
  
  close();
  
  listen(event: string, func: (value: any) => void);
  
  unlisten(event: string, func: (value: any) => void);
}

class DPInitial {
  store: DPStore;
  
  nodes: DPNodes;
  
  settings: DPSettings;
  
  container: HTMLElement;
  
  data: any;
  
  _events: Object;
  
  constructor() {
    this.settings = {};
    this.store = {}
    this.nodes = {};
  }
}

class DPMethods extends DPInitial implements DPMethodStructure {  
  getValue() {
    var value;
    var index;

    index = parseInt(this.store.currentIndex, 10);
    if (index > -1) {
      value = this.data[index].value;
      if (typeof value === 'function') {
        value = value();
      }
    } else {
      value = this.store.value;
    }
    return value;
  }
  
  setValue(value: string) {
    this.store.currentIndex = null;
    this.store.value = value;
    this.trigger('changeValue');
    return true;
  }
  
  setValueIndex(index: number) {
    this.store.value = null;
    this.store.currentIndex = index;
    this.trigger('changeValue');
  }
  
  open() {
    this.nodes.menu.classList.add('open');
  }
  
  close() {
    this.nodes.menu.classList.remove('open');
  }
  
  listen(event: string, func: Function) {
    this._events = this._events || {};
    this._events[event] = this._events[event] || [];
    this._events[event].push(func);
  }
  
  unlisten(event: string, func: Function) {
    this._events = this._events || {};
    if (event in this._events === false) return;
    this._events[event].splice(this._events[event].indexOf(func), 1);
  }
  
  private trigger(event: string) {
    this._events = this._events || {};
    if (event in this._events === false) return;
    for (var i = 0; i < this._events[event].length; i++) {
      this._events[event][i].apply(this, [this.getValue(), Array.prototype.slice.call(arguments, 1)]);
    }
  }
}

class DP extends DPMethods {
  constructor(element: HTMLElement, options: DPOptions) {
    super();
    
    var self = this;
    this.container = element;

    if (typeof options === 'undefined' || typeof options.data === 'undefined') {
      // DOM already
      // store all elements
      this.nodes.unit = this.container.getElementsByClassName('dp-unit')[0];
      this.nodes.span = this.container.getElementsByClassName('dp-span')[0];
      this.nodes.menu = this.container.getElementsByClassName('dp-menu')[0];
    } else {
      // automatically getting return value of function types data
      this.settings.valueReturnByFunction = options.valueReturnByFunction || true;

      // create all elements from data of options
      // store data
      this.data = options.data;

      // validate if data's type is Array
      if (Array.isArray(this.data)) {
        // empty current container (if any)
        this.container.innerHTML = '';
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

        this.data.forEach(function(element, index) {
          listElement = document.createElement('li');
          listElement.classList.add('dp-item');
          listElement.textContent = element.label;
          listElement.dataset.index = index;
          self.nodes.menu.appendChild(listElement);
        });
      } else {
        console.error('Unsupported data type');
      }
    }
		
    /* bind click event */
    document.addEventListener('click', function(event: MouseEvent) {
      if (self.nodes.menu.classList.contains('open') && !self.isDescendant(self.container, event.target)) {
        self.nodes.menu.classList.remove('open');
      }
    });
		
    // click on tag
    this.nodes.span.addEventListener('click', function() {
      self.nodes.menu.classList.toggle('open');
    });

    // click on menu
    this.nodes.menu.addEventListener('click', function(event: MouseEvent) {
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
  }
  
  private isDescendant(parent: Element, child: Element) {
    var node = child.parentNode;
    while (node != null) {
      if (node == parent) {
        return true;
      }
      node = node.parentNode;
    }
    return false;
  }
}