import PointsListView from '../view/points-list-view.js';
import SortView from '../view/sort-view.js';
import InfoTripView from '../view/info-trip-view.js';
import NoPointsView from '../view/no-points-view.js';
import LoadingView from '../view/loading-view.js';
import PointPresenter from './point-presener.js';
import NewPointPresenter from './new-point-presenter.js';
import { RenderPosition } from '../render.js';
import { render, remove } from '../framework/render.js';
import { sortPointsByPrice, sortPointsByTime, sortPointsByDay } from '../utils.js';
import { SortType, UpdateType, UserAction, FilterType } from '../const.js';
import { filter } from '../filter.js';

export default class TripPresenter {
  #sortComponent = null;
  #noPointsComponent = null;
  #pointsListComponent = new PointsListView();
  #infoTripComponent = new InfoTripView();
  #loadingComponent = new LoadingView();
  #filterComponent = null;

  #container = null;
  #pointModel = null;
  #infoTripElement = null;
  #pointPresenters = new Map ();
  #currentSortType = SortType.DAY;
  #filterModel = null;
  #filterType = FilterType.EVERYTHING;
  #newPointPresenter = null;
  #isLoading = true;


  constructor ({ container, pointModel, infoTripElement, filterModel, onNewPointDestroy}) {
    this.#container = container;
    this.#pointModel = pointModel;
    this.#infoTripElement = infoTripElement;
    this.#filterModel = filterModel;
    this.#newPointPresenter = new NewPointPresenter({
      pointListContainer: this.#pointsListComponent.element,
      onDataChange: this.#handleViewAction,
      onDestroy: onNewPointDestroy,
      pointModel,
    });

    this.#pointModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  init () {

    this.#renderTripEvents();
  }

  get points() {
    this.#filterType = this.#filterModel.filter;
    const points = this.#pointModel.points;
    const filteredPoints = filter[this.#filterType](points);
    switch (this.#currentSortType) {
      case SortType.PRICE:
        return filteredPoints.sort(sortPointsByPrice);
      case SortType.TIME:
        return filteredPoints.sort(sortPointsByTime);
      case SortType.DAY:
        return filteredPoints.sort(sortPointsByDay);
    }

    return filteredPoints;
  }

  get offers() {
    return this.#pointModel.offers;
  }

  get destinations() {
    return this.#pointModel.destinations;
  }

  createPoint() {
    this.#currentSortType = SortType.DAY;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#newPointPresenter.init();
  }


  #handleModeChange = () => {
    this.#newPointPresenter.destroy();
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };


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
      case UpdateType.PATCH:
        this.#pointPresenters.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearTrip();
        this.#renderTripEvents();
        break;
      case UpdateType.MAJOR:
        this.#clearTrip({resetSortType: true});
        this.#renderTripEvents();
        break;
      case UpdateType.INIT:
        this.isLoading = false;
        remove(this.#loadingComponent);
        this.#renderOnlyPoints();
        break;
    }
  };


  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;

    this.#clearTrip();

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
      onModeChange: this.#handleModeChange,
    });
    pointPresenter.init(point, this.#pointModel.destinations, this.#pointModel.offers);

    this.#pointPresenters.set(point.id, pointPresenter);
  }


  #renderNoPoints () {
    this.#noPointsComponent = new NoPointsView({
      filterType: this.#filterType
    });
    render (this.#noPointsComponent, this.#container, RenderPosition.AFTEREND);
  }

  #renderInfoTrip () {
    render(this.#infoTripComponent, this.#infoTripElement, RenderPosition.AFTERBEGIN);
  }

  #renderPointsList () {
    render(this.#pointsListComponent, this.#container);
  }

  #renderLoading() {
    render(this.#loadingComponent, this.#container, RenderPosition.AFTERBEGIN);
  }


  #renderTripEvents() {

    // if (this.#isLoading) {
    //   this.#renderLoading();
    //   return;
    // }

    this.#renderInfoTrip();
    this.#renderSort();
    this.#renderPointsList();
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
    this.#newPointPresenter.destroy();
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();

    remove(this.#sortComponent);
    remove(this.#filterComponent);
    remove(this.#loadingComponent);

    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }

    if (this.#noPointsComponent) {
      remove(this.#noPointsComponent);
    }

  }

}
