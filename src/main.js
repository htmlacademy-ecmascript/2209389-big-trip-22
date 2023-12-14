import TripPresenter from './presenter/trip-presenter.js';

const siteMainElement = document.querySelector('.page-main');
const siteHeaderElement = siteMainElement.querySelector('.trip-events');
const tripPresenter = new TripPresenter ({container: siteHeaderElement});


tripPresenter.init();
