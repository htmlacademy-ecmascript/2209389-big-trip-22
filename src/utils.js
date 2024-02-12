import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc.js';
import { DateFormat } from './const.js';

dayjs.extend(utc);

function humanizeDate(date, dateFormat) {
  return date ? dayjs.utc(date).format(dateFormat) : '';
}


const getMinData = (items) => {
  const minDate = items.reduce((min, item) => dayjs(item.dateFrom).isBefore(min) ? dayjs(item.dateFrom) : min, dayjs());
  return humanizeDate(minDate, DateFormat.DAY_MONTH);
};

const getMaxData = (items) => {
  const maxDate = items.reduce((max, item) => dayjs(item.dateTo).isAfter(max) ? dayjs(item.dateTo) : max, dayjs('1970-01-01'));
  return humanizeDate(maxDate, DateFormat.DAY_MONTH);
};


function calculatePointDuration(dateEnd, dateStart) {
  const durationInMinutes = dayjs(dateEnd).diff(dayjs(dateStart), DateFormat.MINUTE_DAY_JS);

  const days = Math.floor(durationInMinutes / DateFormat.MINUTES_IN_DAY);
  const hours = Math.floor((durationInMinutes % DateFormat.MINUTES_IN_DAY) / DateFormat.MINUTES_IN_HOUR);
  const minutes = durationInMinutes % DateFormat.MINUTES_IN_HOUR;

  return `${days}D ${hours}H ${minutes}M`;
}

function calculateTotalPrice () {

  const nodeList = document.querySelectorAll('.event__price-value');
  const resultString = [];
  nodeList.forEach((node) => resultString.push(node.innerText));
  const parsedResult = resultString.map((string) => parseInt(string, 10));
  const summurize = parsedResult.reduce((accumulator, currentValue) => accumulator + currentValue);
  return summurize;
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

export { humanizeDate, calculatePointDuration, sortPointsByPrice, sortPointsByTime, sortPointsByDay, calculateTotalPrice, getMaxData, getMinData };

