import { TRIP_POINT_TYPES } from '../const.js';

export const getDefaultPoint = () => ({
  basePrice: 500,
  dateFrom: new Date().toISOString(),
  dateTo: new Date().toISOString(),
  destination: 0,
  isFavorite: false,
  offers: [],
  type: TRIP_POINT_TYPES[3],
});
