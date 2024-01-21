import { nanoid } from 'nanoid';

const points = [
  {
    id: nanoid(),
    basePrice: 1100,
    dateFrom: '2021-01-01T11:01:56.845Z',
    dateTo: '2021-01-01T11:21:13.375Z',
    destination: '1',
    isFavorite: true,
    offers: ['1', '3'],
    type: 'bus'
  },
  {
    id: nanoid(),
    basePrice: 300,
    dateFrom: '2022-02-02T12:55:56.845Z',
    dateTo: '2022-02-03T13:22:13.375Z',
    destination: '2',
    isFavorite: false,
    offers: ['2', '6', '7'],
    type: 'taxi'
  },
  {
    id: nanoid(),
    basePrice: 500,
    dateFrom: '2023-03-22T03:55:56.845Z',
    dateTo: '2023-03-29T04:03:13.375Z',
    destination: '3',
    isFavorite: false,
    offers: [],
    type: 'train'
  },
];

export { points };
