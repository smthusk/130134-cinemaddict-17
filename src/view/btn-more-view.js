import {createElement} from '../render.js';

const createBtnMoreTemplate = () => '<button class="films-list__show-more">Show more</button>';

export default class BtnMoreView {
  #element = null;

  get template() {
    return createBtnMoreTemplate();
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
