/* global global */
var fs = require("fs");
require("./domStack.js");

module.exports = function (file, classList) {
	var functions = new Function(
		String(fs.readFileSync(file)) +
		"return [" + classList.join(",") + "];"
	)();
	for (var index = 0; index < classList.length; index++) {
		var element     = classList[index];
		global[element] = functions[index];
	}
}