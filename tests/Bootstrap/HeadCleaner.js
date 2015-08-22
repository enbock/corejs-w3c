describe("CoreJs.Bootstrap.HeadCleaner", function() {
	it("#clean", function() {
		var headElement = {
			children: ["element"],
			removeChild: function() {
				this.children = [];
			}
		};
		
		var mock = sinon.mock(headElement);
		
		var testObject = new CoreJs.Bootstrap.HeadCleaner(headElement);
		testObject.clean();
		
		mock.expects("removeChild").once().withExactArgs("element");
	})
});