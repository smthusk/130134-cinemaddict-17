import AbstractView from '../framework/view/abstract-view.js';

const createFilmsMainTemplate = () => '<section class="films"></section>';

export default class FilmsMainView extends AbstractView {
  get template() {
    return createFilmsMainTemplate();
  }
}
