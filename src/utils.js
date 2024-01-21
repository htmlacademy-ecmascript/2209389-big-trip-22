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

function updatePoint (points, updatedPoint) {
  return points.map((point) => point.id === updatedPoint.id ? updatedPoint : point);
}

export { humanizeDate, calculatePointDuration, updatePoint };

