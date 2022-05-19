import {createElement} from '../render.js';

const createFilmsListRatedTemplate = () => (`<section class="films-list films-list--extra">
  <h2 class="films-list__title">Top rated</h2>
  <div class="films-list__container"></div>
  </section>`);

export default class FilmsListRatedView {
  #element = null;

  get template() {
    return createFilmsListRatedTemplate();
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
