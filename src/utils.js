import dayjs from 'dayjs';
import { DATE_FORMAT } from './const.js';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);


function humanizeDate(dueDate) {
  return dueDate ? dayjs(dueDate).format(DATE_FORMAT) : '';
}

export { humanizeDate };

