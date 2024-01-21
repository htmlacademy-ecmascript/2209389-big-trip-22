import { render, replace, remove } from '../framework/render.js';
import PointEditView from '../view/point-edit-view.js';
import PointView from '../view/point-view.js';


export default class PointPresenter {

  #pointListContainer = null;

  #pointComponent = null;
  #pointEditComponent = null;

  #point = null;
  #destinations = null;
  #offers = null;


  constructor ({ pointListContainer }) {
    this.#pointListContainer = pointListContainer;
  }

  init (point, destinations, offers) {
    this.#point = point;
    this.#destinations = destinations;
    this.#offers = offers;

    const prevPointComponent = this.#pointComponent;
    const prevPointEditComponent = this.#pointEditComponent;

    this.#pointComponent = new PointView({
      point: this.#point,
      destinations: this.#destinations,
      offers: this.#offers,
      onRollupButtonClick: this.#handleRollupButtonClick,
    });

    this.#pointEditComponent = new PointEditView({
      point: this.#point,
      destinations: this.#destinations,
      offers: this.#offers,
      onEditFormSubmit: this.#handleFormSubmit,
    });

    if (prevPointComponent === null || prevPointEditComponent === null) {
      render(this.#pointComponent, this.#pointListContainer);
      //здесь можно явно указать return но линтер на него ругается
    }

    if (this.#pointListContainer.contains(prevPointComponent)) {
      replace (this.#pointComponent, prevPointComponent);
    }

    if (this.#pointListContainer.contains(prevPointEditComponent)) {
      replace (this.#pointEditComponent, prevPointEditComponent);
    }

    remove(prevPointComponent);
    remove(prevPointEditComponent);

  }

  destroy() {
    remove(this.#pointComponent);
    remove(this.#pointEditComponent);
  }

  #replacePointToForm() {
    replace (this.#pointEditComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  #replaceFormToPoint() {
    replace(this.#pointComponent, this.#pointEditComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDfault();
      this.#replaceFormToPoint();
    }
  };


  #handleRollupButtonClick = () => {
    this.#replacePointToForm();
  };

  #handleFormSubmit = () => {
    this.#replaceFormToPoint();
  };
}
