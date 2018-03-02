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
			this.options = $.extend(true, {}, this.defaults, options);

			this.cacheConfig(element, options);
		},
		cacheConfig: function(element, options) {
			this.$input = $(element);

			if (this.$input.attr('placeholder')) {
				this.placeholder = this.$input.attr('placeholder');
			}

			if (!this.$input.attr('data-filer')) {
				this.buildMarkup();
			}
		},
		buildMarkup: function() {
			this.$input.wrap('<div class="filer-wrap">');

			this.$holder = this.$input.closest('.filer-wrap');

			this.$holder.append('<input type="text" class="filer-dummy" placeholder="'+ this.placeholder +'" />');

			this.$inputDummy = this.$holder.find('input[type="text"]');

			this.bindEvents();
		},
		bindEvents: function() {
			var self = this;

			self.$input.on('change', function() {
				self.upload(this);
			});
		},
		upload: function(element) {
			var value = '';

			if ($(element).val()) {
				for (var i = 0; i < element.files.length; i++) {
					value = i > 0 ? value + ', ' + element.files[i].name : element.files[i].name
				};
			}

			this.$inputDummy.val(value);
		}
	};

	$.fn.filer = function(options) {
		return this.each(function() {
			if (!$.data(this, pluginName)) {
				$.data(this, pluginName, 
					new Filer(this, options));
			}
		});
	}
})(jQuery, window, document);