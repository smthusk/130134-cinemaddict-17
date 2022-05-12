import {createElement} from '../render.js';

const createFooterTemplate = (films) => `<section class="footer__statistics">
  <p>${films.length} movies inside</p>
</section>`;

export default class FooterView {
  constructor(films) {
    this.films = films;
  }

  getTemplate() {
    return createFooterTemplate(this.films);
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
