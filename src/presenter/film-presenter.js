import {render, RenderPosition, replace, remove} from '../framework/render.js';
import FilmCardView from '../view/film-card-view.js';
import PopupView from '../view/popup-view.js';

const Mode = {
  CLOSED: 'CLOSED',
  OPENED: 'OPENED',
};

export default class FilmPresenter {
  #filmsContainer = null;
  #footerContainer = null;
  #filmCardComponent = null;
  #commentsCards = null;
  #popupComponent = null;
  #changeData = null;
  #film = null;
  #popupChangeMode = null;
  #mode = Mode.CLOSED;

  constructor (filmsContainer, footerContainer, commentsCards, changeData, popupChangeMode) {
    this.#filmsContainer = filmsContainer;
    this.#footerContainer = footerContainer;
    this.#commentsCards = commentsCards;
    this.#changeData = changeData;
    this.#popupChangeMode = popupChangeMode;
  }

  #popupCloseClickHandler = () => {
    this.#popupComponent.reset(this.#film);
    this.#popupClose();
  };

  #popupCloseEscHandler = (evt) => {
    if (evt.key === 'Escape') {
      this.#popupComponent.reset(this.#film);
      this.#popupClose();
      document.body.removeEventListener('keydown', this.#popupCloseEscHandler);
    }
  };

  #popupClose = () => {
    remove(this.#popupComponent);
    document.body.classList.remove('hide-overflow');
    this.#mode = Mode.CLOSED;
  };

  #popupOpen = () => {
    this.#popupComponent.setCloseClickHandler(this.#popupCloseClickHandler);
    this.#popupComponent.setPopupWatchlistClickHandler(this.#watchlistClickHandler);
    this.#popupComponent.setPopupWatchedClickHandler(this.#watchedClickHandler);
    this.#popupComponent.setPopupFavoriteClickHandler(this.#favoriteClickHandler);

    document.body.addEventListener('keydown', this.#popupCloseEscHandler);
    render(this.#popupComponent, this.#footerContainer, RenderPosition.AFTEREND);
    document.body.classList.add('hide-overflow');
    this.#mode = Mode.OPENED;
  };

  #filmCardClickHandler = () => {
    if (this.#mode === Mode.CLOSED) {
      this.#popupChangeMode();
      this.#popupOpen();
    }
  };

  init = (film) => {
    this.#film = film;
    const prevFilmCardComponent = this.#filmCardComponent;
    const prevPopupComponent = this.#popupComponent;

    this.#filmCardComponent = new FilmCardView(film);
    this.#filmCardComponent.setClickHandler(this.#filmCardClickHandler);
    this.#filmCardComponent.setWatchlistClickHandler(this.#watchlistClickHandler);
    this.#filmCardComponent.setWatchedClickHandler(this.#watchedClickHandler);
    this.#filmCardComponent.setFavoriteClickHandler(this.#favoriteClickHandler);

    this.#popupComponent = new PopupView(film, this.#commentsCards);

    if (prevFilmCardComponent === null) {
      render(this.#filmCardComponent, this.#filmsContainer);
      return;
    }

    replace(this.#filmCardComponent, prevFilmCardComponent);

    if (this.#mode === Mode.OPENED) {
      replace(this.#popupComponent, prevPopupComponent);
      this.#popupOpen();
    }

    remove(prevFilmCardComponent);
    remove(prevPopupComponent);
  };

  destroy = () => {
    remove(this.#filmCardComponent);
    remove(this.#popupComponent);
  };

  resetView = () => {
    if (this.#mode !== Mode.CLOSED) {
      this.#popupComponent.reset(this.#film);
      this.#popupClose();
    }
  };

  #watchlistClickHandler = () => {
    this.#film.userDetails.watchlist = !this.#film.userDetails.watchlist;
    this.#changeData(this.#film);
  };

  #watchedClickHandler = () => {
    this.#film.userDetails.alreadyWatched = !this.#film.userDetails.alreadyWatched;
    this.#changeData(this.#film);
  };

  #favoriteClickHandler = () => {
    this.#film.userDetails.favorite = !this.#film.userDetails.favorite;
    this.#changeData(this.#film);
  };
}

