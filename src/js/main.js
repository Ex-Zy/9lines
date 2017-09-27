svg4everybody();

// @include('detect.js')
// @include('globals.js')

const app = (function (win, doc) {
	function checkboxCounter(elems) {
		const countLength = elems.length;
		let countChecked = 0;

		for (let i = 0; i < countLength; i++) {
			if (elems[i].checked === true) {
				countChecked++;
			}
		}

		return {
			length() {
				return countLength;
			},
			checked() {
				return countChecked;
			},
		};
	}

	function checkboxHandler(e) {
		let el = e.target;

		if (el.hasAttribute('checked')) {
			el.removeAttribute('checked');
		} else {
			el.setAttribute('checked', 'checked');
		}
	}

	const checkboxes = doc.querySelectorAll('[type="checkbox"]');
	const pieArrow = doc.querySelector('[data-arrow]');
	const maxDeg = 180;
	const maxCount = 1000;
	let len = checkboxCounter(checkboxes).length();
	let check = checkboxCounter(checkboxes).checked();
	const currentCountValue = (currentCheckedElemens) => Math.round(currentCheckedElemens * maxCount / len);
	const pieValue = (countVal) => Math.round(countVal * maxDeg / maxCount);

	for (let i = 0; i < checkboxes.length; i++) {
		checkboxes[i].addEventListener('change', checkboxHandler, false);
	}

	return {
		init() {
			const pieGraph = (function () {
				let pieTransform = pieArrow.style.transform;

				return {
					start(val) {
						pieTransform = `rotate(${val}deg)`;

						return pieTransform;
					},
					reset() {
						pieTransform = 'rotate(0deg)';

						return pieTransform;
					},
				};
			})();

			const meter = (function () {
				let meterElement = doc.querySelector('[data-meter]');
				let idMeter = null;
				let value = 0;
				let oldCounter = 0;

				return {
					start(checkedElements) {
						let currentCounter = currentCountValue(checkedElements);

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
					},
				};
			})();

			doc.addEventListener('click', function (e) {
				let target = e.target;

				while (target !== this) {
					if (target.getAttribute('type') === 'checkbox') {
						let checkElem = checkboxCounter(checkboxes).checked();
						let count = currentCountValue(checkElem);
						let val = pieValue(count);

						meter.start(checkElem);
						pieGraph.start(val);

						return;
					}
					target = target.parentNode;
				}
			}, false);

			win.addEventListener('load', () => {
				let curCountVal = currentCountValue(check);
				let currentPieVal = pieValue(curCountVal);

				meter.start(check);
				pieGraph.start(currentPieVal);
			});
		},
	};
})(window, document);

app.init();

