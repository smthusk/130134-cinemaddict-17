import {createElement} from '../render.js';

const createFilmsListCommentedTemplate = () => (`<section class="films-list films-list--extra">
  <h2 class="films-list__title">Most commented</h2>
  <div class="films-list__container"></div>
  </section>`);

export default class FilmsListCommentedView {
  getTemplate() {
    return createFilmsListCommentedTemplate();
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
