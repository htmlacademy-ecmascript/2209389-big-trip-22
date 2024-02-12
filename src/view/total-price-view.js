import AbstractView from '../framework/view/abstract-view.js';
import { calculateTotalPrice } from '../utils.js';

function createTotalPriceTemplate (totalPriceValue) {
  return (
    `<p class="trip-info__cost">
    Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalPriceValue}</span>
    </p>`
  );
}

export default class TotalPriceView extends AbstractView {
  #totalPrice = null;
  constructor(){
    super();
    this.#totalPrice = calculateTotalPrice;
  }


  get template() {
    return createTotalPriceTemplate(this.#totalPrice());
  }
}
