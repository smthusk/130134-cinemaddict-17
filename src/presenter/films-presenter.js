import {render, RenderPosition} from '../framework/render.js';
import SortView from '../view/sort-view.js';
import FilmsMainView from '../view/films-main-view.js';
import FilmsListView from '../view/films-list-view.js';
import FilmsListRatedView from '../view/films-list-rated-view.js';
import FilmsListCommentedView from '../view/films-list-commented-view.js';
import FilmCardView from '../view/film-card-view.js';
import BtnMoreView from '../view/btn-more-view.js';
import FooterView from '../view/footer-view.js';
import PopupView from '../view/popup-view.js';
import NoFilmsView from '../view/no-films-view.js';

const FILMS_COUNT_PER_STEP = 5;
export default class FilmsPresenter {
  #renderedFilmsCount = FILMS_COUNT_PER_STEP;

  #filmsMainComponent = new FilmsMainView();
  #filmsListComponent = new FilmsListView();
  #filmsListRatedComponent = new FilmsListRatedView();
  #filmsListCommentedComponent = new FilmsListCommentedView();
  #btnMore = new BtnMoreView();

  #filmsContainer = null;
  #filmsModel = null;
  #filmsCards = null;
  #commentsModel = null;
  #commentsCards = null;
  #filmCardComponent = null;
  #popupComponent = null;
  #footerContainer = null;
  #siteFilmsContainer = null;
  #siteFilmsRatedContainer = null;
  #siteFilmsCommentedContainer = null;

  constructor(filmsContainer, footerContainer, filmsModel, commentsModel) {
    this.#filmsContainer = filmsContainer;
    this.#footerContainer = footerContainer;
    this.#filmsModel = filmsModel;
    this.#commentsModel = commentsModel;
  }

  #popupClose = () => {
    document.body.removeChild(this.#popupComponent.element);
    this.#popupComponent.removeElement();
    this.#popupComponent = null;
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

  #popupOpen = (filmItem) => {
    this.#popupComponent = new PopupView(filmItem, this.#commentsCards);
    this.#popupComponent.setClickHandler(this.#popupCloseClickHandler);
    document.body.addEventListener('keydown', this.#popupCloseEscHandler);
    render(this.#popupComponent, this.#footerContainer, RenderPosition.AFTEREND);
    document.body.classList.add('hide-overflow');
  };

  #filmCardClickHandler = (filmItem) => {
    if (!this.#popupComponent) {
      this.#popupOpen(filmItem);
      return;
    }
    this.#popupClose();
    this.#popupOpen(filmItem);
  };

  #btnMoreClickHandler = () => {
    this.#filmsCards
      .slice(this.#renderedFilmsCount, this.#renderedFilmsCount + FILMS_COUNT_PER_STEP)
      .forEach((film) => this.#renderFilm(film, this.#siteFilmsContainer));

    this.#renderedFilmsCount += FILMS_COUNT_PER_STEP;

    if (this.#renderedFilmsCount >= this.#filmsCards.length) {
      this.#btnMore.removeClickHandler();
      this.#btnMore.element.remove();
      this.#btnMore.removeElement();
    }
  };

  #renderFilm = (film, filmsContainer) => {
    this.#filmCardComponent = new FilmCardView(film);
    this.#filmCardComponent.setClickHandler(this.#filmCardClickHandler);
    render(this.#filmCardComponent, filmsContainer);
  };

  init = () => {
    this.#filmsCards = [...this.#filmsModel.films];
    this.#commentsCards = [...this.#commentsModel.comments];

    this.#renderFilms();
  };

  #renderFilms = () => {
    if (this.#filmsCards.length === 0) {
      render(this.#filmsMainComponent, this.#filmsContainer);
      render(this.#filmsListComponent, this.#filmsMainComponent.element);
      render(new NoFilmsView(), this.#filmsListComponent.element);
      render(new FooterView(this.#filmsCards), this.#footerContainer);
      return;
    }

    render(new SortView(), this.#filmsContainer);
    render(this.#filmsMainComponent, this.#filmsContainer);
    render(this.#filmsListComponent, this.#filmsMainComponent.element);
    this.#siteFilmsContainer = this.#filmsListComponent.element.querySelector('.films-list__container');
    for (let i = 0; i < Math.min(this.#filmsCards.length, FILMS_COUNT_PER_STEP); i++) {
      this.#renderFilm(this.#filmsCards[i], this.#siteFilmsContainer);
    }

    if (this.#filmsCards.length > FILMS_COUNT_PER_STEP) {
      render(this.#btnMore, this.#filmsListComponent.element);
      this.#btnMore.setClickHandler(this.#btnMoreClickHandler);
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
