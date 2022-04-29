import {createElement} from '../render.js';

export default class StatisticsView {
  getTemplate() {
    return `<section class="footer__statistics">
    <p>130 291 movies inside</p>
  </section>`;
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
