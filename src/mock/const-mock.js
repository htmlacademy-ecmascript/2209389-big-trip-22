import { TRIP_POINT_TYPES } from '../const.js';

const emptyPoint = {
  basePrice: '',
  dateFrom: '',
  dateTo: '',
  destination: '',
  isFavorite: false,
  offers: [],
  type: '',
};

const emptyDestinations = [
  {
    id: '',
    description: '',
    name: '',
    pictures: [

    ]
  }
];

const emptyOffers = [ {
  type: '',
  offers: [
    {
      id: '',
      title: '',
      price: ''
    }
  ]
}
];

export {emptyPoint, emptyDestinations, emptyOffers };
