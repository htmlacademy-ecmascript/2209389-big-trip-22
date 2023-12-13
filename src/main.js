import SortView from './view/sort-veiw.js';
import { render } from './render.js';

const siteMainElement = document.querySelector('.page-main');
const siteHeaderElement = siteMainElement.querySelector('.trip-events');

render (new SortView(), siteHeaderElement);
