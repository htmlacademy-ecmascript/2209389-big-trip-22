import { points } from '../mock/points-mock.js';
import { offers } from '../mock/offers-mock.js';
import { destinations } from '../mock/destinations-mock.js';
import { filter } from '../filter.js';

export default class PointModel {
  #points = null;
  #destinations = null;
  #offers = null;

  constructor() {
    this.#points = [];
    this.#destinations = [];
    this.#offers = [];
  }

  init() {
    this.#points = points;
    this.#destinations = destinations;
    this.#offers = offers;
  }

  get points() {
    return this.#points;
  }

  get destinations() {
    return this.#destinations;
  }

  get offers() {
    return this.#offers;
  }
}


function generateFilter(pointsToFilter) {
  return Object.entries(filter).map(
    ([filterType, filterPoints]) => ({
      type: filterType,
      count: filterPoints(pointsToFilter).length,
    }),
  );
}

export {generateFilter};
