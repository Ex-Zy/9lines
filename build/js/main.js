'use strict';

svg4everybody();

(function() {
	var iterate = function iterate(items, callback) {
		items.forEach(function(item) {
			var key = void 0;
			var value = void 0;

			if (typeof item === 'string') {
				key = item;
				value = item;
			} else {
				key = item[0];
				value = item[1];
			}

			callback(key, value);
		});
	};

	var check = function check(category, items) {
		iterate(items, function(key, value) {
			if (bowser[key]) {
				$(document.documentElement).addClass('is-' + category + '-' + value);
			}
		});
	};

	check('engine', ['webkit', 'blink', 'gecko', ['msie', 'ie'],
		['msedge', 'edge']
	]);

	check('device', ['mobile', 'tablet']);

	check('browser', ['chrome', 'firefox', ['msie', 'ie'],
		['msedge', 'edge'], 'safari', 'android', 'ios', 'opera', ['samsungBrowser', 'samsung'], 'phantom', 'blackberry', 'webos', 'silk', 'bada', 'tizen', 'seamonkey', 'sailfish', 'ucbrowser', 'qupzilla', 'vivaldi', 'sleipnir', 'kMeleon'
	]);

	check('os', ['mac', 'windows', 'windowsphone', 'linux', 'chromeos', 'android', 'ios', 'iphone', 'ipad', 'ipod', 'blackberry', 'firefoxos', 'webos', 'bada', 'tizen', 'sailfish']);
})();

var $window = $(window);
var $document = $(document);
var $html = $(document.documentElement);
var $body = $(document.body);

var app = function(win, doc) {
	function checkboxCounter(elems) {
		var countLength = elems.length;
		var countChecked = 0;

		for (var i = 0; i < countLength; i++) {
			if (elems[i].checked === true) {
				countChecked++;
			}
		}

		return {
			length: function length() {
				return countLength;
			},
			checked: function checked() {
				return countChecked;
			}
		};
	}

	function checkboxHandler(e) {
		var el = e.target;

		if (el.hasAttribute('checked')) {
			el.removeAttribute('checked');
		} else {
			el.setAttribute('checked', 'checked');
		}
	}

	var checkboxes = doc.querySelectorAll('[type="checkbox"]');
	var pieArrow = doc.querySelector('[data-arrow]');
	var maxDeg = 180;
	var maxCount = 1000;
	var len = checkboxCounter(checkboxes).length();
	var check = checkboxCounter(checkboxes).checked();
	var currentCountValue = function currentCountValue(currentCheckedElemens) {
		return Math.round(currentCheckedElemens * maxCount / len);
	};
	var pieValue = function pieValue(countVal) {
		return Math.round(countVal * maxDeg / maxCount);
	};

	for (var i = 0; i < checkboxes.length; i++) {
		checkboxes[i].addEventListener('change', checkboxHandler, false);
	}

	return {
		init: function init() {
			var pieGraph = function() {
				var pieTransform = pieArrow.style.transform;

				return {
					start: function start(val) {
						pieTransform = 'rotate(' + val + 'deg)';

						return pieTransform;
					},
					reset: function reset() {
						pieTransform = 'rotate(0deg)';

						return pieTransform;
					}
				};
			}();

			var meter = function() {
				var meterElement = doc.querySelector('[data-meter]');
				var idMeter = null;
				var value = 0;
				var oldCounter = 0;

				return {
					start: function start(checkedElements) {
						var currentCounter = currentCountValue(checkedElements);

						function resetTimer(id) {
							clearTimeout(id);
							id = null;
						}

						function increment() {
							oldCounter = currentCounter;

							if (value <= currentCounter) {
								meterElement.innerHTML = value++;
								resetTimer(idMeter);
								idMeter = setTimeout(increment, 4);
							}
						}

						function decriment() {
							oldCounter = currentCounter;

							if (value >= currentCounter) {
								meterElement.innerHTML = value--;
								resetTimer(idMeter);
								idMeter = setTimeout(decriment, 4);
							}
						}

						if (currentCounter >= oldCounter) {
							resetTimer(idMeter);
							idMeter = setTimeout(increment, 4);
						}
						if (currentCounter < oldCounter) {
							resetTimer(idMeter);
							idMeter = setTimeout(decriment, 4);
						}
					}
				};
			}();

			doc.addEventListener('click', function(e) {
				var target = e.target;

				while (target !== this) {
					if (target.getAttribute('type') === 'checkbox') {
						var checkElem = checkboxCounter(checkboxes).checked();
						var count = currentCountValue(checkElem);
						var val = pieValue(count);

						meter.start(checkElem);
						pieGraph.start(val);

						return;
					}
					target = target.parentNode;
				}
			}, false);

			win.addEventListener('load', function() {
				var curCountVal = currentCountValue(check);
				var currentPieVal = pieValue(curCountVal);

				meter.start(check);
				pieGraph.start(currentPieVal);
			});
		}
	};
}(window, document);

app.init();
