import EditListView from '../view/event-list-view.js';
import FilterView from '../view/filter-veiw.js';
import FormEditView from '../view/form-edit-view.js';
import PointView from '../view/point-view.js';
import SortView from '../view/sort-veiw.js';
import InfoTripView from '../view/info-trip-view.js';
import { render, RenderPosition } from '../render.js';

const POINTS_QUANTITY = 3;

const infoTripElement = document.querySelector('.trip-main');
const filterElement = document.querySelector('.trip-controls__filters');

export default class TripPresenter {
  sortComponent = new SortView();
  editListComponent = new EditListView();

  constructor ({ container }) {
    this.container = container;
  }

  init () {
    render(new InfoTripView(), infoTripElement, RenderPosition.AFTERBEGIN);
    render(this.sortComponent, this.container);
    render(this.editListComponent, this.container);
    render(new FilterView(), filterElement);
    render(new FormEditView(), this.editListComponent.getElement());

    for (let i = 0; i < POINTS_QUANTITY; i++) {
      render (new PointView(), this.editListComponent.getElement());
    }
  }
}
