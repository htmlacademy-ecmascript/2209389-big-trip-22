import EditListView from '../view/event-list-view.js';
import FilterView from '../view/filter-veiw.js';
import PointEditView from '../view/point-edit-view.js';
import PointView from '../view/point-view.js';
import SortView from '../view/sort-veiw.js';
import InfoTripView from '../view/info-trip-view.js';
import { RenderPosition } from '../render.js';
import { render, replace } from '../framework/render.js';
import EmptyListView from '../view/empty-list-view.js';

export default class TripPresenter {
  #sortComponent = new SortView();
  #editListComponent = new EditListView();
  #container = null;
  #pointModel = null;
  #infoTripElement = null;
  #filterElement = null;

  constructor ({ container, pointModel, infoTripElement, filterElement }) {
    this.#container = container;
    this.#pointModel = pointModel;
    this.#infoTripElement = infoTripElement;
    this.#filterElement = filterElement;
  }

  init () {
    this.#renderTripEvents();
  }

  #renderPoint (point, destinations, offers) {
    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceFormToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    const pointComponent = new PointView ({
      point, destinations, offers,
      onRollupButtonClick: () => {
        replacePointToForm();
        document.addEventListener('keydown', escKeyDownHandler);
      }
    });

    const pointEditComponent = new PointEditView ({
      point,
      destinations,
      offers,
      onEditFormSubmit: () => {
        replaceFormToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      },
      onRollupButtonClick: () => {
        replaceFormToPoint();
      }
    });

    function replacePointToForm() {
      replace(pointEditComponent, pointComponent);
    }

    function replaceFormToPoint() {
      replace(pointComponent, pointEditComponent);
    }

    render (pointComponent, this.#editListComponent.element);
  }

  #renderTripEvents() {
    const points = this.#pointModel.points;
    const destinations = this.#pointModel.destinations;
    const offers = this.#pointModel.offers;

    if (points.length === 0) {
      render (new EmptyListView(), this.#container, RenderPosition.AFTERBEGIN);
      return;
    }

    render(new InfoTripView(), this.#infoTripElement, RenderPosition.AFTERBEGIN);
    render(this.#sortComponent, this.#container);
    render(this.#editListComponent, this.#container);
    render(new FilterView(), this.#filterElement);

    for (const point of points) {
      this.#renderPoint(point, destinations, offers);
    }
  }
}
