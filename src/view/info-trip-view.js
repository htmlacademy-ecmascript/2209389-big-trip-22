import AbstractView from '../framework/view/abstract-view.js';
import { getMaxData, getMinData } from '../utils.js';

const MAX_DESTINATIONS_COUNT = 3;

function createInfoTripTemplate (destinationsNames, points) {
  return points !== undefined || points.length !== 0 ?
    `<section class="trip-main__trip-info  trip-info">
  <div class="trip-info__main">
  <h1 class="trip-info__title">
  ${destinationsNames.length > MAX_DESTINATIONS_COUNT
    ? `${destinationsNames[0]} &mdash;...&mdash; ${destinationsNames[destinationsNames.length - 1]}`
    : destinationsNames.join(' &mdash; ')}</h1>
  <p class="trip-info__dates">${getMinData(points)} &nbsp;&mdash;&nbsp;${getMaxData(points)}</p>
  </div>
</section>` : '';
}

export default class InfoTripView extends AbstractView {
  #points = null;
  #destinations = null;
  constructor({points, destinations}) {
    super();
    this.#points = points;
    this.#destinations = destinations;
  }


  #findDestinationNames() {
    const destinationIdentificators = this.#points.map((point) => point.destination);
    const destinationNames = destinationIdentificators.map((id) => {
      const destination = this.#destinations.find((dest) => dest.id === id);
      return destination ? destination.name : null;
    });

    return destinationNames;
  }


  get template() {
    return createInfoTripTemplate(this.#findDestinationNames(), this.#points);
  }
}
