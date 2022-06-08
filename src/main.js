import {render} from './framework/render.js';
import RankView from './view/rank-view.js';
import FilterView from './view/filter-view.js';
import FilmsPresenter from './presenter/films-presenter.js';
import FilmsModel from './model/films-model.js';
import CommentsModel from './model/comments-model.js';
import {generateFilter} from './mock/filter.js';

const filmsModel = new FilmsModel();
const commentsModel = new CommentsModel();

const filter = generateFilter(filmsModel.films);

const siteHeaderElement = document.querySelector('.header');
const siteFooterElement = document.querySelector('.footer');
const siteMainElement = document.querySelector('.main');
const filmsPresenter = new FilmsPresenter(siteMainElement, siteFooterElement, filmsModel, commentsModel);

render(new RankView(), siteHeaderElement);
render(new FilterView(filter), siteMainElement);

filmsPresenter.init();
