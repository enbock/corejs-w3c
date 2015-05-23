"use strict";

require("./load");
global.CoreJs = require("../src/core.js");

global.chai = require('chai');
global.expect = chai.expect;
global.should = chai.should();
global.sinon  = require("sinon");

// run tests
require("./core.js");