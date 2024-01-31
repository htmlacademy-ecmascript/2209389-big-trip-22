import PointModel from './model/point-model.js';
import TripPresenter from './presenter/trip-presenter.js';
import FilterModel from './model/filter-model.js';


const siteMainElement = document.querySelector('.page-main');
const siteHeaderElement = siteMainElement.querySelector('.trip-events');

const infoTripElement = document.querySelector('.trip-main');
const filterElement = document.querySelector('.trip-controls__filters');

const pointModel = new PointModel();
pointModel.init();

const filterModel = new FilterModel();


const tripPresenter = new TripPresenter({
  container: siteHeaderElement,
  pointModel: pointModel,
  infoTripElement: infoTripElement,
  filterElement: filterElement,
});
tripPresenter.init();
