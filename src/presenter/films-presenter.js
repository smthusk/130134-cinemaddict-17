import {render} from '../render.js';
import SortView from '../view/sort-view.js';
import FilmsMainView from '../view/films-main-view.js';
import FilmsListView from '../view/films-list-view.js';
import FilmsListRatedView from '../view/films-list-rated-view.js';
import FilmsListCommentedView from '../view/films-list-commented-view.js';
import FilmCardView from '../view/film-card-view.js';
import BtnMoreView from '../view/btn-more-view.js';
import PopupView from '../view/popup-view.js';
import CommentView from '../view/comment-view.js';

export default class FilmsPresenter {
  filmsMainComponent = new FilmsMainView();
  filmsListComponent = new FilmsListView();
  filmsListRatedComponent = new FilmsListRatedView();
  filmsListCommentedComponent = new FilmsListCommentedView();

  init = (filmsContainer, filmsModel) => {
    this.filmsContainer = filmsContainer;
    this.filmsModel = filmsModel;
    this.filmsCards = [...this.filmsModel.getFilms()];

    render(new SortView(), this.filmsContainer);

    render(this.filmsMainComponent, this.filmsContainer);
    render(this.filmsListComponent, this.filmsMainComponent.getElement());
    const siteFilmsContainerElement = this.filmsListComponent.getElement().querySelector('.films-list__container');
    for (let i = 0; i < 10; i++) {
      render(new FilmCardView(this.filmsCards[i]), siteFilmsContainerElement);
    }
    render(new BtnMoreView(), this.filmsListComponent.getElement());

    render(this.filmsListRatedComponent, this.filmsMainComponent.getElement());
    const siteFilmsRatedContainerElement = this.filmsListRatedComponent.getElement().querySelector('.films-list__container');
    for (let i = 0; i < 2; i++) {
      render(new FilmCardView(this.filmsCards[i]), siteFilmsRatedContainerElement);
    }

    render(this.filmsListCommentedComponent, this.filmsMainComponent.getElement());
    const siteFilmsCommentedContainerElement = this.filmsListCommentedComponent.getElement().querySelector('.films-list__container');
    for (let i = 0; i < 2; i++) {
      render(new FilmCardView(this.filmsCards[i]), siteFilmsCommentedContainerElement);
    }
  };

  initPopup = (footerElement, filmsModel, commentsModel) => {
    this.popupComponent = new PopupView(this.filmsCards[0], this.commentsCards);
    this.filmsModel = filmsModel;
    this.filmsCards = [...this.filmsModel.getFilms()];
    this.commentsModel = commentsModel;
    this.commentsCards = [...this.commentsModel.getComments()];

    render(this.popupComponent, footerElement, 'afterend');
    const siteCommentsContainerElement = this.popupComponent.getElement().querySelector('.film-details__comments-list');
    for (const comment of this.commentsCards) {
      render(new CommentView(comment), siteCommentsContainerElement);
    }
  };
}
