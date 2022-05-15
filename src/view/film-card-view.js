import {createElement} from '../render.js';
import dayjs from 'dayjs';
import {humanizeFilmDuration} from '../utils.js';

const createFilmCardTemplate = (film) => {
  const {filmInfo, comments, userDetails} = film;

  const humanizeFilmYear = (dueDate) => dayjs(dueDate).format('YYYY');

  const getGenres = (genre) => genre.join(', ');
  const getDescription = (description) => description.length > 140 ? `${description.slice(0, 139)} ...` : description;

  return `<article class="film-card">
  <a class="film-card__link">
    <h3 class="film-card__title">${filmInfo.title}</h3>
    <p class="film-card__rating">${filmInfo.totalRating}</p>
    <p class="film-card__info">
      <span class="film-card__year">${humanizeFilmYear(filmInfo.release.date)}</span>
      <span class="film-card__duration">${humanizeFilmDuration(filmInfo.runtime)}</span>
      <span class="film-card__genre">${getGenres(filmInfo.genre)}</span>
    </p>
    <img src="${filmInfo.poster}" alt="" class="film-card__poster">
    <p class="film-card__description">${getDescription(filmInfo.description)}</p>
    <span class="film-card__comments">${comments.length} ${comments.length === 1 ? 'comment' : 'comments'}</span>
  </a>
  <div class="film-card__controls">
    <button class="film-card__controls-item film-card__controls-item--add-to-watchlist ${userDetails.watchlist ? 'film-card__controls-item--active' : ''}" type="button">Add to watchlist</button>
    <button class="film-card__controls-item film-card__controls-item--mark-as-watched  ${userDetails.alreadyWatched ? 'film-card__controls-item--active' : ''}" type="button">Mark as watched</button>
    <button class="film-card__controls-item film-card__controls-item--favorite  ${userDetails.favorite ? 'film-card__controls-item--active' : ''}" type="button">Mark as favorite</button>
  </div>
  </article>`;
};

export default class FilmCardView {
  constructor(film) {
    this.film = film;
  }

  getTemplate() {
    return createFilmCardTemplate(this.film);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
