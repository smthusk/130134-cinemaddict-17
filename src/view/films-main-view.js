import {createElement} from '../render.js';

const createFilmsMainTemplate = () => '<section class="films"></section>';

export default class FilmsMainView {
  getTemplate() {
    return createFilmsMainTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
