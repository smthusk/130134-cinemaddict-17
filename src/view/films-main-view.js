import {createElement} from '../render.js';

export default class FilmsMainView {
  getTemplate() {
    return '<section class="films"></section>';
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
