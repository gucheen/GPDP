requirejs(['dist/js/dp.min.js'], function (DP) {
  var testDp = new DP(document.getElementsByClassName('dp-container')[0]);

  testDp.listen('changeValue', function (value) {
    document.getElementsByClassName('test-result')[0].textContent = value;
  });

  var testDp2 = new DP(document.getElementsByClassName('test2')[0], {
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
  });

  testDp2.listen('changeValue', function (value) {
    console.log('%cLOG VALUE: testDp2', 'color: blue', value);
    document.getElementsByClassName('test2-result')[0].textContent = (typeof value) + ' : ' + JSON.stringify(value, null, 2);
  });
});