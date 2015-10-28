# GPDP  
[![Build Status](https://travis-ci.org/gucheen/GPDP.svg?branch=master)](https://travis-ci.org/gucheen/GPDP)
[![Dependency Status](https://david-dm.org/gucheen/GPDP.svg?style=flat-square)](https://david-dm.org/gucheen/GPDP)
[![devDependency Status](https://david-dm.org/gucheen/GPDP/dev-status.svg?style=flat-square)](https://david-dm.org/gucheen/GPDP#info=devDependencies)

Google plus like dropdown selector.

- **Pure JavaScript(none dependencies)**: Easy to be used in any project. 
- **Support complex value types**: Object, Array, Number, Function, etc...
- **Customized themes**

# Installation

## Bower
```
bower install gpdp
```
Add the script and style file to your `index.html`:

```html
<link rel="stylesheet" href="bower_components/gpdp/dist/css/dp.min.css">

<script type="text/javascript" src="bower_components/gpdp/dist/dp.min.js">
</script>
```

## NPM

```
npm install gpdp
```
Add the script and style file to your `index.html`:

```html
<link rel="stylesheet" href="node_modules/gpdp/dist/css/dp.min.css">

<script type="text/javascript" src="node_modules/gpdp/dist/dp.min.js">
</script>
```

## RequireJS
Currently only the JavaScript file can be load asynchronously.

```js
requirejs(['path/to/gpdp'], function (DP) {
  // Use DP function here
});
``` 

# Usage
```js
// New DP
var newDP = new DP(containerElement, options);


/*
* If you want to use complex value,
* define an object of the options like in the example below.
*/
var options = {
  name: 'Complex data',
  data: [{
    label: 'Object',
    value: {
      a: 1
    }
  }, {
    label: 'Array',
    value: [1, 2]
  }, {
    label: 'Function',
    value: function () {
      return 'value returned by function';
    }
  }, {
    label: 'Null',
    value: null
  }]
}

/*
* Attach Event
* eventType: 'changeValue'
* callback: function (value) {} - callback function will have a paramter of the current value.
*/
newDP.listen(eventType, callback);

/*
* Detach Event
*/
newDP.unlisten(eventType, callback);

/*
* Get current value
*/
newDP.getValue();
```

# TODO
1. More features
2. Full unit-testing

# License
The MIT License (MIT)

Copyright (c) 2015 Cheng Gu

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
