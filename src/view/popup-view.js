import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import {humanizeFilmDuration, humanizeCommentDate, humanizeFilmReleaseDate} from '../utils/film.js';

const createCommentTemplate = (commentsIdList, comments) => {
  if (commentsIdList?.length) {
    return commentsIdList
      .map((commentId) => comments.find((comment) => comment.id === commentId))
      .map((commentElement) => (`<li class="film-details__comment">
        <span class="film-details__comment-emoji">
          <img src="./images/emoji/${commentElement.emotion}.png" width="55" height="55" alt="emoji-${commentElement.emotion}">
        </span>
        <div>
          <p class="film-details__comment-text">${commentElement.comment}</p>
          <p class="film-details__comment-info">
            <span class="film-details__comment-author">${commentElement.author}</span>
            <span class="film-details__comment-day">${humanizeCommentDate(commentElement.date)}</span>
            <button class="film-details__comment-delete">Delete</button>
          </p>
        </div>
      </li>`)).join('');
  }
  return '';
};

const createEmojiTemplate = (emoji) => `<img src="images/emoji/${emoji}.png" width="55" height="55" alt="emoji-${emoji}"></img>`;

const createGenresTemplate = (genre) => genre.map((el) => `<span class="film-details__genre">${el}</span>`).join('');
const getWriters = (writers) => writers.join(', ');
const getActors = (actors) => actors.join(', ');

const createPopupTemplate = (film, commentsList) => {
  const {filmInfo, comments, userDetails, emoji} = film;

  return `<section class="film-details">
    <form class="film-details__inner" action="" method="get">
      <div class="film-details__top-container">
        <div class="film-details__close">
          <button class="film-details__close-btn" type="button">close</button>
        </div>
        <div class="film-details__info-wrap">
          <div class="film-details__poster">
            <img class="film-details__poster-img" src="${filmInfo.poster}" alt="">

            <p class="film-details__age">${filmInfo.ageRating}+</p>
          </div>

          <div class="film-details__info">
            <div class="film-details__info-head">
              <div class="film-details__title-wrap">
                <h3 class="film-details__title">${filmInfo.title}</h3>
                <p class="film-details__title-original">Original: ${filmInfo.alternativeTitle}</p>
              </div>

              <div class="film-details__rating">
                <p class="film-details__total-rating">${filmInfo.totalRating}</p>
              </div>
            </div>

            <table class="film-details__table">
              <tr class="film-details__row">
                <td class="film-details__term">Director</td>
                <td class="film-details__cell">${filmInfo.director}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Writers</td>
                <td class="film-details__cell">${getWriters(filmInfo.writers)}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Actors</td>
                <td class="film-details__cell">${getActors(filmInfo.actors)}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Release Date</td>
                <td class="film-details__cell">${humanizeFilmReleaseDate(filmInfo.release.date)}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Runtime</td>
                <td class="film-details__cell">${humanizeFilmDuration(filmInfo.runtime)}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Country</td>
                <td class="film-details__cell">${filmInfo.release.releaseCountry}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Genres</td>
                <td class="film-details__cell">
                  ${createGenresTemplate(filmInfo.genre)}
                </td>
              </tr>
            </table>

            <p class="film-details__film-description">${filmInfo.description}</p>
          </div>
        </div>

        <section class="film-details__controls">
          <button type="button" class="film-details__control-button film-details__control-button--watchlist  ${userDetails.watchlist ? 'film-details__control-button--active' : ''}" id="watchlist" name="watchlist">Add to watchlist</button>
          <button type="button" class="film-details__control-button film-details__control-button--watched  ${userDetails.alreadyWatched ? 'film-details__control-button--active' : ''}" id="watched" name="watched">Already watched</button>
          <button type="button" class="film-details__control-button film-details__control-button--favorite  ${userDetails.favorite ? 'film-details__control-button--active' : ''}" id="favorite" name="favorite">Add to favorites</button>
        </section>
      </div>

      <div class="film-details__bottom-container">
        <section class="film-details__comments-wrap">
          <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>

          <ul class="film-details__comments-list">${createCommentTemplate(comments, commentsList)}</ul>

          <div class="film-details__new-comment">
            <div class="film-details__add-emoji-label">${emoji ? createEmojiTemplate(emoji) : ''}</div>
            <label class="film-details__comment-label">
              <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
            </label>

            <div class="film-details__emoji-list">
              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
              <label class="film-details__emoji-label" for="emoji-smile">
                <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
              </label>

              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
              <label class="film-details__emoji-label" for="emoji-sleeping">
                <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
              </label>

              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
              <label class="film-details__emoji-label" for="emoji-puke">
                <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
              </label>

              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
              <label class="film-details__emoji-label" for="emoji-angry">
                <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
              </label>
            </div>
          </div>
        </section>
      </div>
    </form>
  </section>`;
};

export default class PopupView extends AbstractStatefulView {

  #comments = null;

  constructor(film, comments) {
    super();
    this._state = PopupView.parsePopupToState(film);
    this.#comments = comments;

    this.setInnerHandlers();

  }

  get template() {
    return createPopupTemplate(this._state, this.#comments);
  }

  setCloseBtnClickHandler = (cb) => {
    this._callback.closeBtnClick = cb;
    this.element.querySelector('.film-details__close-btn').addEventListener('click', this.#closeBtnClickHandler);
  };

  #closeBtnClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.closeBtnClick(this._state);
  };

  setPopupWatchlistClickHandler = (cb) => {
    this._callback.popupWatchlistClick = cb;
    this.element.querySelector('.film-details__control-button--watchlist').addEventListener('click', this.#popupWatchlistClickHandler);
  };

  setPopupWatchedClickHandler = (cb) => {
    this._callback.popupWatchedClick = cb;
    this.element.querySelector('.film-details__control-button--watched').addEventListener('click', this.#popupWatchedClickHandler);
  };

  setPopupFavoriteClickHandler = (cb) => {
    this._callback.popupFavoriteClick = cb;
    this.element.querySelector('.film-details__control-button--favorite').addEventListener('click', this.#popupFavoriteClickHandler);
  };

  #popupWatchlistClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.popupWatchlistClick();
  };

  #popupWatchedClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.popupWatchedClick();
  };

  #popupFavoriteClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.popupFavoriteClick();
  };

  #setScrollPosition = () => {
    this.element.scrollTop = this._state.scrollPos;
  };

  #emojiClickHandler = (evt) => {
    this.updateElement({
      emoji: evt.target.value,
      scrollPos: this.element.scrollTop,
    });
    this.element.querySelector(`#${evt.target.id}`).checked = true;
    this.#setScrollPosition();
  };

  setInnerHandlers = () => {
    this.element.querySelector('.film-details__emoji-list').addEventListener('change', this.#emojiClickHandler);
  };

  reset = (film) => {
    this.updateElement(
      PopupView.parsePopupToState(film),
    );
  };

  _restoreHandlers = () => {
    this.setInnerHandlers();
    this.setCloseBtnClickHandler(this._callback.closeBtnClick);
    this.setPopupWatchlistClickHandler(this._callback.popupWatchlistClick);
    this.setPopupWatchedClickHandler(this._callback.popupWatchedClick);
    this.setPopupFavoriteClickHandler(this._callback.popupFavoriteClick);
  };

  static parsePopupToState = (film) => ({...film,
    emojiId: null,
    emoji: null,
    scrollPos: null,
  });

  static parseStateToPopup = (state) => {
    const film = {...state};

    delete film.emojiId;
    delete film.emoji;
    delete film.scrollPos;

    return film;
  };
}
