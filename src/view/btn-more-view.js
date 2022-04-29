import {createElement} from '../render.js';

const createBtnMoreTemplate = () => '<button class="films-list__show-more">Show more</button>';

export default class BtnMoreView {
  getTemplate() {
    return createBtnMoreTemplate();
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
