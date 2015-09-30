var testDp = new DP(document.getElementsByClassName('dp-container')[0]);

testDp.listen('changeValue', function (value) {
  document.getElementsByClassName('test-result')[0].textContent = value;
});

var testDp2 = new DP(document.getElementsByClassName('test2')[0], {
  name: 'Complex data',
  data: [
    {label: 1, value: {a: 1}},
    {label: 2, value: [1, 2]},
    {
      label: 3,
      value: function () {
        return 'value returned by function';
      }
    },
    {label: 4, value: null}
  ]
});

testDp2.listen('changeValue', function (value) {
  console.log('%cLOG VALUE: testDp2', 'color: blue', value);
});