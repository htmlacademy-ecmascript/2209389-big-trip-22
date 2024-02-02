const TRIP_POINT_TYPES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

const DateFormat = {
  MONTH_DAY: 'MMM D',
  HOURS_MINUTES: 'HH:mm',
  DAYS: 'DD',
  HOURS: 'HH',
  MINUTES: 'mm',
  YEAR_MONTH_DAY: 'DD/MM/YY HH:mm',
};

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past'
};

const SortType = {
  DAY: 'day',
  TIME: 'time',
  PRICE: 'price',
};

const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
};

const ApiMethod = {
  GET: 'GET',
  PUT: 'PUT',
};

const BaseUrl = {
  POINTS: 'points',
  DESTINATIONS: 'destinations',
  OFFERS: 'offers',
};

export { TRIP_POINT_TYPES, DateFormat, FilterType, SortType, UserAction, UpdateType, ApiMethod, BaseUrl };

