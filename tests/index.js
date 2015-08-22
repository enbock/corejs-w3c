"use strict";

require("./load");
global.CoreJs = require("../src/core.js");

global.chai = require('chai');
global.should = chai.should();
global.sinon  = require("sinon");
var sinonChai = require("sinon-chai");
chai.use(sinonChai);
global.expect = chai.expect;
global.assert = chai.assert;

// run tests
require("./core.js");
require("./Bootstrap");