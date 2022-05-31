import {createElement} from '../render.js';

const createFooterTemplate = (films) => `<section class="footer__statistics">
  <p>${films.length} movies inside</p>
</section>`;

export default class FooterView {
  #element = null;
  #films = null;

  constructor(films) {
    this.#films = films;
  }

  get template() {
    return createFooterTemplate(this.#films);
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
