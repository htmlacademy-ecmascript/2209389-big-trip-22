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

function sortPointsByPrice (pointA, pointB) {
  return pointB.basePrice - pointA.basePrice;
}

function sortPointsByTime (pointA, pointB) {
  const durationA = dayjs(pointA.dateTo).diff(pointA.dateFrom);
  const durationB = dayjs(pointB.dateTo).diff(pointB.dateFrom);
  return durationB - durationA;
}

function sortPointsByDay (pointA, pointB) {
  return dayjs(pointA.dateFrom) - dayjs(pointB.dateFrom);
}

export { humanizeDate, calculatePointDuration, sortPointsByPrice, sortPointsByTime, sortPointsByDay };

