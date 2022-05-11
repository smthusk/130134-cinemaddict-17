import {createElement} from '../render.js';
import dayjs from 'dayjs';

const createFilmCardTemplate = (film) => {
  const {film_info, comments, user_details} = film;

  const humanizeFilmYear = (dueDate) => dayjs(dueDate).format('YYYY');
  const humanizeFilmDuration = (runtime) => {
    const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;

    return `${hours}h ${minutes}m`;
  };
  const getGenres = (genre) => genre.join(', ');
  const getDescription = (descr) => descr.length > 140 ? descr.slice(0, 139) + '...' : descr;

  return `<article class="film-card">
  <a class="film-card__link">
    <h3 class="film-card__title">${film_info.title}</h3>
    <p class="film-card__rating">${film_info.total_rating}</p>
    <p class="film-card__info">
      <span class="film-card__year">${humanizeFilmYear(film_info.release.date)}</span>
      <span class="film-card__duration">${humanizeFilmDuration(film_info.runtime)}</span>
      <span class="film-card__genre">${getGenres(film_info.genre)}</span>
    </p>
    <img src="${film_info.poster}" alt="" class="film-card__poster">
    <p class="film-card__description">${getDescription(film_info.description)}</p>
    <span class="film-card__comments">${comments.length} ${comments.length === 1 ? `comment` : `comments`}</span>
  </a>
  <div class="film-card__controls">
    <button class="film-card__controls-item film-card__controls-item--add-to-watchlist ${user_details.watchlist ? 'film-card__controls-item--active' : ''}" type="button">Add to watchlist</button>
    <button class="film-card__controls-item film-card__controls-item--mark-as-watched  ${user_details.already_watched ? 'film-card__controls-item--active' : ''}" type="button">Mark as watched</button>
    <button class="film-card__controls-item film-card__controls-item--favorite  ${user_details.favorite ? 'film-card__controls-item--active' : ''}" type="button">Mark as favorite</button>
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
