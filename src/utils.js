import dayjs from 'dayjs';
import { DATE_FORMAT } from './const.js';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);


//const oneMinuteAgo = dayjs().subtract(1, 'minute');
//const dur = dayjs.duration(dayjs().diff(oneMinuteAgo));

//dayjs.utc(dur.asMilliseconds()).format('HH:mm:ss'); // "00:01:00"


function humanizeDate(dueDate) {
  return dueDate ? dayjs(dueDate).format(DATE_FORMAT) : '';
}

export { humanizeDate };

