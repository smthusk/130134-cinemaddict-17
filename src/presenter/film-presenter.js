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
  #scrollPosition = null;

  constructor (filmsContainer, footerContainer, commentsCards, changeData, popupChangeMode) {
    this.#filmsContainer = filmsContainer;
    this.#footerContainer = footerContainer;
    this.#commentsCards = commentsCards;
    this.#changeData = changeData;
    this.#popupChangeMode = popupChangeMode;
  }

  #popupSetHandlers = () => {
    this.#popupComponent.setCloseBtnClickHandler(this.#popupCloseClickHandler);
    this.#popupComponent.setPopupWatchlistClickHandler(this.#watchlistClickHandler);
    this.#popupComponent.setPopupWatchedClickHandler(this.#watchedClickHandler);
    this.#popupComponent.setPopupFavoriteClickHandler(this.#favoriteClickHandler);
    this.#popupComponent.setInnerHandlers();
  };

  #popupCloseClickHandler = () => {
    this.#popupComponent.reset(this.#film);
    this.#popupClose();
    this.#scrollPosition = null;
  };

  #popupCloseEscHandler = (evt) => {
    if (evt.key === 'Escape') {
      this.#popupComponent.reset(this.#film);
      this.#popupClose();
      document.body.removeEventListener('keydown', this.#popupCloseEscHandler);
      this.#scrollPosition = null;
    }
  };

  #popupClose = () => {
    remove(this.#popupComponent);
    document.body.classList.remove('hide-overflow');
    this.#mode = Mode.CLOSED;
  };

  #popupOpen = () => {
    this.#popupComponent = new PopupView(this.#film, this.#commentsCards);

    document.body.addEventListener('keydown', this.#popupCloseEscHandler);
    render(this.#popupComponent, this.#footerContainer, RenderPosition.AFTEREND);
    document.body.classList.add('hide-overflow');
    this.#mode = Mode.OPENED;
    this.#popupSetHandlers();
  };

  #filmCardClickHandler = () => {
    if (this.#mode === Mode.CLOSED) {
      this.#popupChangeMode();
      this.#scrollPosition = null;
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

    if (prevFilmCardComponent === null) {
      render(this.#filmCardComponent, this.#filmsContainer);
      return;
    }

    replace(this.#filmCardComponent, prevFilmCardComponent);

    if (this.#mode === Mode.OPENED) {
      this.#popupComponent = new PopupView(this.#film, this.#commentsCards);
      replace(this.#popupComponent, prevPopupComponent);
      this.#popupComponent.element.scrollTop = this.#scrollPosition;

      this.#popupSetHandlers();
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
    }
  };

  #watchlistClickHandler = () => {
    this.#scrollPosition = this.#popupComponent.element.scrollTop;
    this.#changeData({
      ...this.#film,
      userDetails: {
        ...this.#film.userDetails,
        watchlist: !this.#film.userDetails.watchlist
      }
    });
  };

  #watchedClickHandler = () => {
    this.#scrollPosition = this.#popupComponent.element.scrollTop;
    this.#changeData({
      ...this.#film,
      userDetails: {
        ...this.#film.userDetails,
        alreadyWatched: !this.#film.userDetails.alreadyWatched
      }
    });
  };

  #favoriteClickHandler = () => {
    this.#scrollPosition = this.#popupComponent.element.scrollTop;
    this.#changeData({
      ...this.#film,
      userDetails: {
        ...this.#film.userDetails,
        favorite: !this.#film.userDetails.favorite
      }
    });
  };
}

