import EditListView from '../view/event-list-view.js';
import FilterView from '../view/filter-veiw.js';
import PointEditView from '../view/point-edit-view.js';
import PointView from '../view/point-view.js';
import SortView from '../view/sort-veiw.js';
import InfoTripView from '../view/info-trip-view.js';
import { RenderPosition } from '../render.js';
import { getDefaultPoint } from '../mock/const-mock.js';
import { render } from '../framework/render.js';

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
    const points = this.#pointModel.points;
    const destinations = this.#pointModel.destinations;
    const offers = this.#pointModel.offers;

    render(new InfoTripView(), this.#infoTripElement, RenderPosition.AFTERBEGIN);
    render(this.#sortComponent, this.#container);
    render(this.#editListComponent, this.#container);
    render(new FilterView(), this.#filterElement);
    //render(new PointEditView(getDefaultPoint(), destinations, offers), this.#editListComponent.element);
    //render(new PointEditView(points[1], destinations, offers), this.#editListComponent.element);

    for (const point of points) {
      this.#renderPoint(point, destinations, offers);
    }
  }

  #renderPoint (point, destinations, offers) {

    const pointComponent = new PointView(point, destinations, offers);

    render (pointComponent, this.#editListComponent.element);
  }
}
