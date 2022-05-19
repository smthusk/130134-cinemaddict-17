import {createElement} from '../render.js';

const createFilmsMainTemplate = () => '<section class="films"></section>';

export default class FilmsMainView {
  #element = null;

  get template() {
    return createFilmsMainTemplate();
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
