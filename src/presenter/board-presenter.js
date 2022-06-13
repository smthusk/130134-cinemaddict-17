import {render, remove} from '../framework/render.js';
import SortView from '../view/sort-view.js';
import FilmsMainView from '../view/films-main-view.js';
import FilmsListView from '../view/films-list-view.js';
import FilmsListRatedView from '../view/films-list-rated-view.js';
import FilmsListCommentedView from '../view/films-list-commented-view.js';
import BtnMoreView from '../view/btn-more-view.js';
import FooterView from '../view/footer-view.js';

import NoFilmsView from '../view/no-films-view.js';
import FilmPresenter from './film-presenter.js';

import {updateItem} from '../utils/common.js';
import {sortByDate, sortByRating} from '../utils/film.js';
import {SortType} from '../const.js';

const FILMS_COUNT_PER_STEP = 5;
export default class BoardsPresenter {
  #renderedFilmsCount = FILMS_COUNT_PER_STEP;
  #filmPresenter = new Map();

  #currentSortType = SortType.DEFAULT;
  #sourcedBoardFilms = [];

  #filmsContainer = null;
  #filmsModel = null;
  #filmsCards = null;
  #commentsModel = null;
  #commentsCards = null;
  #footerContainer = null;
  #siteFilmsContainer = null;
  #siteFilmsRatedContainer = null;
  #siteFilmsCommentedContainer = null;

  #filmsMainComponent = new FilmsMainView();
  #filmsListComponent = new FilmsListView();
  #filmsListRatedComponent = new FilmsListRatedView();
  #filmsListCommentedComponent = new FilmsListCommentedView();
  #btnMoreComponent = new BtnMoreView();
  #sortComponent = new SortView();
  #noFilmsComponent = new NoFilmsView();

  constructor(filmsContainer, footerContainer, filmsModel, commentsModel) {
    this.#filmsContainer = filmsContainer;
    this.#footerContainer = footerContainer;
    this.#filmsModel = filmsModel;
    this.#commentsModel = commentsModel;
  }

  init = () => {
    this.#filmsCards = [...this.#filmsModel.films];
    this.#commentsCards = [...this.#commentsModel.comments];
    this.#sourcedBoardFilms = [...this.#filmsModel.films];

    this.#filmsBoard();
  };

  #popupChangeHandler = () => {
    this.#filmPresenter.forEach((presenter) => presenter.resetView());
  };

  #filmChangeHandler = (updatedFilm) => {
    this.#filmsCards = updateItem(this.#filmsCards, updatedFilm);
    this.#sourcedBoardFilms = updateItem(this.#sourcedBoardFilms, updatedFilm);
    this.#filmPresenter.get(updatedFilm.id).init(updatedFilm);
  };

  #btnMoreClickHandler = () => {
    this.#renderFilms(this.#renderedFilmsCount, this.#renderedFilmsCount + FILMS_COUNT_PER_STEP);

    this.#renderedFilmsCount += FILMS_COUNT_PER_STEP;

    if (this.#renderedFilmsCount >= this.#filmsCards.length) {
      remove(this.#btnMoreComponent);
    }
  };

  #renderFilm = (film, filmsContainer) => {
    const filmPresenter = new FilmPresenter(filmsContainer, this.#footerContainer, this.#commentsCards, this.#filmChangeHandler, this.#popupChangeHandler);
    filmPresenter.init(film);
    this.#filmPresenter.set(film.id, filmPresenter);
  };

  #sortFilms = (sortType) => {
    switch (sortType) {
      case SortType.DATE:
        this.#filmsCards.sort(sortByDate);
        break;
      case SortType.RATING:
        this.#filmsCards.sort(sortByRating);
        break;
      default:
        this.#filmsCards = [...this.#sourcedBoardFilms];
    }

    this.#currentSortType = sortType;
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortFilms(sortType);
    this.#clearFilmsList();
    this.#renderFilmsList();
  };

  #renderSort = () => {
    render(this.#sortComponent, this.#filmsContainer);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
  };

  #renderNoFilms = () => {
    render(this.#noFilmsComponent, this.#filmsListComponent.element);
  };

  #renderFooter = () => {
    render(new FooterView(this.#filmsCards), this.#footerContainer);
  };

  #renderBtnMore = () => {
    render(this.#btnMoreComponent, this.#filmsListComponent.element);
    this.#btnMoreComponent.setClickHandler(this.#btnMoreClickHandler);
  };

  #renderFilmsMain = () => {
    render(this.#filmsMainComponent, this.#filmsContainer);
  };

  #renderFilmsContainer = () => {
    render(this.#filmsListComponent, this.#filmsMainComponent.element);
    this.#siteFilmsContainer = this.#filmsListComponent.element.querySelector('.films-list__container');
  };

  #renderFilmsList = () => {
    this.#renderFilms(0, Math.min(this.#filmsCards.length, FILMS_COUNT_PER_STEP));
    if (this.#filmsCards.length > FILMS_COUNT_PER_STEP) {
      this.#renderBtnMore();
    }
  };

  #renderFilms = (from, to) => {
    this.#filmsCards
      .slice(from, to)
      .forEach((film) => this.#renderFilm(film, this.#siteFilmsContainer));
  };

  #clearFilmsList = () => {
    this.#filmPresenter.forEach((presenter) => presenter.destroy());
    this.#filmPresenter.clear();
    this.#renderedFilmsCount = FILMS_COUNT_PER_STEP;
    remove(this.#btnMoreComponent);
  };

  #renderTopRated = () => {
    render(this.#filmsListRatedComponent, this.#filmsMainComponent.element);
    this.#siteFilmsRatedContainer = this.#filmsListRatedComponent.element.querySelector('.films-list__container');
    for (let i = 0; i < 2; i++) {
      this.#renderFilm(this.#filmsCards[i], this.#siteFilmsRatedContainer);
    }
  };

  #renderTopCommented = () => {
    render(this.#filmsListCommentedComponent, this.#filmsMainComponent.element);
    this.#siteFilmsCommentedContainer = this.#filmsListCommentedComponent.element.querySelector('.films-list__container');
    for (let i = 0; i < 2; i++) {
      this.#renderFilm(this.#filmsCards[i], this.#siteFilmsCommentedContainer);
    }
  };

  #filmsBoard = () => {
    if (this.#filmsCards.length === 0) {
      this.#renderFilmsMain();
      this.#renderFilmsContainer();
      this.#renderFilmsList();
      this.#renderNoFilms();
      this.#renderFooter();
      return;
    }

    this.#renderSort();
    this.#renderFilmsMain();
    this.#renderFilmsContainer();
    this.#renderFilmsList();
    this.#renderTopRated();
    this.#renderTopCommented();
    this.#renderFooter();
  };
}
