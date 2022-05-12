import {createElement} from '../render.js';

const createFooterTemplate = () => `<section class="footer__statistics">
  <p>130 291 movies inside</p>
</section>`;

export default class FooterView {
  getTemplate() {
    return createFooterTemplate();
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
