/**
 * Created by gucheng on 9/30/15.
 */

var testElement = document.createElement('div');

var testOptions = {
  name: 'Test',
  data: [
    {label: 'test1', value: 1},
    {label: 'test2', value: 2}
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
    var tests = [1, 2, 3];
    tests.forEach(function (test, index) {
      it('should return "true" after calling setValue(' + test + ')', function () {
        expect(testDP.setValue(test)).to.be.ok();
      });
      it('should return "' + test + '" after calling getValue()', function () {
        expect(testDP.getValue()).to.be(tests[index].toString());
      });
    });
  });
  describe('#complex value', function () {

  });
});