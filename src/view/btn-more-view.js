import AbstractView from '../framework/view/abstract-view.js';

const createBtnMoreTemplate = () => '<button class="films-list__show-more">Show more</button>';

export default class BtnMoreView extends AbstractView {
  get template() {
    return createBtnMoreTemplate();
  }
}
