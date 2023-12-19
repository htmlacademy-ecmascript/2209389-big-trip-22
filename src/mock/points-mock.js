import { getRandomArrayElement } from './utils-mock.js';
import { TRIP_POINT_TYPES } from '../const.js';

const points = [
  {
    id: '1',
    basePrice: 1100,
    dateFrom: '2019-07-10T22:55:56.845Z',
    dateTo: '2019-07-11T11:22:13.375Z',
    destination: '1',
    isFavorite: true,
    offers: ['1', '3'],
    type: 'bus'
  },
  {
    id: '2',
    basePrice: 300,
    dateFrom: '2019-07-10T22:55:56.845Z',
    dateTo: '2019-07-11T11:22:13.375Z',
    destination: '2',
    isFavorite: false,
    offers: ['2', '6', '7'],
    type: 'taxi'
  },
  {
    id: '3',
    basePrice: 500,
    dateFrom: '2019-07-10T22:55:56.845Z',
    dateTo: '2019-07-11T11:22:13.375Z',
    destination: '3',
    isFavorite: false,
    offers: [],
    type: 'train'
  },
];

export { points };
