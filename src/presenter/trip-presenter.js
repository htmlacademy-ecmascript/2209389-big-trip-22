import PointsListView from '../view/points-list-view.js';
import FilterView from '../view/filter-view.js';
import SortView from '../view/sort-view.js';
import InfoTripView from '../view/info-trip-view.js';
import { RenderPosition } from '../render.js';
import { render, remove } from '../framework/render.js';
import NoPointsView from '../view/no-points-view.js';
import { generateFilter } from '../model/point-model.js';
import PointPresenter from './point-presener.js';
import { updateItem, sortPointsByPrice, sortPointsByTime, sortPointsByDay } from '../utils.js';
import { SortType, UpdateType, UserAction } from '../const.js';

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
  //#tripPoints = [ ];
  //#offers = null;
  //#destinations = null;
  #pointPresenters = new Map ();
  #currentSortType = SortType.DAY;
  //#sourcedTripPoints = [];

  constructor ({ container, pointModel, infoTripElement, filterElement }) {
    this.#container = container;
    this.#pointModel = pointModel;
    this.#infoTripElement = infoTripElement;
    this.#filterElement = filterElement;

    this.#pointModel.addObserver(this.#handleModelEvent);
  }

  init () {
    // this.#tripPoints = [...this.#pointModel.points];
    // this.#offers = [...this.#pointModel.offers];
    // this.#destinations = [...this.#pointModel.destinations];

    // this.#sourcedTripPoints = [...this.#pointModel.points];

    this.#renderTripEvents();
  }

  get points() {
    switch (this.#currentSortType) {
      case SortType.PRICE:
        return [...this.#pointModel.points.sort(sortPointsByPrice)];
      case SortType.TIME:
        return [...this.#pointModel.points.sort(sortPointsByTime)];
      case SortType.DAY:
        return [...this.#pointModel.points.sort(sortPointsByDay)];
    }

    return this.#pointModel.points;
  }

  get offers() {
    return this.#pointModel.offers;
  }

  get destinations() {
    return this.#pointModel.destinations;
  }


  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  // #handlePointChange = (updatedPoint) => {
  //   this.#tripPoints = updateItem(this.#tripPoints, updatedPoint);
  //   this.#sourcedTripPoints = updateItem(this.#sourcedTripPoints, updatedPoint);
  //   this.#pointPresenters.get(updatedPoint.id).init(updatedPoint ,this.destinations, this.offers);
  // };

  //сюда попадают данные из дочерних презенторов и мы вызываем модель
  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.ADD_POINT:
        this.#pointModel.addPoint(updateType, update);
        break;
      case UserAction.UPDATE_POINT:
        this.#pointModel.updatePoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this.#pointModel.deletePoint(updateType, update);
        break;
    }
  };

  //здесь будет запускаться перерисовка
  #handleModelEvent = (updateType, data) => {
    // в зависимости от типа изменения решаем что делать:
    switch (updateType) {
      // обновить часть точки
      case UpdateType.PATCH:
        this.#pointPresenters.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearTrip();
        this.#renderTripEvents();
        //this.#renderEvents();
        break;
      case UpdateType.MAJOR:
        this.#clearTrip({resetSortType: true});
        this.#renderTripEvents();
        //this.#renderEvents();
        break;
    }
  };

  // #sortPoints(sortType) {
  // }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    // this.#sortPoints(sortType);

    this.#currentSortType = sortType;
    // this.#clearPointList();
    // this.#renderOnlyPoints();
    this.#clearTrip();
    //this.#renderPage();
    this.#renderTripEvents();


  };

  #renderSort () {

    this.#sortComponent = new SortView ({
      currentSortType: this.#currentSortType,
      onSortTypeChange: this.#handleSortTypeChange
    });

    render(this.#sortComponent, this.#container);
  }

  #renderPoints (point, destinations, offers) {
    const pointPresenter = new PointPresenter({
      pointListContainer: this.#pointsListComponent.element,
      onDataChange: this.#handleViewAction,
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

    this.#renderInfoTrip();
    this.#renderSort();
    this.#renderPointsList();
    this.#renderFilter();
    this.#renderOnlyPoints();

    this.points.sort(sortPointsByDay);
  }

  #renderOnlyPoints() {

    if (this.points.length === 0) {
      this.#renderNoPoints();
      return;
    }
    this.#renderPointsList();
    for (const point of this.points) {
      this.#renderPoints(point, this.destinations, this.offers);
    }
  }

  #clearTrip({resetSortType = false} = {}) {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();

    remove(this.#sortComponent);
    remove(this.#noPointsComponent);
    remove(this.#filterComponent);

    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }
  }

  // #clearPointList() {
  //   this.#pointPresenters.forEach((presenter) => presenter.destroy());
  //   this.#pointPresenters.clear();
  // }

}
