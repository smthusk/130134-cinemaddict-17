import AbstractView from '../framework/view/abstract-view.js';
import {FilterType} from '../const.js';

const createFilterItemTemplate = (filter, isChecked) => {
  const isActive = isChecked ? 'main-navigation__item--active' : '';
  if (filter.name === FilterType.ALL_MOVIES) {
    return (
      `<a href="#all" class="main-navigation__item ${isActive}">
        All movies
      </a>`
    );
  }

  return (
    `<a href="#${filter.name}" class="main-navigation__item ${isActive}">
      ${filter.name} <span class="main-navigation__item-count">${filter.count}</span>
    </a>`
  );
};

const createFilterTemplate = (filter) => {
  const filterItems = filter.map((filterItem, index) => createFilterItemTemplate(filterItem, index === 0)).join('');

  return (
    `<nav class="main-navigation">
      ${filterItems}
    </nav>`
  );
};

export default class FilterView extends AbstractView {
  #filter = null;

  constructor(filter) {
    super();
    this.#filter = filter;
  }

  get template() {
    return createFilterTemplate(this.#filter);
  }
}
