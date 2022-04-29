import {render} from '../render.js';
import SortView from '../view/sort-view.js';
import FilmsMainView from '../view/films-main-view.js';
import FilmsListView from '../view/films-list-view.js';
import FilmsListRatedView from '../view/films-list-rated-view.js';
import FilmsListCommentedView from '../view/films-list-commented-view.js';
import FilmCardView from '../view/film-card-view.js';
import BtnMoreView from '../view/btn-more-view.js';


export default class FilmsPresenter {
  filmsMainComponent = new FilmsMainView();
  filmsListComponent = new FilmsListView();
  filmsListRatedComponent = new FilmsListRatedView();
  filmsListCommentedComponent = new FilmsListCommentedView();


  init = (filmsContainer) => {
    this.filmsContainer = filmsContainer;

    render(new SortView(), this.filmsContainer);

    render(this.filmsMainComponent, this.filmsContainer);
    render(this.filmsListComponent, this.filmsMainComponent.getElement());
    const siteFilmsContainerElement = this.filmsListComponent.getElement().querySelector('.films-list__container');
    for (let i = 0; i < 5; i++) {
      render(new FilmCardView(), siteFilmsContainerElement);
    }
    render(new BtnMoreView(), this.filmsListComponent.getElement());

    render(this.filmsListRatedComponent, this.filmsMainComponent.getElement());
    const siteFilmsRatedContainerElement = this.filmsListRatedComponent.getElement().querySelector('.films-list__container');
    for (let i = 0; i < 2; i++) {
      render(new FilmCardView(), siteFilmsRatedContainerElement);
    }

    render(this.filmsListCommentedComponent, this.filmsMainComponent.getElement());
    const siteFilmsCommentedContainerElement = this.filmsListCommentedComponent.getElement().querySelector('.films-list__container');
    for (let i = 0; i < 2; i++) {
      render(new FilmCardView(), siteFilmsCommentedContainerElement);
    }

  };
}
