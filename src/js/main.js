// @include('detect.js')
// @include('globals.js')

const app = (function (win, doc, body) {
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
				return {
					start(val) {
						pieArrow.style.transform = `rotate(${val}deg)`;
					},
					reset() {
						pieArrow.style.transform = 'rotate(0deg)';
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
				const loader = doc.querySelector('[data-loader]');
				let duration = 2000;

				meter.start(check);
				pieGraph.start(currentPieVal);

				if (body.classList.contains('is-loading') && loader.classList.contains('is-hidden') === false) {
					setTimeout(() => {
						body.classList.remove('is-loading');
						loader.classList.add('is-hidden');
					}, duration);
				}
			});
		},
	};
})(window, document, document.querySelector('body'));

app.init();

