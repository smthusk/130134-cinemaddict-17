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

const FILMS_COUNT_PER_STEP = 5;
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
  #filmCardComponent = null;
  #popupComponent = null;
  #btnMore = new BtnMoreView();
  #renderedFilmsCount = FILMS_COUNT_PER_STEP;
  #footerContainer = null;
  #siteFilmsContainer = null;
  #siteFilmsRatedContainer = null;
  #siteFilmsCommentedContainer = null;

  #popupClose = () => {
    document.body.removeChild(this.#popupComponent.element);
    this.#popupComponent.removeElement();
    document.body.classList.remove('hide-overflow');
  };

  #popupCloseClickHandler = () => {
    this.#popupClose();
  };

  #popupCloseEscHandler = (evt) => {
    if (evt.key === 'Escape') {
      this.#popupClose();
      document.body.removeEventListener('keydown', this.#popupCloseEscHandler);
    }
  };

  #filmCardClickHandler = (filmItem, footerContainer) => () => {
    this.#popupComponent = new PopupView(filmItem, this.#commentsCards);
    this.#popupComponent.element.querySelector('.film-details__close-btn').addEventListener('click', this.#popupCloseClickHandler);
    document.body.addEventListener('keydown', this.#popupCloseEscHandler);
    render(this.#popupComponent, footerContainer, RenderPosition.AFTEREND);
    document.body.classList.add('hide-overflow');
  };

  #btnMoreClickHandler = (evt) => {
    evt.preventDefault();
    this.#filmsCards
      .slice(this.#renderedFilmsCount, this.#renderedFilmsCount + FILMS_COUNT_PER_STEP)
      .forEach((film) => this.#renderFilm(film, this.#siteFilmsContainer));

    this.#renderedFilmsCount += FILMS_COUNT_PER_STEP;

    if (this.#renderedFilmsCount >= this.#filmsCards.length) {
      this.#btnMore.element.removeEventListener('click', this.#btnMoreClickHandler);
      this.#btnMore.element.remove();
      this.#btnMore.removeElement();
    }
  };

  #renderFilm = (film, filmsContainer) => {
    this.#filmCardComponent = new FilmCardView(film);
    this.#filmCardComponent.element.querySelector('.film-card__link').addEventListener('click', this.#filmCardClickHandler(film, this.#footerContainer));
    render(this.#filmCardComponent, filmsContainer);
  };

  init = (filmsContainer, footerContainer, filmsModel, commentsModel) => {
    this.#filmsContainer = filmsContainer;
    this.#filmsModel = filmsModel;
    this.#filmsCards = [...this.#filmsModel.films];
    this.#commentsModel = commentsModel;
    this.#commentsCards = [...this.#commentsModel.comments];
    this.#footerContainer = footerContainer;

    render(new SortView(), this.#filmsContainer);
    render(this.#filmsMainComponent, this.#filmsContainer);
    render(this.#filmsListComponent, this.#filmsMainComponent.element);
    this.#siteFilmsContainer = this.#filmsListComponent.element.querySelector('.films-list__container');
    for (let i = 0; i < Math.min(this.#filmsCards.length, FILMS_COUNT_PER_STEP); i++) {
      this.#renderFilm(this.#filmsCards[i], this.#siteFilmsContainer);
    }

    if (this.#filmsCards.length > FILMS_COUNT_PER_STEP) {
      render(this.#btnMore, this.#filmsListComponent.element);
      this.#btnMore.element.addEventListener('click', this.#btnMoreClickHandler);
    }

    render(this.#filmsListRatedComponent, this.#filmsMainComponent.element);
    this.#siteFilmsRatedContainer = this.#filmsListRatedComponent.element.querySelector('.films-list__container');
    for (let i = 0; i < 2; i++) {
      this.#renderFilm(this.#filmsCards[i], this.#siteFilmsRatedContainer);
    }

    render(this.#filmsListCommentedComponent, this.#filmsMainComponent.element);
    this.#siteFilmsCommentedContainer = this.#filmsListCommentedComponent.element.querySelector('.films-list__container');
    for (let i = 0; i < 2; i++) {
      this.#renderFilm(this.#filmsCards[i], this.#siteFilmsCommentedContainer);
    }

    render(new FooterView(this.#filmsCards), this.#footerContainer);
  };
}
