import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { TRIP_POINT_TYPES } from '../const.js';
import { humanizeDate } from '../utils.js';
import { DateFormat } from '../const.js';
import flatpickr from 'flatpickr';
import { emptyPoint } from '../const.js';
import 'flatpickr/dist/flatpickr.min.css';
import he from 'he';

const upFirstLetter = (word) => `${word[0].toUpperCase()}${word.slice(1)}`;
const formatOfferTitle = (title) => title.split(' ').join(' ');

const createPointEditTemplate = (point, destinations, offers) => {
  const pointDestination = destinations.find((dest) => dest.id === point.destination);
  const typeOffers = offers.find((off) => off.type === point.type).offers;
  const pointOffers = typeOffers.filter((typeOffer) => point.offers.includes(typeOffer.id));
  const {dateFrom, dateTo, basePrice, type, isDeleting, isSaving, isDisabled} = point;
  const {name, description, pictures} = pointDestination || {};
  const pointId = point.id || 0;

  return (
    `<li class="trip-events__item">
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

            ${TRIP_POINT_TYPES.map((pointType) => (
      `            <div class="event__type-item">
              <input id="event-type-${pointType}-${pointId}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${pointType}" ${pointType === type ? 'checked' : ''}>
              <label class="event__type-label  event__type-label--${pointType}" for="event-type-${pointType}-${pointId}">${upFirstLetter(pointType)}</label>
            </div>`
    )).join('')}

          </fieldset>
        </div>
      </div>

      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-${pointId}">
          ${type}
        </label>
        <input class="event__input  event__input--destination" id="event-destination-${pointId}" type="text" name="event-destination" value="${he.encode(name || '')}" list="destination-list-${pointId}">
        <datalist id="destination-list-${pointId}">
        ${destinations.map((destination) => `<option value="${destination.name}"></option>`).join('')}
        </datalist>
      </div>

      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-${pointId}">From</label>
        <input class="event__input  event__input--time" id="event-start-time-${pointId}" type="text" name="event-start-time" value="${humanizeDate(dateFrom, DateFormat.YEAR_MONTH_DAY)}">
        &mdash;
        <label class="visually-hidden" for="event-end-time-${pointId}">To</label>
        <input class="event__input  event__input--time" id="event-end-time-${pointId}" type="text" name="event-end-time" value="${humanizeDate(dateTo, DateFormat.YEAR_MONTH_DAY)}">
      </div>

      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-${pointId}">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-${pointId}" type="text" name="event-price" value=${basePrice} required>
      </div>

      <button class="event__save-btn  btn  btn--blue" type="submit" ${isDisabled ? 'Disabled' : ''}>${isSaving ? 'Saving...' : 'Save'}</button>
      <button class="event__reset-btn" type="reset" ${isDisabled ? 'Disabled' : ''}>${point.id ? `${isDeleting ? 'Deleting...' : 'Delete'}` : 'Cancel'}</button>
      ${point.id ? (
      `<button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
       </button>`
    ) : '' }
    </header>

    <section class="event__details">
    ${typeOffers.length ?
      `  <section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>
        <div class="event__available-offers">
        ${typeOffers.map((typeOffer) => (
      `
          <div class="event__offer-selector">
            <input class="event__offer-checkbox  visually-hidden" id="event-offer-${formatOfferTitle(typeOffer.title)}-${pointId}" type="checkbox" name="event-offer-${formatOfferTitle(typeOffer.title)}" ${pointOffers.map((offer) => offer.id).includes(typeOffer.id) ? 'checked' : ''}>
            <label class="event__offer-label" for="event-offer-${typeOffer.title}-${pointId}">
              <span class="event__offer-title">${typeOffer.title}</span>
              &plus;&euro;&nbsp;
              <span class="event__offer-price">${typeOffer.price}</span>
            </label>
          </div>`
    )).join('')}
        </div>
      </section>`
      : ''}

      ${pointDestination ? (
      `<section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        <p class="event__destination-description">${description}</p>
        ${pictures.length ? (
        `
          <div class="event__photos-container">
          <div class="event__photos-tape">
          ${pictures.map((pic) => `<img class="event__photo" src="${pic.src}" alt="${pic.description}">`)}
          </div>
        </div>`
      ) : '' }
             </section> `
    ) : '' }
    </section>
    </form>
    </li>`
  );
};

export default class PointEditView extends AbstractStatefulView {
  #destinations = null;
  #offers = null;
  #handleFormSubmit = null;
  #handleEditClick = null;
  #dateFromPicker = null;
  #dateToPicker = null;
  #handleDeleteClick = null;


  constructor ({point, destinations, offers, onEditFormSubmit, onRollupButtonClick, onDeleteClick}) {
    super();
    this._setState(PointEditView.parsePointToState(point));
    this.#destinations = destinations;
    this.#offers = offers;

    this.#handleFormSubmit = onEditFormSubmit;
    this.#handleEditClick = onRollupButtonClick;
    this.#handleDeleteClick = onDeleteClick;
    this._restoreHandlers();

  }

  get template() {
    return createPointEditTemplate(this._state, this.#destinations, this.#offers);
  }

  reset(point) {
    this.updateElement(
      PointEditView.parsePointToState(point),
    );
  }

  _restoreHandlers(){
    if (this.element.querySelector('.event__rollup-btn')) {
      this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editClickHandler);
    }
    this.element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);

    this.element.querySelectorAll('.event__type-input').forEach((typeRadioButton) => {
      typeRadioButton.addEventListener('change', this.#changeTypeHandler);
    });
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#changeDestinationHandler);
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#formDeleteClickHandler);
    //TODO новая точка не имеет стрелки 'event__rollup-btn' поэтому обработчик не срабатывает
    //this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editClickHandler);
    this.#initDatePicker();
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(PointEditView.parseStateToPoint(this._state));
  };

  #editClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleEditClick();
  };

  #changeTypeHandler = (evt) => {
    evt.preventDefault();
    this._setState({type: evt.target.value,});
    this.updateElement(this._state);
  };

  #changeDestinationHandler = (evt) => {
    evt.preventDefault();
    const newDestination = this.#destinations.find((dest) => dest.name === evt.target.value);
    if (newDestination) {
      this._setState({
        destination: newDestination.id,
        description: newDestination.description,
        pictures: newDestination.pictures,
      });
      this.updateElement(this._state);
    }
  };

  #dateFromCloseHandler = ([userDate]) => {
    this._setState({dateFrom: userDate});
    this.#dateToPicker.set('minDate', this._state.dateFrom);
  };

  #dateToCloseHandler = ([userDate]) => {
    this._setState({dateTo: userDate});
    this.#dateFromPicker.set('maxDate', this._state.dateTo);
  };

  #formDeleteClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleDeleteClick(PointEditView.parseStateToPoint(this._state));
  };

  #initDatePicker = () => {
    const militaryTimeFormat = 'time_24hr';
    const commonFlatpickrOptions = {
      dateFormat: 'd/m/y H:i',
      enableTime: true,
      locale: {'firstDayOfWeek': 1},
      [militaryTimeFormat]: true,
    };


    this.#dateFromPicker = flatpickr(
      this.element.querySelector('input[name="event-start-time"]'),
      {
        ...commonFlatpickrOptions,
        defaultDate: this._state.dateFrom,
        onClose: this.#dateFromCloseHandler,
        maxDate: this._state.dateTo,
      }
    );


    this.#dateToPicker = flatpickr(
      this.element.querySelector('input[name="event-end-time"]'),
      {
        ...commonFlatpickrOptions,
        defaultDate: this._state.dateTo,
        onClose: this.#dateToCloseHandler,
        minDate: this._state.dateFrom,
      }
    );


  };

  static parsePointToState(point) {
    return {...point,
      isDisabled: false,
      isSaving: false,
      isDeleting: false,
    };
  }

  static parseStateToPoint(state) {
    const point = {...state};

    delete point.isDisabled;
    delete point.isSaving;
    delete point.isDeleting;

    return point;
  }

  removeElement = () => {
    super.removeElement();
    if (this.#dateFromPicker) {
      this.#dateFromPicker.destroy();
      this.#dateFromPicker = null;
    }
    if (this.#dateToPicker) {
      this.#dateToPicker.destroy();
      this.#dateToPicker = null;
    }
  };

}
