import PointsModel from './model/points-model.js';
import TripPresenter from './presenter/trip-presenter.js';
import FilterModel from './model/filter-model.js';
import FilterPresenter from './presenter/filter-presenter.js';
import PointsApiService from './points-api-service.js';

const END_POINT = 'https://22.objects.htmlacademy.pro/big-trip';
const AUTHORIZATION = 'Basic ewq42aeae2wa';

const siteMainElement = document.querySelector('.page-main');
const siteHeaderElement = siteMainElement.querySelector('.trip-events');

const infoTripElement = document.querySelector('.trip-main');
const filterElement = document.querySelector('.trip-controls__filters');

const newPointButton = infoTripElement.querySelector('.trip-main__event-add-btn');


const pointsModel = new PointsModel({
  pointsApiService: new PointsApiService(END_POINT, AUTHORIZATION)
});
pointsModel.init().finally(() => {
  newPointFormCloseHandler();
});

const filterModel = new FilterModel();

const filterPresenter = new FilterPresenter ({
  filterContainer: filterElement,
  filterModel,
  pointsModel: pointsModel
});

const tripPresenter = new TripPresenter({
  container: siteHeaderElement,
  pointModel: pointsModel,
  infoTripElement: infoTripElement,
  filterModel: filterModel,
  onNewPointDestroy: newPointFormCloseHandler,
});

newPointButton.addEventListener('click', newPointButtonClickHandler);

function newPointFormCloseHandler() {
  newPointButton.disabled = false;
}

function newPointButtonClickHandler() {
  tripPresenter.createPoint();
  newPointButton.disabled = true;
}


filterPresenter.init();
tripPresenter.init();

export { newPointButton };
