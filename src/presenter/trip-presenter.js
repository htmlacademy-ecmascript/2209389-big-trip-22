import PointsListView from '../view/points-list-view.js';
import FilterView from '../view/filter-view.js';
import SortView from '../view/sort-view.js';
import InfoTripView from '../view/info-trip-view.js';
import { RenderPosition } from '../render.js';
import { render } from '../framework/render.js';
import NoPointsView from '../view/no-points-view.js';
import { generateFilter } from '../model/point-model.js';
import PointPresenter from './point-presener.js';
import { updateItem, sortPointsByPrice, sortPointsByTime } from '../utils.js';
import { SortType } from '../const.js';

export default class TripPresenter {
  #sortComponent = null;
  #noPointsComponent = new NoPointsView();
  #pointsListComponent = new PointsListView();
  #infoTripComponent = new InfoTripView();
  #filterComponent = null;
  #container = null;
  #pointModel = null;
  #infoTripElement = null;
  #filterElement = null;
  #tripPoints = [ ];
  #offers = null;
  #destinations = null;
  #pointPresenters = new Map ();
  #currentSortType = SortType.DAY;
  #sourcedTripPoints = [];

  constructor ({ container, pointModel, infoTripElement, filterElement }) {
    this.#container = container;
    this.#pointModel = pointModel;
    this.#infoTripElement = infoTripElement;
    this.#filterElement = filterElement;
  }

  init () {
    this.#tripPoints = [...this.#pointModel.points];
    this.#offers = [...this.#pointModel.offers];
    this.#destinations = [...this.#pointModel.destinations];

    this.#sourcedTripPoints = [...this.#pointModel.points];

    this.#renderTripEvents();
  }

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #handlePointChange = (updatedPoint) => {
    this.#tripPoints = updateItem(this.#tripPoints, updatedPoint);
    this.#sourcedTripPoints = updateItem(this.#sourcedTripPoints, updatedPoint);
    this.#pointPresenters.get(updatedPoint.id).init(updatedPoint ,this.#destinations, this.#offers);
  };

  #sortPoints(sortType) {
    switch (sortType) {
      case SortType.PRICE:
        this.#tripPoints.sort(sortPointsByPrice);
        break;
      case SortType.TIME:
        this.#tripPoints.sort(sortPointsByTime);
        break;
      default:
        this.#tripPoints = [...this.#sourcedTripPoints];
    }
    this.#currentSortType = sortType;
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortPoints(sortType);

    this.#clearPointList();

    this.#renderOnlyPoints();


  };

  #renderSort () {

    this.#sortComponent = new SortView ({

      onSortTypeChange: this.#handleSortTypeChange
    });

    render(this.#sortComponent, this.#container);
  }

  #renderPoints (point, destinations, offers) {
    const pointPresenter = new PointPresenter({
      pointListContainer: this.#pointsListComponent.element,
      onDataChange: this.#handlePointChange,
      onModeChange: this.#handleModeChange
    });
    pointPresenter.init(point, destinations, offers);
    this.#pointPresenters.set(point.id, pointPresenter);
  }


  #renderNoPoints () {
    render (this.#noPointsComponent, this.#container, RenderPosition.AFTERBEGIN);
  }

  #renderInfoTrip () {
    render(this.#infoTripComponent, this.#infoTripElement, RenderPosition.AFTERBEGIN);
  }

  #renderPointsList () {
    render(this.#pointsListComponent, this.#container);
  }

  #renderFilter () {

    const points = this.#pointModel.points;
    const filters = generateFilter(points);

    this.#filterComponent = new FilterView({filters});
    render(this.#filterComponent, this.#filterElement);

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

  #renderOnlyPoints() {
    const points = this.#tripPoints;
    const destinations = this.#destinations;
    const offers = this.#offers;

    if (points.length === 0) {
      this.#renderNoPoints();
      return;
    }
    this.#renderPointsList();
    for (const point of points) {
      this.#renderPoints(point, destinations, offers);
    }
  }

  #clearPointList() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  }

}
