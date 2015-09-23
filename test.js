var testDp = new DP(document.getElementsByClassName('dp-container')[0]);

testDp.listen('changeValue', function () {
	document.getElementsByClassName('test-result')[0].textContent = testDp.getValue();
});