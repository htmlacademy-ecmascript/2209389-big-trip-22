/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/const.js":
/*!**********************!*\
  !*** ./src/const.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DateFormat": () => (/* binding */ DateFormat),
/* harmony export */   "FilterType": () => (/* binding */ FilterType),
/* harmony export */   "TRIP_POINT_TYPES": () => (/* binding */ TRIP_POINT_TYPES)
/* harmony export */ });
const TRIP_POINT_TYPES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];
const DateFormat = {
  MONTH_DAY: 'MMM D',
  HOURS_MINUTES: 'HH:mm',
  DAYS: 'DD',
  HOURS: 'HH',
  MINUTES: 'mm',
  YEAR_MONTH_DAY: 'DD/MM/YY HH:mm'
};
const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past'
};


/***/ }),

/***/ "./src/filter.js":
/*!***********************!*\
  !*** ./src/filter.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "filter": () => (/* binding */ filter)
/* harmony export */ });
/* harmony import */ var _const_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./const.js */ "./src/const.js");
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! dayjs */ "./node_modules/dayjs/dayjs.min.js");
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(dayjs__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var dayjs_plugin_isSameOrBefore__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! dayjs/plugin/isSameOrBefore */ "./node_modules/dayjs/plugin/isSameOrBefore.js");
/* harmony import */ var dayjs_plugin_isSameOrBefore__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(dayjs_plugin_isSameOrBefore__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var dayjs_plugin_isSameOrAfter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! dayjs/plugin/isSameOrAfter */ "./node_modules/dayjs/plugin/isSameOrAfter.js");
/* harmony import */ var dayjs_plugin_isSameOrAfter__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(dayjs_plugin_isSameOrAfter__WEBPACK_IMPORTED_MODULE_3__);




dayjs__WEBPACK_IMPORTED_MODULE_1___default().extend((dayjs_plugin_isSameOrBefore__WEBPACK_IMPORTED_MODULE_2___default()));
dayjs__WEBPACK_IMPORTED_MODULE_1___default().extend((dayjs_plugin_isSameOrAfter__WEBPACK_IMPORTED_MODULE_3___default()));
const filter = {
  [_const_js__WEBPACK_IMPORTED_MODULE_0__.FilterType.EVERYTHING]: points => points,
  [_const_js__WEBPACK_IMPORTED_MODULE_0__.FilterType.FUTURE]: points => points.filter(point => dayjs__WEBPACK_IMPORTED_MODULE_1___default()(point.dateFrom).isAfter(dayjs__WEBPACK_IMPORTED_MODULE_1___default()())),
  [_const_js__WEBPACK_IMPORTED_MODULE_0__.FilterType.PRESENT]: points => points.filter(point => dayjs__WEBPACK_IMPORTED_MODULE_1___default()(point.dateFrom).isSameOrBefore(dayjs__WEBPACK_IMPORTED_MODULE_1___default()()) && dayjs__WEBPACK_IMPORTED_MODULE_1___default()(point.dateFrom).isSameOrAfter(dayjs__WEBPACK_IMPORTED_MODULE_1___default()())),
  [_const_js__WEBPACK_IMPORTED_MODULE_0__.FilterType.PAST]: points => points.filter(point => dayjs__WEBPACK_IMPORTED_MODULE_1___default()(point.dateTo).isBefore(dayjs__WEBPACK_IMPORTED_MODULE_1___default()()))
};


/***/ }),

/***/ "./src/framework/render.js":
/*!*********************************!*\
  !*** ./src/framework/render.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RenderPosition": () => (/* binding */ RenderPosition),
/* harmony export */   "createElement": () => (/* binding */ createElement),
/* harmony export */   "remove": () => (/* binding */ remove),
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "replace": () => (/* binding */ replace)
/* harmony export */ });
/* harmony import */ var _view_abstract_view_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./view/abstract-view.js */ "./src/framework/view/abstract-view.js");


/** @enum {string} Перечисление возможных позиций для отрисовки */
const RenderPosition = {
  BEFOREBEGIN: 'beforebegin',
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
  AFTEREND: 'afterend'
};

/**
 * Функция для создания элемента на основе разметки
 * @param {string} template Разметка в виде строки
 * @returns {HTMLElement} Созданный элемент
 */
function createElement(template) {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;
  return newElement.firstElementChild;
}

/**
 * Функция для отрисовки элемента
 * @param {AbstractView} component Компонент, который должен был отрисован
 * @param {HTMLElement} container Элемент в котором будет отрисован компонент
 * @param {string} place Позиция компонента относительно контейнера. По умолчанию - `beforeend`
 */
function render(component, container, place = RenderPosition.BEFOREEND) {
  if (!(component instanceof _view_abstract_view_js__WEBPACK_IMPORTED_MODULE_0__["default"])) {
    throw new Error('Can render only components');
  }
  if (container === null) {
    throw new Error('Container element doesn\'t exist');
  }
  container.insertAdjacentElement(place, component.element);
}

/**
 * Функция для замены одного компонента на другой
 * @param {AbstractView} newComponent Компонент, который нужно показать
 * @param {AbstractView} oldComponent Компонент, который нужно скрыть
 */
function replace(newComponent, oldComponent) {
  if (!(newComponent instanceof _view_abstract_view_js__WEBPACK_IMPORTED_MODULE_0__["default"] && oldComponent instanceof _view_abstract_view_js__WEBPACK_IMPORTED_MODULE_0__["default"])) {
    throw new Error('Can replace only components');
  }
  const newElement = newComponent.element;
  const oldElement = oldComponent.element;
  const parent = oldElement.parentElement;
  if (parent === null) {
    throw new Error('Parent element doesn\'t exist');
  }
  parent.replaceChild(newElement, oldElement);
}

/**
 * Функция для удаления компонента
 * @param {AbstractView} component Компонент, который нужно удалить
 */
function remove(component) {
  if (component === null) {
    return;
  }
  if (!(component instanceof _view_abstract_view_js__WEBPACK_IMPORTED_MODULE_0__["default"])) {
    throw new Error('Can remove only components');
  }
  component.element.remove();
  component.removeElement();
}


/***/ }),

/***/ "./src/framework/view/abstract-view.js":
/*!*********************************************!*\
  !*** ./src/framework/view/abstract-view.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AbstractView)
/* harmony export */ });
/* harmony import */ var _render_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../render.js */ "./src/framework/render.js");
/* harmony import */ var _abstract_view_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./abstract-view.css */ "./src/framework/view/abstract-view.css");



/** @const {string} Класс, реализующий эффект "покачивания головой" */
const SHAKE_CLASS_NAME = 'shake';

/** @const {number} Время анимации в миллисекундах */
const SHAKE_ANIMATION_TIMEOUT = 600;

/**
 * Абстрактный класс представления
 */
class AbstractView {
  /** @type {HTMLElement|null} Элемент представления */
  #element = null;
  constructor() {
    if (new.target === AbstractView) {
      throw new Error('Can\'t instantiate AbstractView, only concrete one.');
    }
  }

  /**
   * Геттер для получения элемента
   * @returns {HTMLElement} Элемент представления
   */
  get element() {
    if (!this.#element) {
      this.#element = (0,_render_js__WEBPACK_IMPORTED_MODULE_0__.createElement)(this.template);
    }
    return this.#element;
  }

  /**
   * Геттер для получения разметки элемента
   * @abstract
   * @returns {string} Разметка элемента в виде строки
   */
  get template() {
    throw new Error('Abstract method not implemented: get template');
  }

  /** Метод для удаления элемента */
  removeElement() {
    this.#element = null;
  }

  /**
   * Метод, реализующий эффект "покачивания головой"
   * @param {shakeCallback} [callback] Функция, которая будет вызвана после завершения анимации
   */
  shake(callback) {
    this.element.classList.add(SHAKE_CLASS_NAME);
    setTimeout(() => {
      this.element.classList.remove(SHAKE_CLASS_NAME);
      callback?.();
    }, SHAKE_ANIMATION_TIMEOUT);
  }
}

/**
 * Функция, которая будет вызвана методом shake после завершения анимации
 * @callback shakeCallback
 */

/***/ }),

/***/ "./src/mock/destinations-mock.js":
/*!***************************************!*\
  !*** ./src/mock/destinations-mock.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "destinations": () => (/* binding */ destinations)
/* harmony export */ });
const destinations = [{
  id: '1',
  description: 'Petropavlovka is a village, the administrative center of the Petropavlovsky district of the Voronezh region, as well as the Petropavlovsky rural settlement.',
  name: 'Petropavlovka',
  pictures: []
}, {
  id: '2',
  description: 'Boguchar is a city since 1779 in the south of the Voronezh region of Russia.',
  name: 'Boguchar',
  pictures: [{
    src: 'https://petrovsk64.ru/upload/iblock/592/59208582476348d26b1938842198fc0f.jpg',
    description: 'Boguchar parliament building'
  }, {
    src: 'https://poligraf.media/wp-content/uploads/zmfjjivdjvi.jpg',
    description: 'Boguchar main square'
  }, {
    src: 'https://cdn.er.ru/media/userdata/news/2017/09/18/826c514bfb34b3b4186a2828d13ab50e.jpg',
    description: 'Park entrance'
  }]
}, {
  id: '3',
  description: 'Pavlovsk (until 1711 - Osered) is a city in Russia, the administrative center of the Pavlovsky district of the Voronezh region.',
  name: 'Pavlovsk',
  pictures: [{
    src: 'https://avatars.dzeninfra.ru/get-zen_doc/3700776/pub_60608387301c9c43eb1e657e_606083d30fd2b70ff0cf54c7/scale_1200',
    description: 'Pavlovsk architecture'
  }, {
    src: 'https://media.izi.travel/c78ddd23-24a2-4b52-9d6e-55713daee454/25192db5-6742-49b7-8bd8-ac172c4277f2_800x600.jpg',
    description: 'Pokrov churche'
  }, {
    src: 'https://media.izi.travel/c78ddd23-24a2-4b52-9d6e-55713daee454/288c6729-c412-4445-8db8-33de9e0ef49f_800x600.jpg',
    description: 'House of Odincov merchant'
  }]
}];


/***/ }),

/***/ "./src/mock/offers-mock.js":
/*!*********************************!*\
  !*** ./src/mock/offers-mock.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "offers": () => (/* binding */ offers)
/* harmony export */ });
const offers = [{
  type: 'taxi',
  offers: [{
    id: '1',
    title: 'Taxi offer 0',
    price: 100
  }, {
    id: '2',
    title: 'Taxi offer 1',
    price: 200
  }, {
    id: '3',
    title: 'Taxi offer 2',
    price: 300
  }, {
    id: '4',
    title: 'Taxi offer 3',
    price: 400
  }, {
    id: '5',
    title: 'Taxi offer 4',
    price: 250
  }]
}, {
  type: 'bus',
  offers: [{
    id: '6',
    title: 'Bus offer 0',
    price: 10
  }, {
    id: '7',
    title: 'Bus offer 1',
    price: 20
  }, {
    id: '8',
    title: 'Bus offer 2',
    price: 30
  }, {
    id: '9',
    title: 'Bus offer 3',
    price: 40
  }, {
    id: '10',
    title: 'Bus offer 4',
    price: 25
  }]
}, {
  type: 'train',
  offers: [{
    id: '11',
    title: 'train offer 0',
    price: 1000
  }, {
    id: '12',
    title: 'train offer 1',
    price: 2000
  }, {
    id: '13',
    title: 'train offer 2',
    price: 3000
  }, {
    id: '14',
    title: 'train offer 3',
    price: 4000
  }, {
    id: '15',
    title: 'train offer 4',
    price: 2500
  }]
}];


/***/ }),

/***/ "./src/mock/points-mock.js":
/*!*********************************!*\
  !*** ./src/mock/points-mock.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "points": () => (/* binding */ points)
/* harmony export */ });
/* harmony import */ var nanoid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! nanoid */ "./node_modules/nanoid/index.browser.js");

const points = [{
  id: (0,nanoid__WEBPACK_IMPORTED_MODULE_0__.nanoid)(),
  basePrice: 1100,
  dateFrom: '2021-01-01T11:01:56.845Z',
  dateTo: '2021-01-01T11:21:13.375Z',
  destination: '1',
  isFavorite: true,
  offers: ['1', '3'],
  type: 'bus'
}, {
  id: (0,nanoid__WEBPACK_IMPORTED_MODULE_0__.nanoid)(),
  basePrice: 300,
  dateFrom: '2022-02-02T12:55:56.845Z',
  dateTo: '2022-02-03T13:22:13.375Z',
  destination: '2',
  isFavorite: false,
  offers: ['2', '6', '7'],
  type: 'taxi'
}, {
  id: (0,nanoid__WEBPACK_IMPORTED_MODULE_0__.nanoid)(),
  basePrice: 500,
  dateFrom: '2023-03-22T03:55:56.845Z',
  dateTo: '2023-03-29T04:03:13.375Z',
  destination: '3',
  isFavorite: false,
  offers: [],
  type: 'train'
}];


/***/ }),

/***/ "./src/model/point-model.js":
/*!**********************************!*\
  !*** ./src/model/point-model.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ PointModel),
/* harmony export */   "generateFilter": () => (/* binding */ generateFilter)
/* harmony export */ });
/* harmony import */ var _mock_points_mock_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../mock/points-mock.js */ "./src/mock/points-mock.js");
/* harmony import */ var _mock_offers_mock_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../mock/offers-mock.js */ "./src/mock/offers-mock.js");
/* harmony import */ var _mock_destinations_mock_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../mock/destinations-mock.js */ "./src/mock/destinations-mock.js");
/* harmony import */ var _filter_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../filter.js */ "./src/filter.js");




class PointModel {
  #points = null;
  #destinations = null;
  #offers = null;
  constructor() {
    this.#points = [];
    this.#destinations = [];
    this.#offers = [];
  }
  init() {
    this.#points = _mock_points_mock_js__WEBPACK_IMPORTED_MODULE_0__.points;
    this.#destinations = _mock_destinations_mock_js__WEBPACK_IMPORTED_MODULE_2__.destinations;
    this.#offers = _mock_offers_mock_js__WEBPACK_IMPORTED_MODULE_1__.offers;
  }
  get points() {
    return this.#points;
  }
  get destinations() {
    return this.#destinations;
  }
  get offers() {
    return this.#offers;
  }
}
function generateFilter(pointsToFilter) {
  return Object.entries(_filter_js__WEBPACK_IMPORTED_MODULE_3__.filter).map(([filterType, filterPoints]) => ({
    type: filterType,
    count: filterPoints(pointsToFilter).length
  }));
}


/***/ }),

/***/ "./src/presenter/point-presener.js":
/*!*****************************************!*\
  !*** ./src/presenter/point-presener.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ PointPresenter)
/* harmony export */ });
/* harmony import */ var _framework_render_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../framework/render.js */ "./src/framework/render.js");
/* harmony import */ var _view_point_edit_view_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../view/point-edit-view.js */ "./src/view/point-edit-view.js");
/* harmony import */ var _view_point_view_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../view/point-view.js */ "./src/view/point-view.js");



const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING'
};
class PointPresenter {
  #pointListContainer = null;
  #pointComponent = null;
  #pointEditComponent = null;
  #point = null;
  #destinations = null;
  #offers = null;
  #mode = Mode.DEFAULT;
  #handleDataChange = null;
  #handleModeChange = null;
  constructor({
    pointListContainer,
    onDataChange,
    onModeChange
  }) {
    this.#pointListContainer = pointListContainer;
    this.#handleDataChange = onDataChange;
    this.#handleModeChange = onModeChange;
  }
  init(point, destinations, offers) {
    this.#point = point;
    this.#destinations = destinations;
    this.#offers = offers;
    const prevPointComponent = this.#pointComponent;
    const prevPointEditComponent = this.#pointEditComponent;
    this.#pointComponent = new _view_point_view_js__WEBPACK_IMPORTED_MODULE_2__["default"]({
      point: this.#point,
      destinations: this.#destinations,
      offers: this.#offers,
      onRollupButtonClick: this.#handleRollupButtonClick,
      onFavoriteClick: this.#handleFavoriteClick
    });
    this.#pointEditComponent = new _view_point_edit_view_js__WEBPACK_IMPORTED_MODULE_1__["default"]({
      point: this.#point,
      destinations: this.#destinations,
      offers: this.#offers,
      onEditFormSubmit: this.#handleFormSubmit,
      onRollupButtonClick: this.#handleRollDownButtonClick
    });
    if (prevPointComponent === null || prevPointEditComponent === null) {
      (0,_framework_render_js__WEBPACK_IMPORTED_MODULE_0__.render)(this.#pointComponent, this.#pointListContainer);
      return;
    }
    if (this.#mode === Mode.DEFAULT) {
      (0,_framework_render_js__WEBPACK_IMPORTED_MODULE_0__.replace)(this.#pointComponent, prevPointComponent);
    }
    if (this.#mode === Mode.EDITING) {
      (0,_framework_render_js__WEBPACK_IMPORTED_MODULE_0__.replace)(this.#pointEditComponent, prevPointEditComponent);
    }
    (0,_framework_render_js__WEBPACK_IMPORTED_MODULE_0__.remove)(prevPointComponent);
    (0,_framework_render_js__WEBPACK_IMPORTED_MODULE_0__.remove)(prevPointEditComponent);
  }
  destroy() {
    (0,_framework_render_js__WEBPACK_IMPORTED_MODULE_0__.remove)(this.#pointComponent);
    (0,_framework_render_js__WEBPACK_IMPORTED_MODULE_0__.remove)(this.#pointEditComponent);
  }
  resetView() {
    if (this.#mode !== Mode.DEFAULT) {
      this.#replaceEditFormToPoint();
    }
  }
  #replacePointToEditForm() {
    (0,_framework_render_js__WEBPACK_IMPORTED_MODULE_0__.replace)(this.#pointEditComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#handleModeChange();
    this.#mode = Mode.EDITING;
  }
  #replaceEditFormToPoint() {
    (0,_framework_render_js__WEBPACK_IMPORTED_MODULE_0__.replace)(this.#pointComponent, this.#pointEditComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.DEFAULT;
  }
  #escKeyDownHandler = evt => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#replaceEditFormToPoint();
    }
  };
  #handleRollupButtonClick = () => {
    this.#replacePointToEditForm();
  };
  #handleRollDownButtonClick = () => {
    this.#replaceEditFormToPoint();
  };

  // при клике на кнопку избранного пока что копируем все задачи и меняем флаг favorite
  #handleFavoriteClick = () => {
    this.#handleDataChange({
      ...this.#point,
      isFavorite: !this.#point.isFavorite
    });
  };

  //для обработчика кнопки save передаем информацию по задаче (вторая строка)
  #handleFormSubmit = point => {
    this.#replaceEditFormToPoint();
    this.#handleDataChange(point);
  };
}

/***/ }),

/***/ "./src/presenter/trip-presenter.js":
/*!*****************************************!*\
  !*** ./src/presenter/trip-presenter.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ TripPresenter)
/* harmony export */ });
/* harmony import */ var _view_points_list_view_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../view/points-list-view.js */ "./src/view/points-list-view.js");
/* harmony import */ var _view_filter_view_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../view/filter-view.js */ "./src/view/filter-view.js");
/* harmony import */ var _view_sort_view_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../view/sort-view.js */ "./src/view/sort-view.js");
/* harmony import */ var _view_info_trip_view_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../view/info-trip-view.js */ "./src/view/info-trip-view.js");
/* harmony import */ var _render_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../render.js */ "./src/render.js");
/* harmony import */ var _framework_render_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../framework/render.js */ "./src/framework/render.js");
/* harmony import */ var _view_no_points_view_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../view/no-points-view.js */ "./src/view/no-points-view.js");
/* harmony import */ var _model_point_model_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../model/point-model.js */ "./src/model/point-model.js");
/* harmony import */ var _point_presener_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./point-presener.js */ "./src/presenter/point-presener.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../utils.js */ "./src/utils.js");










class TripPresenter {
  #sortComponent = new _view_sort_view_js__WEBPACK_IMPORTED_MODULE_2__["default"]();
  #noPointsComponent = new _view_no_points_view_js__WEBPACK_IMPORTED_MODULE_6__["default"]();
  #pointsListComponent = new _view_points_list_view_js__WEBPACK_IMPORTED_MODULE_0__["default"]();
  #infoTripComponent = new _view_info_trip_view_js__WEBPACK_IMPORTED_MODULE_3__["default"]();
  #filterComponent = null;
  #container = null;
  #pointModel = null;
  #infoTripElement = null;
  #filterElement = null;
  #tripPoints = [];
  #offers = null;
  #destinations = null;
  #pointPresenters = new Map();
  constructor({
    container,
    pointModel,
    infoTripElement,
    filterElement
  }) {
    this.#container = container;
    this.#pointModel = pointModel;
    this.#infoTripElement = infoTripElement;
    this.#filterElement = filterElement;
  }
  init() {
    this.#tripPoints = [...this.#pointModel.points];
    this.#offers = [...this.#pointModel.offers];
    this.#destinations = [...this.#pointModel.destinations];
    this.#renderTripEvents();
  }
  #handleModeChange = () => {
    this.#pointPresenters.forEach(presenter => presenter.resetView());
  };
  #handlePointChange = updatedPoint => {
    this.#tripPoints = (0,_utils_js__WEBPACK_IMPORTED_MODULE_9__.updateItem)(this.#tripPoints, updatedPoint);
    this.#pointPresenters.get(updatedPoint.id).init(updatedPoint, this.#destinations, this.#offers);
  };
  #renderPoints(point, destinations, offers) {
    const pointPresenter = new _point_presener_js__WEBPACK_IMPORTED_MODULE_8__["default"]({
      pointListContainer: this.#pointsListComponent.element,
      onDataChange: this.#handlePointChange,
      onModeChange: this.#handleModeChange
    });
    pointPresenter.init(point, destinations, offers);
    this.#pointPresenters.set(point.id, pointPresenter);
  }
  #renderSort() {
    (0,_framework_render_js__WEBPACK_IMPORTED_MODULE_5__.render)(this.#sortComponent, this.#container);
  }
  #renderNoPoints() {
    (0,_framework_render_js__WEBPACK_IMPORTED_MODULE_5__.render)(this.#noPointsComponent, this.#container, _render_js__WEBPACK_IMPORTED_MODULE_4__.RenderPosition.AFTERBEGIN);
  }
  #renderInfoTrip() {
    (0,_framework_render_js__WEBPACK_IMPORTED_MODULE_5__.render)(this.#infoTripComponent, this.#infoTripElement, _render_js__WEBPACK_IMPORTED_MODULE_4__.RenderPosition.AFTERBEGIN);
  }
  #renderPointsList() {
    (0,_framework_render_js__WEBPACK_IMPORTED_MODULE_5__.render)(this.#pointsListComponent, this.#container);
  }
  #renderFilter() {
    const points = this.#pointModel.points;
    const filters = (0,_model_point_model_js__WEBPACK_IMPORTED_MODULE_7__.generateFilter)(points);
    this.#filterComponent = new _view_filter_view_js__WEBPACK_IMPORTED_MODULE_1__["default"]({
      filters
    });
    (0,_framework_render_js__WEBPACK_IMPORTED_MODULE_5__.render)(this.#filterComponent, this.#filterElement);
  }
  #renderTripEvents() {
    const points = this.#pointModel.points;
    const destinations = this.#pointModel.destinations;
    const offers = this.#pointModel.offers;
    if (points.length === 0) {
      this.#renderNoPoints();
      return;
    }
    this.#renderInfoTrip();
    this.#renderSort();
    this.#renderPointsList();
    this.#renderFilter();
    for (const point of points) {
      this.#renderPoints(point, destinations, offers);
    }
  }
  #clearPointList() {
    this.#pointPresenters.forEach(presenter => presenter.destroy());
    this.#pointPresenters.clear();
  }
}

/***/ }),

/***/ "./src/render.js":
/*!***********************!*\
  !*** ./src/render.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RenderPosition": () => (/* binding */ RenderPosition),
/* harmony export */   "createElement": () => (/* binding */ createElement),
/* harmony export */   "render": () => (/* binding */ render)
/* harmony export */ });
const RenderPosition = {
  BEFOREBEGIN: 'beforebegin',
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
  AFTEREND: 'afterend'
};
function createElement(template) {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;
  return newElement.firstElementChild;
}
function render(component, container, place = RenderPosition.BEFOREEND) {
  container.insertAdjacentElement(place, component.getElement());
}


/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "calculatePointDuration": () => (/* binding */ calculatePointDuration),
/* harmony export */   "humanizeDate": () => (/* binding */ humanizeDate),
/* harmony export */   "updateItem": () => (/* binding */ updateItem)
/* harmony export */ });
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! dayjs */ "./node_modules/dayjs/dayjs.min.js");
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(dayjs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var dayjs_plugin_utc_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! dayjs/plugin/utc.js */ "./node_modules/dayjs/plugin/utc.js");
/* harmony import */ var dayjs_plugin_utc_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(dayjs_plugin_utc_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _const_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./const.js */ "./src/const.js");



dayjs__WEBPACK_IMPORTED_MODULE_0___default().extend((dayjs_plugin_utc_js__WEBPACK_IMPORTED_MODULE_1___default()));
function humanizeDate(date, dateFormat) {
  return date ? dayjs__WEBPACK_IMPORTED_MODULE_0___default().utc(date).format(dateFormat) : '';
}
function calculatePointDuration(dateEnd, dateStart) {
  const totalData = `${humanizeDate(dayjs__WEBPACK_IMPORTED_MODULE_0___default()(dateEnd).diff(dayjs__WEBPACK_IMPORTED_MODULE_0___default()(dateStart)), _const_js__WEBPACK_IMPORTED_MODULE_2__.DateFormat.DAYS)}D
  ${humanizeDate(dayjs__WEBPACK_IMPORTED_MODULE_0___default()(dateEnd).diff(dayjs__WEBPACK_IMPORTED_MODULE_0___default()(dateStart)), _const_js__WEBPACK_IMPORTED_MODULE_2__.DateFormat.HOURS)}H
  ${humanizeDate(dayjs__WEBPACK_IMPORTED_MODULE_0___default()(dateEnd).diff(dayjs__WEBPACK_IMPORTED_MODULE_0___default()(dateStart)), _const_js__WEBPACK_IMPORTED_MODULE_2__.DateFormat.MINUTES)}M`;
  return totalData;
}
function updateItem(items, update) {
  return items.map(item => item.id === update.id ? update : item);
}


/***/ }),

/***/ "./src/view/filter-view.js":
/*!*********************************!*\
  !*** ./src/view/filter-view.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ FilterView)
/* harmony export */ });
/* harmony import */ var _framework_view_abstract_view_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../framework/view/abstract-view.js */ "./src/framework/view/abstract-view.js");

function createFilterItemTemplate(filter, isChecked) {
  const {
    type,
    count
  } = filter;
  return `
                <div class="trip-filters__filter">
                  <input id="filter-${type}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${type}" ${isChecked ? 'checked' : ''} ${count === 0 ? 'disabled' : ''}>
                  <label class="trip-filters__filter-label" for="filter-${type}">${type}</label>
                </div>
  `;
}
function createFilterTemplate(filterItems) {
  const filterItemsTemplate = filterItems.map((filter, index) => createFilterItemTemplate(filter, index === 0)).join('');
  return `
    <form class="trip-filters" action="#" method="get">
      ${filterItemsTemplate}
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>
  `;
}
class FilterView extends _framework_view_abstract_view_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  #filters = null;
  constructor({
    filters
  }) {
    super();
    this.#filters = filters;
  }
  get template() {
    return createFilterTemplate(this.#filters);
  }
}

/***/ }),

/***/ "./src/view/info-trip-view.js":
/*!************************************!*\
  !*** ./src/view/info-trip-view.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ InfoTripView)
/* harmony export */ });
/* harmony import */ var _framework_view_abstract_view_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../framework/view/abstract-view.js */ "./src/framework/view/abstract-view.js");

function createInfoTripTemplate() {
  return `<section class="trip-main__trip-info  trip-info">
  <div class="trip-info__main">
  <h1 class="trip-info__title">Amsterdam &mdash; Chamonix &mdash; Geneva</h1>
  <p class="trip-info__dates">Mar 18&nbsp;&mdash;&nbsp;20</p>
  </div>
  <p class="trip-info__cost">
  Total: &euro;&nbsp;<span class="trip-info__cost-value">1230</span>
  </p>
</section>`;
}
class InfoTripView extends _framework_view_abstract_view_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  get template() {
    return createInfoTripTemplate();
  }
}

/***/ }),

/***/ "./src/view/no-points-view.js":
/*!************************************!*\
  !*** ./src/view/no-points-view.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ NoPointsView)
/* harmony export */ });
/* harmony import */ var _framework_view_abstract_view_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../framework/view/abstract-view.js */ "./src/framework/view/abstract-view.js");

function createEmptyListTemplate() {
  return `<p class="trip-events__msg">
    Click New Event to create your first point
    </p>`;
}
class NoPointsView extends _framework_view_abstract_view_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  get template() {
    return createEmptyListTemplate();
  }
}

/***/ }),

/***/ "./src/view/point-edit-view.js":
/*!*************************************!*\
  !*** ./src/view/point-edit-view.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ PointEditView)
/* harmony export */ });
/* harmony import */ var _framework_view_abstract_view_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../framework/view/abstract-view.js */ "./src/framework/view/abstract-view.js");
/* harmony import */ var _const_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../const.js */ "./src/const.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils.js */ "./src/utils.js");




const upFirstLetter = word => `${word[0].toUpperCase()}${word.slice(1)}`;
const formatOfferTitle = title => title.split(' ').join(' ');
const createPointEditTemplate = (point, destinations, offers) => {
  const pointDestination = destinations.find(dest => dest.id === point.destination);
  const typeOffers = offers.find(off => off.type === point.type).offers;
  const pointOffers = typeOffers.filter(typeOffer => point.offers.includes(typeOffer.id));
  const {
    dateFrom,
    dateTo,
    basePrice,
    type
  } = point;
  const {
    name,
    description,
    pictures
  } = pointDestination || {};
  const pointId = point.id || 0;
  return `<li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-${pointId}">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
        </label>
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${pointId}" type="checkbox">

        <div class="event__type-list">
          <fieldset class="event__type-group">
            <legend class="visually-hidden">Event type</legend>

            ${_const_js__WEBPACK_IMPORTED_MODULE_1__.TRIP_POINT_TYPES.map(pointType => `            <div class="event__type-item">
              <input id="event-type-${pointType}-${pointId}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${pointType}" ${pointType === type ? 'checked' : ''}>
              <label class="event__type-label  event__type-label--${pointType}" for="event-type-${pointType}-${pointId}">${upFirstLetter(pointType)}</label>
            </div>`).join('')}

          </fieldset>
        </div>
      </div>

      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-${pointId}">
          ${type}
        </label>
        <input class="event__input  event__input--destination" id="event-destination-${pointId}" type="text" name="event-destination" value="${name || ''}" list="destination-list-${pointId}">
        <datalist id="destination-list-${pointId}">
        ${destinations.map(destination => `<option value="${destination.name}"></option>`).join('')}
        </datalist>
      </div>

      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-${pointId}">From</label>
        <input class="event__input  event__input--time" id="event-start-time-${pointId}" type="text" name="event-start-time" value="${(0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.humanizeDate)(dateFrom, _const_js__WEBPACK_IMPORTED_MODULE_1__.DateFormat.YEAR_MONTH_DAY)}">
        &mdash;
        <label class="visually-hidden" for="event-end-time-${pointId}">To</label>
        <input class="event__input  event__input--time" id="event-end-time-${pointId}" type="text" name="event-end-time" value="${(0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.humanizeDate)(dateTo, _const_js__WEBPACK_IMPORTED_MODULE_1__.DateFormat.YEAR_MONTH_DAY)}">
      </div>

      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-${pointId}">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-${pointId}" type="text" name="event-price" value=${basePrice}>
      </div>

      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">${point.id ? 'Delete' : 'Cancel'}</button>
      ${point.id ? `<button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
       </button>` : ''}
    </header>

    <section class="event__details">
    ${typeOffers.length ? `  <section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>
        <div class="event__available-offers">
        ${typeOffers.map(typeOffer => `
          <div class="event__offer-selector">
            <input class="event__offer-checkbox  visually-hidden" id="event-offer-${formatOfferTitle(typeOffer.title)}-${pointId}" type="checkbox" name="event-offer-${formatOfferTitle(typeOffer.title)}" ${pointOffers.map(offer => offer.id).includes(typeOffer.id) ? 'checked' : ''}>
            <label class="event__offer-label" for="event-offer-${typeOffer.title}-${pointId}">
              <span class="event__offer-title">${typeOffer.title}</span>
              &plus;&euro;&nbsp;
              <span class="event__offer-price">${typeOffer.price}</span>
            </label>
          </div>`).join('')}
        </div>
      </section>` : ''}

      ${pointDestination ? `<section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        <p class="event__destination-description">${description}</p>
        ${pictures.length ? `
          <div class="event__photos-container">
          <div class="event__photos-tape">
          ${pictures.map(pic => `<img class="event__photo" src="${pic.src}" alt="${pic.description}">`)}
          </div>
        </div>` : ''}
             </section> ` : ''}
    </section>
    </form>
    </li>`;
};
class PointEditView extends _framework_view_abstract_view_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  #point = null;
  #destinations = null;
  #offers = null;
  #handleFormSubmit = null;
  #handleEditClick = null;
  constructor({
    point,
    destinations,
    offers,
    onEditFormSubmit,
    onRollupButtonClick
  }) {
    super();
    this.#point = point;
    this.#destinations = destinations;
    this.#offers = offers;
    this.#handleFormSubmit = onEditFormSubmit;
    this.#handleEditClick = onRollupButtonClick;
    this.element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editClickHandler);
  }
  get template() {
    return createPointEditTemplate(this.#point, this.#destinations, this.#offers);
  }
  #formSubmitHandler = evt => {
    evt.preventDefault();
    this.#handleFormSubmit(this.#point);
  };
  #editClickHandler = evt => {
    evt.preventDefault();
    this.#handleEditClick();
  };
}

/***/ }),

/***/ "./src/view/point-view.js":
/*!********************************!*\
  !*** ./src/view/point-view.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ PointView)
/* harmony export */ });
/* harmony import */ var _const_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../const.js */ "./src/const.js");
/* harmony import */ var _framework_view_abstract_view_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../framework/view/abstract-view.js */ "./src/framework/view/abstract-view.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils.js */ "./src/utils.js");



const createPointTemplate = (point, destinations, offers) => {
  const {
    basePrice,
    isFavorite,
    dateFrom,
    dateTo,
    type
  } = point;
  const typeOffers = offers.find(off => off.type === point.type).offers;
  const pointOffers = typeOffers.filter(typeOffer => point.offers.includes(typeOffer.id));
  const pointDestination = destinations.find(dest => dest.id === point.destination);
  return `
  <li class="trip-events__item">
  <div class="event">
    <time class="event__date" datetime=${dateFrom}>${(0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.humanizeDate)(dateFrom, _const_js__WEBPACK_IMPORTED_MODULE_0__.DateFormat.MONTH_DAY)}</time>
    <div class="event__type">
      <img class="event__type-icon" width="42" height="42" src="img/icons/${type.toLowerCase()}.png" alt="Event type icon">
    </div>
    <h3 class="event__title">${type} ${pointDestination.name}</h3>
    <div class="event__schedule">
      <p class="event__time">
        <time class="event__start-time" datetime=${dateFrom}>${(0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.humanizeDate)(dateFrom, _const_js__WEBPACK_IMPORTED_MODULE_0__.DateFormat.HOURS_MINUTES)}</time>
        &mdash;
        <time class="event__end-time" datetime=${dateTo}>${(0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.humanizeDate)(dateTo, _const_js__WEBPACK_IMPORTED_MODULE_0__.DateFormat.HOURS_MINUTES)}</time>
      </p>
      <p class="event__duration">${(0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.calculatePointDuration)(dateTo, dateFrom)}</p>
    </div>
    <p class="event__price">
      &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
    </p>
    <h4 class="visually-hidden">Offers:</h4>
    <ul class="event__selected-offers">
    ${pointOffers.map(offer => `<li class="event__offer">
        <span class="event__offer-title">${offer.title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${offer.price}</span>
      </li>`).join('')}

    </ul>
    <button class="event__favorite-btn ${isFavorite ? 'event__favorite-btn--active' : ' '} " type="button">
      <span class="visually-hidden">Add to favorite</span>
      <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
        <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
      </svg>
    </button>
    <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>
  </div>
</li>`;
};
class PointView extends _framework_view_abstract_view_js__WEBPACK_IMPORTED_MODULE_1__["default"] {
  #point = null;
  #destinations = null;
  #offers = null;
  #handleEditClick = null;
  #handleFavoriteClick = null;
  constructor({
    point,
    destinations,
    offers,
    onRollupButtonClick,
    onFavoriteClick
  }) {
    super();
    this.#point = point;
    this.#destinations = destinations;
    this.#offers = offers;
    this.#handleEditClick = onRollupButtonClick;
    this.#handleFavoriteClick = onFavoriteClick;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editClickHandler);
    this.element.querySelector('.event__favorite-btn').addEventListener('click', this.#favoriteClickHandler);
  }
  get template() {
    return createPointTemplate(this.#point, this.#destinations, this.#offers);
  }
  #editClickHandler = evt => {
    evt.preventDefault();
    this.#handleEditClick();
  };
  #favoriteClickHandler = evt => {
    evt.preventDefault();
    this.#handleFavoriteClick();
  };
}

/***/ }),

/***/ "./src/view/points-list-view.js":
/*!**************************************!*\
  !*** ./src/view/points-list-view.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ EditListView)
/* harmony export */ });
/* harmony import */ var _framework_view_abstract_view_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../framework/view/abstract-view.js */ "./src/framework/view/abstract-view.js");

function createPointsListTemplate() {
  return `
  <ul class="trip-events__list">`;
}
class EditListView extends _framework_view_abstract_view_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  get template() {
    return createPointsListTemplate();
  }
}

/***/ }),

/***/ "./src/view/sort-view.js":
/*!*******************************!*\
  !*** ./src/view/sort-view.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SortView)
/* harmony export */ });
/* harmony import */ var _framework_view_abstract_view_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../framework/view/abstract-view.js */ "./src/framework/view/abstract-view.js");

function createSortTemplate() {
  return `
  <form class="trip-events__trip-sort  trip-sort" action="#" method="get">
  <div class="trip-sort__item  trip-sort__item--day">
    <input id="sort-day" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-day" checked>
    <label class="trip-sort__btn" for="sort-day">Day</label>
  </div>

  <div class="trip-sort__item  trip-sort__item--event">
    <input id="sort-event" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-event" disabled>
    <label class="trip-sort__btn" for="sort-event">Event</label>
  </div>

  <div class="trip-sort__item  trip-sort__item--time">
    <input id="sort-time" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-time">
    <label class="trip-sort__btn" for="sort-time">Time</label>
  </div>

  <div class="trip-sort__item  trip-sort__item--price">
    <input id="sort-price" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-price">
    <label class="trip-sort__btn" for="sort-price">Price</label>
  </div>

  <div class="trip-sort__item  trip-sort__item--offer">
    <input id="sort-offer" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-offer" disabled>
    <label class="trip-sort__btn" for="sort-offer">Offers</label>
  </div>
</form>`;
}
class SortView extends _framework_view_abstract_view_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  get template() {
    return createSortTemplate();
  }
}

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/framework/view/abstract-view.css":
/*!************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/framework/view/abstract-view.css ***!
  \************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".shake {\n  animation: shake 0.6s;\n  position: relative;\n  z-index: 10;\n}\n\n@keyframes shake {\n  0%,\n  100% {\n    transform: translateX(0);\n  }\n\n  10%,\n  30%,\n  50%,\n  70%,\n  90% {\n    transform: translateX(-5px);\n  }\n\n  20%,\n  40%,\n  60%,\n  80% {\n    transform: translateX(5px);\n  }\n}\n", "",{"version":3,"sources":["webpack://./src/framework/view/abstract-view.css"],"names":[],"mappings":"AAAA;EACE,qBAAqB;EACrB,kBAAkB;EAClB,WAAW;AACb;;AAEA;EACE;;IAEE,wBAAwB;EAC1B;;EAEA;;;;;IAKE,2BAA2B;EAC7B;;EAEA;;;;IAIE,0BAA0B;EAC5B;AACF","sourcesContent":[".shake {\n  animation: shake 0.6s;\n  position: relative;\n  z-index: 10;\n}\n\n@keyframes shake {\n  0%,\n  100% {\n    transform: translateX(0);\n  }\n\n  10%,\n  30%,\n  50%,\n  70%,\n  90% {\n    transform: translateX(-5px);\n  }\n\n  20%,\n  40%,\n  60%,\n  80% {\n    transform: translateX(5px);\n  }\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {

"use strict";


module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ "./node_modules/dayjs/dayjs.min.js":
/*!*****************************************!*\
  !*** ./node_modules/dayjs/dayjs.min.js ***!
  \*****************************************/
/***/ (function(module) {

!function(t,e){ true?module.exports=e():0}(this,(function(){"use strict";var t=1e3,e=6e4,n=36e5,r="millisecond",i="second",s="minute",u="hour",a="day",o="week",f="month",h="quarter",c="year",d="date",l="Invalid Date",$=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,y=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,M={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(t){var e=["th","st","nd","rd"],n=t%100;return"["+t+(e[(n-20)%10]||e[n]||e[0])+"]"}},m=function(t,e,n){var r=String(t);return!r||r.length>=e?t:""+Array(e+1-r.length).join(n)+t},v={s:m,z:function(t){var e=-t.utcOffset(),n=Math.abs(e),r=Math.floor(n/60),i=n%60;return(e<=0?"+":"-")+m(r,2,"0")+":"+m(i,2,"0")},m:function t(e,n){if(e.date()<n.date())return-t(n,e);var r=12*(n.year()-e.year())+(n.month()-e.month()),i=e.clone().add(r,f),s=n-i<0,u=e.clone().add(r+(s?-1:1),f);return+(-(r+(n-i)/(s?i-u:u-i))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(t){return{M:f,y:c,w:o,d:a,D:d,h:u,m:s,s:i,ms:r,Q:h}[t]||String(t||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},g="en",D={};D[g]=M;var p=function(t){return t instanceof _},S=function t(e,n,r){var i;if(!e)return g;if("string"==typeof e){var s=e.toLowerCase();D[s]&&(i=s),n&&(D[s]=n,i=s);var u=e.split("-");if(!i&&u.length>1)return t(u[0])}else{var a=e.name;D[a]=e,i=a}return!r&&i&&(g=i),i||!r&&g},w=function(t,e){if(p(t))return t.clone();var n="object"==typeof e?e:{};return n.date=t,n.args=arguments,new _(n)},O=v;O.l=S,O.i=p,O.w=function(t,e){return w(t,{locale:e.$L,utc:e.$u,x:e.$x,$offset:e.$offset})};var _=function(){function M(t){this.$L=S(t.locale,null,!0),this.parse(t)}var m=M.prototype;return m.parse=function(t){this.$d=function(t){var e=t.date,n=t.utc;if(null===e)return new Date(NaN);if(O.u(e))return new Date;if(e instanceof Date)return new Date(e);if("string"==typeof e&&!/Z$/i.test(e)){var r=e.match($);if(r){var i=r[2]-1||0,s=(r[7]||"0").substring(0,3);return n?new Date(Date.UTC(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)):new Date(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)}}return new Date(e)}(t),this.$x=t.x||{},this.init()},m.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds()},m.$utils=function(){return O},m.isValid=function(){return!(this.$d.toString()===l)},m.isSame=function(t,e){var n=w(t);return this.startOf(e)<=n&&n<=this.endOf(e)},m.isAfter=function(t,e){return w(t)<this.startOf(e)},m.isBefore=function(t,e){return this.endOf(e)<w(t)},m.$g=function(t,e,n){return O.u(t)?this[e]:this.set(n,t)},m.unix=function(){return Math.floor(this.valueOf()/1e3)},m.valueOf=function(){return this.$d.getTime()},m.startOf=function(t,e){var n=this,r=!!O.u(e)||e,h=O.p(t),l=function(t,e){var i=O.w(n.$u?Date.UTC(n.$y,e,t):new Date(n.$y,e,t),n);return r?i:i.endOf(a)},$=function(t,e){return O.w(n.toDate()[t].apply(n.toDate("s"),(r?[0,0,0,0]:[23,59,59,999]).slice(e)),n)},y=this.$W,M=this.$M,m=this.$D,v="set"+(this.$u?"UTC":"");switch(h){case c:return r?l(1,0):l(31,11);case f:return r?l(1,M):l(0,M+1);case o:var g=this.$locale().weekStart||0,D=(y<g?y+7:y)-g;return l(r?m-D:m+(6-D),M);case a:case d:return $(v+"Hours",0);case u:return $(v+"Minutes",1);case s:return $(v+"Seconds",2);case i:return $(v+"Milliseconds",3);default:return this.clone()}},m.endOf=function(t){return this.startOf(t,!1)},m.$set=function(t,e){var n,o=O.p(t),h="set"+(this.$u?"UTC":""),l=(n={},n[a]=h+"Date",n[d]=h+"Date",n[f]=h+"Month",n[c]=h+"FullYear",n[u]=h+"Hours",n[s]=h+"Minutes",n[i]=h+"Seconds",n[r]=h+"Milliseconds",n)[o],$=o===a?this.$D+(e-this.$W):e;if(o===f||o===c){var y=this.clone().set(d,1);y.$d[l]($),y.init(),this.$d=y.set(d,Math.min(this.$D,y.daysInMonth())).$d}else l&&this.$d[l]($);return this.init(),this},m.set=function(t,e){return this.clone().$set(t,e)},m.get=function(t){return this[O.p(t)]()},m.add=function(r,h){var d,l=this;r=Number(r);var $=O.p(h),y=function(t){var e=w(l);return O.w(e.date(e.date()+Math.round(t*r)),l)};if($===f)return this.set(f,this.$M+r);if($===c)return this.set(c,this.$y+r);if($===a)return y(1);if($===o)return y(7);var M=(d={},d[s]=e,d[u]=n,d[i]=t,d)[$]||1,m=this.$d.getTime()+r*M;return O.w(m,this)},m.subtract=function(t,e){return this.add(-1*t,e)},m.format=function(t){var e=this,n=this.$locale();if(!this.isValid())return n.invalidDate||l;var r=t||"YYYY-MM-DDTHH:mm:ssZ",i=O.z(this),s=this.$H,u=this.$m,a=this.$M,o=n.weekdays,f=n.months,h=function(t,n,i,s){return t&&(t[n]||t(e,r))||i[n].slice(0,s)},c=function(t){return O.s(s%12||12,t,"0")},d=n.meridiem||function(t,e,n){var r=t<12?"AM":"PM";return n?r.toLowerCase():r},$={YY:String(this.$y).slice(-2),YYYY:this.$y,M:a+1,MM:O.s(a+1,2,"0"),MMM:h(n.monthsShort,a,f,3),MMMM:h(f,a),D:this.$D,DD:O.s(this.$D,2,"0"),d:String(this.$W),dd:h(n.weekdaysMin,this.$W,o,2),ddd:h(n.weekdaysShort,this.$W,o,3),dddd:o[this.$W],H:String(s),HH:O.s(s,2,"0"),h:c(1),hh:c(2),a:d(s,u,!0),A:d(s,u,!1),m:String(u),mm:O.s(u,2,"0"),s:String(this.$s),ss:O.s(this.$s,2,"0"),SSS:O.s(this.$ms,3,"0"),Z:i};return r.replace(y,(function(t,e){return e||$[t]||i.replace(":","")}))},m.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},m.diff=function(r,d,l){var $,y=O.p(d),M=w(r),m=(M.utcOffset()-this.utcOffset())*e,v=this-M,g=O.m(this,M);return g=($={},$[c]=g/12,$[f]=g,$[h]=g/3,$[o]=(v-m)/6048e5,$[a]=(v-m)/864e5,$[u]=v/n,$[s]=v/e,$[i]=v/t,$)[y]||v,l?g:O.a(g)},m.daysInMonth=function(){return this.endOf(f).$D},m.$locale=function(){return D[this.$L]},m.locale=function(t,e){if(!t)return this.$L;var n=this.clone(),r=S(t,e,!0);return r&&(n.$L=r),n},m.clone=function(){return O.w(this.$d,this)},m.toDate=function(){return new Date(this.valueOf())},m.toJSON=function(){return this.isValid()?this.toISOString():null},m.toISOString=function(){return this.$d.toISOString()},m.toString=function(){return this.$d.toUTCString()},M}(),T=_.prototype;return w.prototype=T,[["$ms",r],["$s",i],["$m",s],["$H",u],["$W",a],["$M",f],["$y",c],["$D",d]].forEach((function(t){T[t[1]]=function(e){return this.$g(e,t[0],t[1])}})),w.extend=function(t,e){return t.$i||(t(e,_,w),t.$i=!0),w},w.locale=S,w.isDayjs=p,w.unix=function(t){return w(1e3*t)},w.en=D[g],w.Ls=D,w.p={},w}));

/***/ }),

/***/ "./node_modules/dayjs/plugin/isSameOrAfter.js":
/*!****************************************************!*\
  !*** ./node_modules/dayjs/plugin/isSameOrAfter.js ***!
  \****************************************************/
/***/ (function(module) {

!function(e,t){ true?module.exports=t():0}(this,(function(){"use strict";return function(e,t){t.prototype.isSameOrAfter=function(e,t){return this.isSame(e,t)||this.isAfter(e,t)}}}));

/***/ }),

/***/ "./node_modules/dayjs/plugin/isSameOrBefore.js":
/*!*****************************************************!*\
  !*** ./node_modules/dayjs/plugin/isSameOrBefore.js ***!
  \*****************************************************/
/***/ (function(module) {

!function(e,i){ true?module.exports=i():0}(this,(function(){"use strict";return function(e,i){i.prototype.isSameOrBefore=function(e,i){return this.isSame(e,i)||this.isBefore(e,i)}}}));

/***/ }),

/***/ "./node_modules/dayjs/plugin/utc.js":
/*!******************************************!*\
  !*** ./node_modules/dayjs/plugin/utc.js ***!
  \******************************************/
/***/ (function(module) {

!function(t,i){ true?module.exports=i():0}(this,(function(){"use strict";var t="minute",i=/[+-]\d\d(?::?\d\d)?/g,e=/([+-]|\d\d)/g;return function(s,f,n){var u=f.prototype;n.utc=function(t){var i={date:t,utc:!0,args:arguments};return new f(i)},u.utc=function(i){var e=n(this.toDate(),{locale:this.$L,utc:!0});return i?e.add(this.utcOffset(),t):e},u.local=function(){return n(this.toDate(),{locale:this.$L,utc:!1})};var o=u.parse;u.parse=function(t){t.utc&&(this.$u=!0),this.$utils().u(t.$offset)||(this.$offset=t.$offset),o.call(this,t)};var r=u.init;u.init=function(){if(this.$u){var t=this.$d;this.$y=t.getUTCFullYear(),this.$M=t.getUTCMonth(),this.$D=t.getUTCDate(),this.$W=t.getUTCDay(),this.$H=t.getUTCHours(),this.$m=t.getUTCMinutes(),this.$s=t.getUTCSeconds(),this.$ms=t.getUTCMilliseconds()}else r.call(this)};var a=u.utcOffset;u.utcOffset=function(s,f){var n=this.$utils().u;if(n(s))return this.$u?0:n(this.$offset)?a.call(this):this.$offset;if("string"==typeof s&&(s=function(t){void 0===t&&(t="");var s=t.match(i);if(!s)return null;var f=(""+s[0]).match(e)||["-",0,0],n=f[0],u=60*+f[1]+ +f[2];return 0===u?0:"+"===n?u:-u}(s),null===s))return this;var u=Math.abs(s)<=16?60*s:s,o=this;if(f)return o.$offset=u,o.$u=0===s,o;if(0!==s){var r=this.$u?this.toDate().getTimezoneOffset():-1*this.utcOffset();(o=this.local().add(u+r,t)).$offset=u,o.$x.$localOffset=r}else o=this.utc();return o};var h=u.format;u.format=function(t){var i=t||(this.$u?"YYYY-MM-DDTHH:mm:ss[Z]":"");return h.call(this,i)},u.valueOf=function(){var t=this.$utils().u(this.$offset)?0:this.$offset+(this.$x.$localOffset||this.$d.getTimezoneOffset());return this.$d.valueOf()-6e4*t},u.isUTC=function(){return!!this.$u},u.toISOString=function(){return this.toDate().toISOString()},u.toString=function(){return this.toDate().toUTCString()};var l=u.toDate;u.toDate=function(t){return"s"===t&&this.$offset?n(this.format("YYYY-MM-DD HH:mm:ss:SSS")).toDate():l.call(this)};var c=u.diff;u.diff=function(t,i,e){if(t&&this.$u===t.$u)return c.call(this,t,i,e);var s=this.local(),f=n(t).local();return c.call(s,f,i,e)}}}));

/***/ }),

/***/ "./src/framework/view/abstract-view.css":
/*!**********************************************!*\
  !*** ./src/framework/view/abstract-view.css ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_abstract_view_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../../node_modules/css-loader/dist/cjs.js!./abstract-view.css */ "./node_modules/css-loader/dist/cjs.js!./src/framework/view/abstract-view.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_abstract_view_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_abstract_view_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_abstract_view_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_abstract_view_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {

"use strict";


var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }
  return result;
}
function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {

"use strict";


var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }
    memo[target] = styleTarget;
  }
  return memo[target];
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

/***/ }),

/***/ "./node_modules/nanoid/index.browser.js":
/*!**********************************************!*\
  !*** ./node_modules/nanoid/index.browser.js ***!
  \**********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "customAlphabet": () => (/* binding */ customAlphabet),
/* harmony export */   "customRandom": () => (/* binding */ customRandom),
/* harmony export */   "nanoid": () => (/* binding */ nanoid),
/* harmony export */   "random": () => (/* binding */ random),
/* harmony export */   "urlAlphabet": () => (/* reexport safe */ _url_alphabet_index_js__WEBPACK_IMPORTED_MODULE_0__.urlAlphabet)
/* harmony export */ });
/* harmony import */ var _url_alphabet_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./url-alphabet/index.js */ "./node_modules/nanoid/url-alphabet/index.js");

let random = bytes => crypto.getRandomValues(new Uint8Array(bytes))
let customRandom = (alphabet, defaultSize, getRandom) => {
  let mask = (2 << (Math.log(alphabet.length - 1) / Math.LN2)) - 1
  let step = -~((1.6 * mask * defaultSize) / alphabet.length)
  return (size = defaultSize) => {
    let id = ''
    while (true) {
      let bytes = getRandom(step)
      let j = step
      while (j--) {
        id += alphabet[bytes[j] & mask] || ''
        if (id.length === size) return id
      }
    }
  }
}
let customAlphabet = (alphabet, size = 21) =>
  customRandom(alphabet, size, random)
let nanoid = (size = 21) =>
  crypto.getRandomValues(new Uint8Array(size)).reduce((id, byte) => {
    byte &= 63
    if (byte < 36) {
      id += byte.toString(36)
    } else if (byte < 62) {
      id += (byte - 26).toString(36).toUpperCase()
    } else if (byte > 62) {
      id += '-'
    } else {
      id += '_'
    }
    return id
  }, '')


/***/ }),

/***/ "./node_modules/nanoid/url-alphabet/index.js":
/*!***************************************************!*\
  !*** ./node_modules/nanoid/url-alphabet/index.js ***!
  \***************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "urlAlphabet": () => (/* binding */ urlAlphabet)
/* harmony export */ });
const urlAlphabet =
  'useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict'


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _model_point_model_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./model/point-model.js */ "./src/model/point-model.js");
/* harmony import */ var _presenter_trip_presenter_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./presenter/trip-presenter.js */ "./src/presenter/trip-presenter.js");


const siteMainElement = document.querySelector('.page-main');
const siteHeaderElement = siteMainElement.querySelector('.trip-events');
const infoTripElement = document.querySelector('.trip-main');
const filterElement = document.querySelector('.trip-controls__filters');
const pointModel = new _model_point_model_js__WEBPACK_IMPORTED_MODULE_0__["default"]();
pointModel.init();
const tripPresenter = new _presenter_trip_presenter_js__WEBPACK_IMPORTED_MODULE_1__["default"]({
  container: siteHeaderElement,
  pointModel: pointModel,
  infoTripElement: infoTripElement,
  filterElement: filterElement
});
tripPresenter.init();
})();

/******/ })()
;
//# sourceMappingURL=bundle.cfb3655a5dcba2c024ca.js.map