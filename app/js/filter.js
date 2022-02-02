$(document).ready(function () {

	var filterPorfolio = {

		arrElements: [],
		arrFilter: [],
		arrAreas: window.arrFootage.map(function (x) {
			return parseInt(x, 10);
		}),
		arrBuildings: window.arrBuildings.map(function (x) {
			return parseInt(x, 10);
		}),
		arrPrice: window.arrPrice.map(function (x) {
			return parseFloat(x, 10);
		}),
		minArea: 0,
		maxArea: 0,
		rangeMin: 0,
		rangeMax: 0,
		minPrice: 0,
		maxPrice: 0,
		rangePriceMin: 0,
		rangePriceMax: 0,
		selectedFloor: 0,
		selectedBuilding: 0,

		init: function () {
			this.eventHandlers();
		},

		eventHandlers: function () {
			var self = this;

			self.maxArea = self.getMaxOfArray(self.arrAreas);
			self.minArea = self.getMinOfArray(self.arrAreas);

			self.maxPrice = self.getMaxOfArray(self.arrPrice);
			self.minPrice = self.getMinOfArray(self.arrPrice);


			// собираю массив объектов, содержащих сам элемент, этаж, масштаб и т.д.
			$('.js-catalog-card').each(function (i, e) {
				self.arrElements.push({
					el: e,
					floor: $(e).data('floor'),
					area: $(e).data('footage'),
					price: $(e).data('price'),
					building: $(e).data('building')
				});
				self.getAreaRangeValues();
				self.getPriceRangeValues();
			})

			// Тип строения
			$(document).on('click', '.js-radio-building', function () {
				self.selectedBuilding = $(this).val();
				self.getAreaRangeValues();
				self.getPriceRangeValues();

				if (self.arrFilter.length) {
					self.arrFilter = self.arrElements.map(function (element) {
						if (self.selectedFloor && self.selectedBuilding) {
							if ((self.selectedFloor === element.floor) && (self.selectedBuilding === element.building) && (element.area >= self.rangeMin && element.area <= self.rangeMax)) return element;
						} else if (!self.selectedFloor && self.selectedBuilding) {
							if ((self.selectedBuilding === element.building) && (element.area >= self.rangeMin && element.area <= self.rangeMax)) return element;
						}
					});
				} else {

					self.arrElements.forEach(function (element) {

						if (self.selectedFloor && self.selectedBuilding) {
							if ((self.selectedFloor === element.floor) && (self.selectedBuilding === element.building) && (element.area >= self.rangeMin && element.area <= self.rangeMax)) self.arrFilter.push(element);
						} else if (!self.selectedFloor && self.selectedBuilding) {
							if ((self.selectedBuilding === element.building) && (element.area >= self.rangeMin && element.area <= self.rangeMax)) self.arrFilter.push(element);
						} else {
							self.arrFilter.push(element);
						}

					})

				}

				self.showFilter(self.arrFilter);
			})

			// Этажность
			$(document).on('click', '.js-radio-floor', function () {
				self.selectedFloor = $(this).val();
				self.getAreaRangeValues();
				self.getPriceRangeValues();

				// Если фильтр заполнен
				if (self.arrFilter.length) {
					// Если есть массив с ценами
					if (self.arrPrice.length) {
						self.arrFilter = self.arrElements.map(function (element) {
							if (self.selectedFloor) {
								if ((self.selectedFloor === element.floor) && (element.area >= self.rangeMin && element.area <= self.rangeMax) && (element.price >= self.rangePriceMin && element.price <= self.rangePriceMax)) return element;
							} else {
								if ((element.area >= self.rangeMin && element.area <= self.rangeMax) && (element.price >= self.rangePriceMin && element.price <= self.rangePriceMax)) return element;
							}
						});
					} else {
						self.arrFilter = self.arrElements.map(function (element) {
							if (self.selectedFloor && self.selectedBuilding) {
								if ((self.selectedBuilding === element.building) && (self.selectedFloor === element.floor) && (element.area >= self.rangeMin && element.area <= self.rangeMax)) return element;
							} else if (!self.selectedFloor && self.selectedBuilding) {
								if ((self.selectedBuilding === element.building) && (element.area >= self.rangeMin && element.area <= self.rangeMax)) return element;
							} else if (self.selectedFloor && !self.selectedBuilding) {
								if ((self.selectedFloor === element.floor) && (element.area >= self.rangeMin && element.area <= self.rangeMax)) return element;
							} else {
								if ((element.area >= self.rangeMin && element.area <= self.rangeMax)) return element;
							}
						});
					}

				}
				// Если фильтр не заполнен
				else {

					self.arrElements.forEach(function (element) {

						// Если есть массив с ценами
						if (self.arrPrice.length) {
							if (self.selectedFloor) {
								if ((self.selectedFloor === element.floor) && (element.area >= self.rangeMin && element.area <= self.rangeMax) && (element.price >= self.rangePriceMin && element.price <= self.rangePriceMax)) self.arrFilter.push(element);
							} else {
								if ((element.area >= self.rangeMin && element.area <= self.rangeMax) && (element.price >= self.rangePriceMin && element.price <= self.rangePriceMax)) self.arrFilter.push(element);
							}
						} else {
							if (self.selectedFloor && self.selectedBuilding) {
								if ((self.selectedFloor === element.floor) && (self.selectedBuilding === element.building) && (element.area >= self.rangeMin && element.area <= self.rangeMax)) self.arrFilter.push(element);
							} else if (self.selectedFloor && !self.selectedBuilding) {
								if ((self.selectedFloor === element.floor) && (element.area >= self.rangeMin && element.area <= self.rangeMax)) self.arrFilter.push(element);
							} else {
								self.arrFilter.push(element);
							}
						}

					})

				}

				self.showFilter(self.arrFilter);
			})

			// слайдер площадь
			$(".js-range-area").ionRangeSlider({
				skin: "round",
				type: "double",
				min: self.minArea,
				max: self.maxArea,
				extra_classes: 'range-slider--kb',
				onChange: function () {

					self.getAreaRangeValues();
					self.getPriceRangeValues();

					// Если фильтр заполнен
					if (self.arrFilter.length) {
						self.arrFilter = self.arrElements.map(function (element) {

							// Если есть массив с ценами
							if (self.arrPrice.length) {
								if (self.selectedFloor) {
									if ((self.selectedFloor === element.floor) && (element.area >= self.rangeMin && element.area <= self.rangeMax) && (element.price >= self.rangePriceMin && element.price <= self.rangePriceMax)) return element;
								} else {
									if ((element.area >= self.rangeMin && element.area <= self.rangeMax) && (element.price >= self.rangePriceMin && element.price <= self.rangePriceMax)) return element;
								}
							}
							// Если нет массива с ценами
							else {
								if (self.selectedFloor && self.selectedBuilding) {
									if ((self.selectedFloor === element.floor) && (self.selectedBuilding === element.building) && (element.area >= self.rangeMin && element.area <= self.rangeMax)) return element;
								} else if (self.selectedFloor && !self.selectedBuilding) {
									if ((self.selectedFloor === element.floor) && (element.area >= self.rangeMin && element.area <= self.rangeMax)) return element;
								} else if (!self.selectedFloor && self.selectedBuilding) {
									if ((self.selectedBuilding === element.building) && (element.area >= self.rangeMin && element.area <= self.rangeMax)) return element;
								} else {
									if (element.area >= self.rangeMin && element.area <= self.rangeMax) return element;
								}
							}

						});
					}
					// Фильтр не заполнен
					else {

						self.arrElements.forEach(function (element) {
							// Если есть массив с ценами
							if (self.arrPrice.length) {
								if (self.selectedFloor) {
									if ((self.selectedFloor === element.floor) && (element.area >= self.rangeMin && element.area <= self.rangeMax) && (element.price >= self.rangePriceMin && element.price <= self.rangePriceMax)) self.arrFilter.push(element);
								} else {
									self.arrFilter.push(element);
								}
							} else {
								if (self.selectedFloor && !self.selectedBuilding) {
									if ((self.selectedFloor === element.floor) && (element.area >= self.rangeMin && element.area <= self.rangeMax)) self.arrFilter.push(element);
								} else if (!self.selectedFloor && self.selectedBuilding) {
									if ((self.selectedBuilding === element.building) && (element.area >= self.rangeMin && element.area <= self.rangeMax)) self.arrFilter.push(element);
								} else {
									self.arrFilter.push(element);
								}
							}

						})

					}

					self.showFilter(self.arrFilter);


				}
			});

			// слайдер цен
			$(".js-range-price").ionRangeSlider({
				skin: "round",
				type: "double",
				min: self.minPrice,
				max: self.maxPrice,
				step: 0.01,
				extra_classes: 'range-slider--kb',
				onChange: function () {
					self.getAreaRangeValues();
					self.getPriceRangeValues();

					// Фильтр заполнен
					if (self.arrFilter.length) {
						self.arrFilter = self.arrElements.map(function (element) {
							if (self.selectedFloor) {
								if ((self.selectedFloor === element.floor) && (element.area >= self.rangeMin && element.area <= self.rangeMax) && (element.price >= self.rangePriceMin && element.price <= self.rangePriceMax)) return element;
							} else {
								if ((element.area >= self.rangeMin && element.area <= self.rangeMax) && (element.price >= self.rangePriceMin && element.price <= self.rangePriceMax)) return element;
							}
						});
					}

					// Фильтр не заполнен
					else {

						self.arrElements.forEach(function (element) {

							if (self.selectedFloor) {
								if ((self.selectedFloor === element.floor) && (element.area >= self.rangeMin && element.area <= self.rangeMax) && (element.price >= self.rangePriceMin && element.price <= self.rangePriceMax)) self.arrFilter.push(element);
							} else {
								self.arrFilter.push(element);
							}

						})

					}

					self.showFilter(self.arrFilter);


				}
			});

			var range_area = $(".js-range-area").data("ionRangeSlider");
			var range_price = $(".js-range-price").data("ionRangeSlider");


			$(document).on('click', '.js-filter-reset', function () {
				$('.js-catalog-card').show();
				$('.js-radio-floor').attr('checked', false);
				$('.js-radio-building').attr('checked', false);
				self.selectedFloor = 0;
				self.selectedBuilding = 0;
				self.arrFilter = [];
				range_area.reset();
				range_price.reset();
			})
		},


		getMaxOfArray: function (numArray) {
			return Math.max.apply(null, numArray);
		},

		getMinOfArray: function (numArray) {
			return Math.min.apply(null, numArray);
		},

		getAreaRangeValues: function () {
			this.rangeMin = parseInt($('.js-range-area').prev().find('.irs-from').text());
			this.rangeMax = parseInt($('.js-range-area').prev().find('.irs-to').text());
		},

		getPriceRangeValues: function () {
			this.rangePriceMin = parseFloat($('.js-range-price').prev().find('.irs-from').text());
			this.rangePriceMax = parseFloat($('.js-range-price').prev().find('.irs-to').text());
		},

		showFilter: function (arr) {
			$('.js-catalog-card').hide();
			arr.filter(function (element) {
				if (element !== undefined) $(element.el).show();
			})
		}

	}

	filterPorfolio.init();
})