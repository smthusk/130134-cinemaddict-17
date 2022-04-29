import {render} from './render.js';
import RankView from './view/rank-view.js';
import FilterView from './view/filter-view.js';
import StatisticsView from './view/statistics-view.js';
import FilmsPresenter from './presenter/films-presenter.js';


const siteHeaderElement = document.querySelector('.header');
const siteFooterElement = document.querySelector('.footer');
const siteMainElement = document.querySelector('.main');
const filmsPresenter = new FilmsPresenter();

render(new RankView(), siteHeaderElement);
render(new StatisticsView(), siteFooterElement);
render(new FilterView(), siteMainElement);

filmsPresenter.init(siteMainElement);
