namespace("CoreJs.Bootstrap", function() {
	/**
	 * The head element cleaner.
	 * The maybe most unneeded function of the world, but it seems always
	 * better if the dom model nice cleaned.
	 *
	 * @constructor 
	 * @param {HTMLHeadElement} headElement The document's head node.
	 */
	function HeadCleaner(headElement) {
		Object.call(this);
		this.headElement = headElement;
	}
	HeadCleaner.prototype = Object.create(Object.prototype);
	this.HeadCleaner = HeadCleaner.prototype.constructor = HeadCleaner;
	
	/**
	 * Removes all elements from the element.
	 */
	HeadCleaner.prototype.clean = function() {
		while(this.headElement.children.length > 0) {
			this.headElement.removeChild(this.headElement.children[0]);
		}
	}
});