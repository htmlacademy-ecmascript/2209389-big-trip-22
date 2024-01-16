import AbstractView from '../framework/view/abstract-view.js';

function createEditListTemplate () {
  return `
  <ul class="trip-events__list">`;
}

export default class EditListView extends AbstractView {
  get template() {
    return createEditListTemplate();
  }
}
