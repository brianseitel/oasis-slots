(function(global) {

	var $ = jQuery;

	$.fn.Slots = function(number, options) {

		this.options = $.extend({
			duration: 100, // in milliseconds (default: 300)
			delay: 10 // delay in milliseconds (default: 10ms)
		}, options);
		var values = [];
		var $this = $(this);
		for (var i = 0; i < number; i++)
			values.push(i);

		values = shuffle(values);
		var count = 0;
		var total_values = parseInt(this.options.duration / this.options.delay, 10);

		if (total_values > values.length) total_values = values.length;

		var opts = this.options;
		var looper = setInterval(function() {
			$this.html(values[count])
					.animate({top: -$this.height()}, opts.delay)
					.animate({top: $this.height()}, 0);
			if (count >= total_values) {
				var randDelay = Math.floor(Math.random() * (opts.duration / 3));
				$this.stop()
					.html(number)
					.animate({top: 0}, (opts.duration / 2) + randDelay, 'swing');
				clearTimeout(looper);
			}
			count++;
		}, this.options.delay);
	};

	function shuffle ( data ) {
		var i = data.length, j, k, l;
		if ( i === 0 ) return false;
		while ( --i ) {
			j = Math.floor( Math.random() * ( i + 1 ) );
			k = data[i];
			l = data[j];
			data[i] = l;
			data[j] = k;
		}

		return data;
	}
})(window);