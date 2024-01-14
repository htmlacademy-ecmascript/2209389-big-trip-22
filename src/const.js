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

export { TRIP_POINT_TYPES, DateFormat, FilterType };

