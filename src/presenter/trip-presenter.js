import EditListView from '../view/event-list-view.js';
import FilterView from '../view/filter-veiw.js';
import PointEditView from '../view/point-edit-view.js';
import PointView from '../view/point-view.js';
import SortView from '../view/sort-veiw.js';
import InfoTripView from '../view/info-trip-view.js';
import { RenderPosition } from '../render.js';
import { getDefaultPoint } from '../mock/const-mock.js';
import { render } from '../framework/render.js';


const infoTripElement = document.querySelector('.trip-main');
const filterElement = document.querySelector('.trip-controls__filters');

export default class TripPresenter {
  sortComponent = new SortView();
  editListComponent = new EditListView();

  constructor ({ container, pointModel }) {
    this.container = container;
    this.pointModel = pointModel;
  }

  init () {
    const points = this.pointModel.getPoints();
    const destinations = this.pointModel.getDestinations();
    const offers = this.pointModel.getOffers();


    render(new InfoTripView(), infoTripElement, RenderPosition.AFTERBEGIN);
    render(this.sortComponent, this.container);
    render(this.editListComponent, this.container);
    render(new FilterView(), filterElement);
    render(new PointEditView(getDefaultPoint(), destinations, offers), this.editListComponent.element);
    render(new PointEditView(points[1], destinations, offers), this.editListComponent.element);

    for (const point of points) {
      render (new PointView(point, destinations, offers), this.editListComponent.element);
    }
  }
}
