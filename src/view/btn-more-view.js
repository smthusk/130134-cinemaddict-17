import AbstractView from '../framework/view/abstract-view.js';

const createBtnMoreTemplate = () => '<button class="films-list__show-more">Show more</button>';

export default class BtnMoreView extends AbstractView {
  get template() {
    return createBtnMoreTemplate();
  }

  setClickHandler = (cb) => {
    this._callback.click = cb;
    this.element.addEventListener('click', this.#clickHandler);
  };

  removeClickHandler = () => {
    this.element.removeEventListener('click', this.#clickHandler);
  };

  #clickHandler = (evt) => {
    evt.preventDefault();
    this._callback.click();
  };
}
