import PointsListView from '../view/points-list-view.js';
import SortView from '../view/sort-view.js';
import InfoTripView from '../view/info-trip-view.js';
import NoPointsView from '../view/no-points-view.js';
import LoadingView from '../view/loading-view.js';
import FailedToLoadView from '../view/failed-to-load-view.js';
import TotalPriceView from '../view/total-price-view.js';
import PointPresenter from './point-presener.js';
import NewPointPresenter from './new-point-presenter.js';
import { RenderPosition } from '../render.js';
import { render, remove } from '../framework/render.js';
import { sortPointsByPrice, sortPointsByTime, sortPointsByDay } from '../utils.js';
import { SortType, UpdateType, UserAction, FilterType, TimeLimit } from '../const.js';
import { filter } from '../filter.js';
import UiBlocker from '../framework/ui-blocker/ui-blocker.js';
import { newPointButton } from '../main.js';
import { activateNewPointButton } from '../main.js';

export default class TripPresenter {
  #sortComponent = null;
  #noPointsComponent = null;

  #totalPriceComponent = null;

  #pointsListComponent = new PointsListView();
  #infoTripComponent = null;
  #loadingComponent = new LoadingView();
  #filterComponent = null;
  #failedToLoadComponent = new FailedToLoadView();

  #container = null;
  #pointModel = null;
  #infoTripElement = null;
  #pointPresenters = new Map ();
  #currentSortType = SortType.DAY;
  #filterModel = null;
  #filterType = FilterType.EVERYTHING;
  #newPointPresenter = null;
  #uiBlocker = new UiBlocker({
    lowerLimit: TimeLimit.LOWER_LIMIT,
    upperLimit: TimeLimit.UPPER_LIMIT
  });


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
  #handleViewAction = async (actionType, updateType, update) => {
    this.#uiBlocker.block();
    switch (actionType) {
      case UserAction.ADD_POINT:
        this.#newPointPresenter.setSaving();
        try {
          await this.#pointModel.addPoint(updateType, update);
          this.#newPointPresenter.destroy();
        } catch(err) {
          this.#newPointPresenter.setAborting();
        }
        break;
      case UserAction.UPDATE_POINT:
        this.#pointPresenters.get(update.id).setSaving();
        try {
          await this.#pointModel.updatePoint(updateType, update);
        } catch(err) {
          this.#pointPresenters.get(update.id).setAborting();
        }
        break;
      case UserAction.DELETE_POINT:
        this.#pointPresenters.get(update.id).setDeleting();
        try {
          this.#pointModel.deletePoint(updateType, update);
        }catch(err) {
          this.#pointPresenters.get(update.id).setAborting();
        }
        break;
    }
    this.#uiBlocker.unblock();
  };

  //здесь будет запускаться перерисовка
  #handleModelEvent = (updateType, data) => {
    // в зависимости от типа изменения решаем что делать:
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointPresenters.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        if (this.points.length === 0) {
          this.#renderNoPoints();
        }
        this.#clearTrip();
        this.#renderTripEvents();
        break;
      case UpdateType.MAJOR:
        this.#clearTrip({resetSortType: true});
        this.#renderTripEvents();
        break;
      case UpdateType.INIT:
        try {
          this.isLoading = false;
          remove(this.#loadingComponent);
          this.#renderTripEvents();
        } catch (err) {
          this.#renderFailedToLoadComponent();
          newPointButton.disabled = true;
        }
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

  #renderPoints (point) {
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

  #renderTotalPrice () {
    this.#totalPriceComponent = new TotalPriceView();
    render (this.#totalPriceComponent, this.#infoTripElement, RenderPosition.AFTEREND);
  }

  #renderInfoTrip () {
    this.#infoTripComponent = new InfoTripView({
      points: [...this.points.sort(sortPointsByDay)],
      destinations: this.destinations});
    render(this.#infoTripComponent, this.#infoTripElement, RenderPosition.AFTERBEGIN);
  }

  #renderPointsList () {
    render(this.#pointsListComponent, this.#container);
  }

  #renderLoading() {
    render(this.#loadingComponent, this.#container, RenderPosition.AFTERBEGIN);
  }

  #renderFailedToLoadComponent() {
    render(this.#failedToLoadComponent, this.#container, RenderPosition.AFTERBEGIN);
  }


  #renderTripEvents() {

    if (this.#pointModel.loading) {
      this.#renderLoading();
      return;
    }

    if (this.#pointModel.loadingFailed) {
      this.#renderFailedToLoadComponent();
      return;
    }

    this.#renderInfoTrip();
    this.#renderSort();
    this.#renderPointsList();
    this.#renderOnlyPoints();
    this.#renderTotalPrice();

    activateNewPointButton();

    if (this.points.length === 0) {
      this.#renderNoPoints();
    }

    this.points.sort(sortPointsByDay);

  }


  #renderOnlyPoints() {


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
    remove(this.#totalPriceComponent);
    remove(this.#infoTripComponent);

    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }

    if (this.#noPointsComponent || this.#failedToLoadComponent) {
      remove(this.#noPointsComponent);
      remove(this.#failedToLoadComponent);
    } else if (this.points.length === 0 && !this.#pointModel.loadingFailed) {
      this.#renderNoPoints();
    }

  }

}
