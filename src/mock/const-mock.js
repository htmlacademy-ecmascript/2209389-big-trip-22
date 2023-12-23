import { TRIP_POINT_TYPES } from '../const.js';

export const getDefaultPoint = () => ({
  basePrice: 0,
  dateFrom: '2019-07-10T22:55:56.845Z',
  dateTo: new Date().toISOString(),
  destination: 0,
  isFavorite: false,
  offers: [],
  type: TRIP_POINT_TYPES[0],
});
