import {render, RenderPosition} from '../render.js';
import SortView from '../view/sort-view.js';
import FilmsMainView from '../view/films-main-view.js';
import FilmsListView from '../view/films-list-view.js';
import FilmsListRatedView from '../view/films-list-rated-view.js';
import FilmsListCommentedView from '../view/films-list-commented-view.js';
import FilmCardView from '../view/film-card-view.js';
import BtnMoreView from '../view/btn-more-view.js';
import FooterView from '../view/footer-view.js';
import PopupView from '../view/popup-view.js';

export default class FilmsPresenter {
  #filmsMainComponent = new FilmsMainView();
  #filmsListComponent = new FilmsListView();
  #filmsListRatedComponent = new FilmsListRatedView();
  #filmsListCommentedComponent = new FilmsListCommentedView();
  #filmsContainer = null;
  #filmsModel = null;
  #filmsCards = null;
  #commentsModel = null;
  #commentsCards = null;
  #popupComponent = null;

  init = (filmsContainer, footerContainer, filmsModel, commentsModel) => {
    this.#filmsContainer = filmsContainer;
    this.#filmsModel = filmsModel;
    this.#filmsCards = [...this.#filmsModel.films];
    this.#commentsModel = commentsModel;
    this.#commentsCards = [...this.#commentsModel.comments];
    this.#popupComponent = new PopupView(this.#filmsCards[0], this.#commentsCards);

    render(new SortView(), this.#filmsContainer);

    render(this.#filmsMainComponent, this.#filmsContainer);
    render(this.#filmsListComponent, this.#filmsMainComponent.element);
    const siteFilmsContainerElement = this.#filmsListComponent.element.querySelector('.films-list__container');
    for (const film of this.#filmsCards) {
      render(new FilmCardView(film), siteFilmsContainerElement);
    }
    render(new BtnMoreView(), this.#filmsListComponent.element);

    render(this.#filmsListRatedComponent, this.#filmsMainComponent.element);
    const siteFilmsRatedContainerElement = this.#filmsListRatedComponent.element.querySelector('.films-list__container');
    for (let i = 0; i < 2; i++) {
      render(new FilmCardView(this.#filmsCards[i]), siteFilmsRatedContainerElement);
    }

    render(this.#filmsListCommentedComponent, this.#filmsMainComponent.element);
    const siteFilmsCommentedContainerElement = this.#filmsListCommentedComponent.element.querySelector('.films-list__container');
    for (let i = 0; i < 2; i++) {
      render(new FilmCardView(this.#filmsCards[i]), siteFilmsCommentedContainerElement);
    }

    render(new FooterView(this.#filmsCards), footerContainer);

    render(this.#popupComponent, footerContainer, RenderPosition.AFTEREND);
  };
}
