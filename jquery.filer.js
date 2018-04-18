/**
 * Custom file upload inputs.
 *
 * @version: 0.1.1
 * @license: MIT
 * @author: rumenpetrow@gmail.com
 * @dependancies:
 * - jQuery - https://jquery.com/
 * @todo:
 * - Add upload button.
 * - Add destroy function.
 * - Add methods, callbacks and custom events.
 * - Refactor events unbinding function.
 */
(function($, window, document, undefined) {
	'use strict';

	var pluginName = 'filer';

	/**
	 * Plugin constructor.
	 * 
	 * @param {Object} element  Current input field.
	 * @param {Object} settings Plugin settings.
	 */
	function Filer(element, settings) {
		this.initialize(element, settings);
	};

	Filer.prototype = {
		/**
		 * Default Settings.
		 * 
		 * @type {String} placeholder Initial placeholder text if placeholder attribute is not provided.
		 */
		defaults: {
			placeholder: 'No file chosen'
		},
		settings: {},
		$input: null,
		$holder: null,
		$inputDummy: null,
		placeholder: null,
		initialize: function(element, settings) {
			this.settings = $.extend(true, {}, this.defaults, settings);

			this.cacheConfig(element, this.settings);
		},
		cacheConfig: function(element, settings) {
			this.$input = $(element);

			if (this.$input.attr('placeholder')) {
				this.placeholder = this.$input.attr('placeholder');
			} else {
				this.placeholder = settings.placeholder;
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
		unbindEvents: function() {
			this.$input.off('change');
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

	/**
	 * Export filer to jQuery namespace.
	 * 
	 * @param  {Object} settings The settings of the constructor.
	 * @return {Object}          New Filer instance.
	 */
	$.fn.filer = function(settings) {
		return this.each(function() {
			if (!$.data(this, pluginName)) {
				$.data(this, pluginName, 
					new Filer(this, settings));
			}
		});
	}
})(jQuery, window, document);