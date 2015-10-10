

describe("CoreJs.DependencyInjection.Container", function() {
	var context, oldContext;
	
	beforeEach(function() {
		oldContext  = use.context;
		use.context = context = {
			TCoreJs: {
				Test: function(injected) {
					this.isCreated = true;
					this.injected  = injected;
				},
				Other: function() {
					this.theOther = true;
				}
			}
		};
	});
	
	afterEach(function() {
		use.context = oldContext;
	})
	
    it("get a service without arguments", function() {
        var testObject = new CoreJs.DependencyInjection.Container(
            {
                services: {
                    "my_test": {
                        "class": "TCoreJs.Test"
                    }
                }
            }
        );

        var result = testObject.get("my_test");
        assert.equal(
            true, result instanceof context.TCoreJs.Test,
            "Service has wrong instance type"
        );
        assert.equal(true, result.isCreated);

        var result2 = testObject.get("my_test");
        assert.equal(result, result2);
    });

    it("get a service with arguments", function() {
        var testObject = new CoreJs.DependencyInjection.Container(
            {
                services: {
                    "my_test": {
                        "class": "TCoreJs.Test",
                        "arguments": [
                            new String("Hello Injection.")
                        ]
                    }
                }
            }
        );

        var result = testObject.get("my_test");
        assert.equal(
            true, result instanceof context.TCoreJs.Test,
            "Service has wrong instance type"
        );
        assert.equal("Hello Injection.", result.injected);
    });

    it("get a service with service as argument", function() {
        var testObject = new CoreJs.DependencyInjection.Container(
            {
                services: {
                    "my_test": {
                        "class": "TCoreJs.Test",
                        "arguments": [
                            "@my_other"
                        ]
                    },
                    "my_other": {
                        "class": "TCoreJs.Other"
                    }
                }
            }
        );

        var result = testObject.get("my_test");
        assert.equal(
            true, result instanceof context.TCoreJs.Test,
            "Service has wrong instance type"
        );
        assert.equal(
            true, result.injected instanceof context.TCoreJs.Other,
            "Sub service has wrong instance type"
        );
        assert.equal(true, result.injected.theOther);
    });

    it("get a service with a global variable injection", function() {
		context.gVar   = "hello global";
        var testObject = new CoreJs.DependencyInjection.Container(
            {
                services: {
                    "my_test": {
                        "class": "TCoreJs.Test",
                        "arguments": [
                            "$gVar"
                        ]
                    }
                }
            }
        );

        var result = testObject.get("my_test");
        assert.equal(
            true, result instanceof context.TCoreJs.Test,
            "Service has wrong instance type"
        );
        assert.equal("hello global", result.injected);
    });

    it("load classes", function() {
        var testObject = new CoreJs.DependencyInjection.Container(
			{
				services: {
					"my_test": {
						"class": "TCoreJs.Test",
					}
				}
			}
		);
		var orgUse = global.use;
		global.use = sinon.stub();
		
        testObject.load();
        
		use.should.been.calledWithExactly("TCoreJs.Test")
		global.use = orgUse;
    });

    it("set a service from outside", function() {
        var testObject = new CoreJs.DependencyInjection.Container({});
        var service = {external: "service"};
        testObject.set("external.service", service);
        assert.equal(testObject.get("external.service"), service);
    });
});