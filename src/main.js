import {render} from './render.js';
import RankView from './view/rank-view.js';
import FilterView from './view/filter-view.js';
import FilmsPresenter from './presenter/films-presenter.js';
import FilmsModel from './model/films-model.js';
import CommentsModel from './model/comments-model.js';

const filmsModel = new FilmsModel();
const commentsModel = new CommentsModel();

const siteHeaderElement = document.querySelector('.header');
const siteFooterElement = document.querySelector('.footer');
const siteMainElement = document.querySelector('.main');
const filmsPresenter = new FilmsPresenter(siteMainElement, siteFooterElement, filmsModel, commentsModel);

render(new RankView(), siteHeaderElement);
render(new FilterView(), siteMainElement);

filmsPresenter.init();
