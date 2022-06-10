import {render, RenderPosition, remove} from '../framework/render.js';
import FilmCardView from '../view/film-card-view.js';
import PopupView from '../view/popup-view.js';

export default class filmPresenter {
  #filmsContainer = null;
  #footerContainer = null;
  #filmCardComponent = null;
  #commentsCards = null;
  #popupComponent = null;

  constructor (filmsContainer, footerContainer, commentsCards) {
    this.#filmsContainer = filmsContainer;
    this.#footerContainer = footerContainer;
    this.#commentsCards = commentsCards;
  }

  #popupCloseClickHandler = () => {
    this.#popupClose();
  };

  #popupCloseEscHandler = (evt) => {
    if (evt.key === 'Escape') {
      this.#popupClose();
      document.body.removeEventListener('keydown', this.#popupCloseEscHandler);
    }
  };

  #popupClose = () => {
    remove(this.#popupComponent);
    document.body.classList.remove('hide-overflow');
    this.#popupComponent = null;
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

  init = (film) => {
    this.#filmCardComponent = new FilmCardView(film);
    this.#filmCardComponent.setClickHandler(this.#filmCardClickHandler);
    render(this.#filmCardComponent, this.#filmsContainer);
  };
}

