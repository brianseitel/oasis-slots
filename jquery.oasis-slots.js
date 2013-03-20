// scripts and/or other plugins which may not be closed properly.
;(function($, window, document, undefined ) {

	// Create the defaults once
	var pluginName = "Slots",
		defaults = {
			number: 100,
			duration: 1000,
			delay: 100
		};

	// The actual plugin constructor
	function Slots( element, options ) {
		this.element = element;

		// jQuery has an extend method which merges the contents of two or
		// more objects, storing the result in the first object. The first object
		// is generally empty as we don't want to alter the default options for
		// future instances of the plugin
		this.options = $.extend({}, defaults, options );

		this._defaults = defaults;
		this._name = pluginName;
		this.values = [];
		this.count = 0;
		this.total_values = 0;
		this.looper = null;
		this.element = $(element);

		this.init();
	}

	Slots.prototype = {

		init: function() {
			for (var i = 0; i < this.options.number; i++)
				this.values.push(i);

			this.total_values = parseInt(this.options.duration / this.options.delay, 10);
			if (this.total_values > this.values.length) this.total_values = this.values.length;
			this.startSpin();
		},

		shuffleValues: function() {
			var i = this.values.length, j, k, l;
			if ( i === 0 ) return false;
			while ( --i ) {
				j = Math.floor( Math.random() * ( i + 1 ) );
				k = this.values[i];
				l = this.values[j];
				this.values[i] = l;
				this.values[j] = k;
			}
		},

		startSpin: function() {
			this.shuffleValues();
			this.looper = setInterval($.proxy(this.spinSlots, this), this.options.delay);
		},

		spinSlots: function() {
			this.element.html(this.values[this.count])
				.animate({top: -this.element.height()}, this.options.delay)
				.animate({top: this.element.height()}, 0);
			if (this.count >= this.total_values) {
				var randDelay = Math.floor(Math.random() * (this.options.duration / 3));
				this.element.stop()
					.html(this.number)
					.animate({top: 0}, (this.options.duration / 2) + randDelay, 'swing');
				clearTimeout(this.looper);
			}
			this.count++;
		}
	};

	// A really lightweight plugin wrapper around the constructor,
	// preventing against multiple instantiations
	$.fn[pluginName] = function ( options ) {
		return this.each(function () {
			if (!$.data(this, "plugin_" + pluginName)) {
				$.data(this, "plugin_" + pluginName, new Slots( this, options ));
			}
		});
	};

})( jQuery, window, document );