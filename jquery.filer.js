/**
 * Custom file upload inputs
 *
 * @version: 0.1.0
 * @license: MIT
 * @author: rumenpetrow@gmail.com
 * @dependancies:
 * - jQuery - https://jquery.com/
 * - UMD (Universal Module Definition) patterns for JavaScript modules that work everywhere. - https://github.com/umdjs/umd/blob/master/templates/jqueryPlugin.js
 */
(function (factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD. Register as an anonymous module.
		define(['jquery'], factory);
	} else if (typeof module === 'object' && module.exports) {
		// Node/CommonJS
		module.exports = function( root, jQuery ) {

		if ( jQuery === undefined ) {
			// require('jQuery') returns a factory that requires window to
			// build a jQuery instance, we normalize how we use modules
			// that require this pattern but the window provided is a noop
			// if it's defined (how jquery works)
			if ( typeof window !== 'undefined' ) {
				jQuery = require('jquery');
			} else {
				jQuery = require('jquery')(root);
			}
		}

		factory(jQuery);

		return jQuery;
		};
	} else {
		// Browser globals
		factory(jQuery);
	}
}(function ($) {
	$.fn.filer = function () { console.log('Hello Filer!'); };
}));