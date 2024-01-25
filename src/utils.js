import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc.js';
import { DateFormat } from './const.js';

dayjs.extend(utc);

function humanizeDate(date, dateFormat) {
  return date ? dayjs.utc(date).format(dateFormat) : '';
}

function calculatePointDuration(dateEnd, dateStart) {
  const totalData = `${humanizeDate((dayjs(dateEnd).diff(dayjs(dateStart))), DateFormat.DAYS)}D
  ${humanizeDate((dayjs(dateEnd).diff(dayjs(dateStart))), DateFormat.HOURS)}H
  ${humanizeDate((dayjs(dateEnd).diff(dayjs(dateStart))), DateFormat.MINUTES)}M`;
  return totalData;
}

function updateItem (items, update) {
  return items.map((item) => item.id === update.id ? update : item);
}

function sortPointsByPrice (eventA, eventB) {
  return eventB.basePrice - eventA.basePrice;
}

function sortPointsByTime (eventA, eventB) {
  const durationA = dayjs(eventA.dateTo).diff(eventA.dateFrom);
  const durationB = dayjs(eventB.dateTo).diff(eventB.dateFrom);
  return durationB - durationA;
}

export { humanizeDate, calculatePointDuration, updateItem, sortPointsByPrice, sortPointsByTime };

