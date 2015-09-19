"use strict";

require("./load");

/**
 * Auto load system.
 * 
 * @signleton
 */
function useTest(fullQualifiedClassName) {
	var container = use.getContainer(fullQualifiedClassName);
	
	if (container._loader === null) {
		container._loader = true;
		// Load into script ram
		require(container._path + use.fileExtension);
	}
}
useTest.context  = use.context;
useTest.classPathDelimiter = use.classPathDelimiter;
useTest.fileExtension = use.fileExtension;
useTest._psr4 = use._psr4;
useTest.psr4 = use.psr4;
useTest.getContainer = use.getContainer
global.use = useTest;
use.psr4("CoreJs", "../src");

require("./Bootstrap");
require("./FileSystem");