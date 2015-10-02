# GPDP
Google plus like dropdown selector  

[![Build Status](https://travis-ci.org/gucheen/GPDP.svg?branch=master)](https://travis-ci.org/gucheen/GPDP)
[![Dependency Status](https://david-dm.org/gucheen/GPDP.svg?style=flat-square)](https://david-dm.org/gucheen/GPDP)
[![devDependency Status](https://david-dm.org/gucheen/GPDP/dev-status.svg?style=flat-square)](https://david-dm.org/gucheen/GPDP#info=devDependencies)

# Features
1. Pure JavaScript and CSS(none dependencies)
2. Support complex value types. Object, Array, Number, Function,  etc...
3. Customized themes

# Usage
```js
// New DP
var newDP = new DP(containerElement, options);

/*
* Attach Event
* eventType: 'changeValue'
* callback: function (value) {}
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
