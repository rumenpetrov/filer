/**
 * Custom file upload inputs.
 *
 * @version: 0.1.0
 * @license: MIT
 * @author: rumenpetrow@gmail.com
 * @dependancies:
 * - jQuery - https://jquery.com/
 */
(function($, window, document, undefined) {
	'use strict';

	var pluginName = 'filer';

	function Filer(element, options) {
		this.initialize(element, options);
	};

	Filer.prototype = {
		defaults: {},
		options: {},
		$input: null,
		$holder: null,
		$inputDummy: null,
		placeholder: '',
		initialize: function(element, options) {
			var self = this;
			
			self.options = $.extend(true, {}, self.defaults, options);

			// self.validateInput();
			self.cacheConfig(element, options);
		},
		validateInput: function() {
			var self = this;

			if (!self.options.$input.length) {
				console.error(pluginName + ': Element missing!');
				console.error(pluginName + ': Stop execution!');
			}

			if (self.options.$input.length > 1) {
				console.error(pluginName + ': Multiple elements detected!');
				console.error(pluginName + ': Stop execution!');
			}

			self.cacheConfig();
		},
		cacheConfig: function(element, options) {
			var self = this;

			self.$input = $(element);

			if (self.$input.attr('placeholder')) {
				self.placeholder = self.$input.attr('placeholder');
			}

			if (!self.$input.attr('data-filer')) {
				self.buildMarkup();
				self.$input.data('filer', self);
			} else {
				// already exist
			}
		},
		buildMarkup: function() {
			var self = this;

			self.$input.wrap('<div class="filer-wrap">');

			self.$holder = self.$input.closest('.filer-wrap');

			self.$holder.append('<input type="text" class="filer-dummy" placeholder="'+ self.placeholder +'" disabled="disabled" />');

			self.$inputDummy = self.$holder.find('input[type="text"]');

			self.bindEvents();
		},
		bindEvents: function() {
			var self = this;

			self.$input.on('change', function() {
				self.upload(this);
			});
		},
		upload: function(element) {
			var self = this;
			var value = $(element).val() ? element.files[0].name : '';

			self.$inputDummy.val(value);
		}
	};

	$.fn.filer = function(options) {
		this.each(function() {
			new Filer(this, options);
		});
	}
})(jQuery, window, document);