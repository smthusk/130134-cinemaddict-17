import { generateFilm } from '../mock/film.js';

export default class FilmsModel {
  #films = Array.from({length: 22}, generateFilm);

  get films() {
    return this.#films;
  }
}
