import PointModel from './model/point-model.js';
import TripPresenter from './presenter/trip-presenter.js';
import FilterModel from './model/filter-model.js';
import FilterPresenter from './presenter/filter-presenter.js';


const siteMainElement = document.querySelector('.page-main');
const siteHeaderElement = siteMainElement.querySelector('.trip-events');

const infoTripElement = document.querySelector('.trip-main');
const filterElement = document.querySelector('.trip-controls__filters');

const newPointButton = infoTripElement.querySelector('.trip-main__event-add-btn');

newPointButton.addEventListener('click', newPointButtonClickHandler);

const pointModel = new PointModel();
pointModel.init();

const filterModel = new FilterModel();

const filterPresenter = new FilterPresenter ({
  filterContainer: filterElement,
  filterModel,
  pointsModel: pointModel
});

const tripPresenter = new TripPresenter({
  container: siteHeaderElement,
  pointModel: pointModel,
  infoTripElement: infoTripElement,
  //filterElement: filterElement,
  filterModel: filterModel,
  onNewPointDestroy: newPointFormCloseHandler,
});

function newPointFormCloseHandler() {
  newPointButton.disabled = false;
}

function newPointButtonClickHandler() {
  tripPresenter.createPoint();
  newPointButton.disabled = true;
}


filterPresenter.init();
tripPresenter.init();
