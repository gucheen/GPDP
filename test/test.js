/**
 * Created by gucheng on 9/30/15.
 */

var testElement = document.createElement('div');

var testOptions = {
  name: 'Test',
  data: [
    {label: 'Object', value: {a: 1}},
    {label: 'Array', value: [1, 2]},
    {
      label: 'Function',
      value: function () {
        return 'value returned by function';
      }
    },
    {label: 'Null', value: null}
  ]
};

var testDP = new DP(testElement, testOptions);

describe('DP', function () {
  describe('#DOM elements', function () {
    it('should create all DOM components', function () {
      expect(testElement.getElementsByClassName('dp-unit')).to.have.length(1);
      expect(testElement.getElementsByClassName('dp-span')).to.have.length(1);
      expect(testElement.getElementsByClassName('dp-menu')).to.have.length(1);
      expect(testElement.getElementsByClassName('dp-item')).to.have.length(testOptions.data.length);
    });
    it('should set text of "dp-span" to value of "name" in options', function () {
      expect(testElement.getElementsByClassName('dp-span')[0].textContent).to.be(testOptions.name);
    });
  });
  describe('#handling value', function () {
    var tests = [1, 11, 111];
    tests.forEach(function (test, index) {
      it('should return "true" after calling setValue(' + test + ')', function () {
        expect(testDP.setValue(test)).to.be.ok();
      });
      it('should return "' + test + '" after calling getValue()', function () {
        expect(testDP.getValue()).to.be(tests[index]);
      });
    });
  });
  describe('#complex value', function () {
    testOptions.data.forEach(function (element, index) {
      var correctValue;
      if (typeof element.value === 'function') {
        correctValue = element.value();
      } else {
        correctValue = element.value;
      }
      it('should set value to "' + JSON.stringify(correctValue) + '" after selected the ' + (index + 1) + ' item', function () {
        testElement.getElementsByClassName('dp-item')[index].click();
        expect(testDP.getValue()).to.be(correctValue);
      });
    });
  });
});