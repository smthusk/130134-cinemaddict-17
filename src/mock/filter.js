import {FilterType} from '../const.js';

const filter = {
  [FilterType.ALL_MOVIES]: (films) => films,
  [FilterType.WATCHLIST]: (films) => films.filter((film) => film.userDetails.watchlist),
  [FilterType.HISTORY]: (films) => films.filter((film) => film.userDetails.alreadyWatched),
  [FilterType.FAVORITE]: (films) => films.filter((film) => film.userDetails.favorite),
};

export const generateFilter = (films) => Object.entries(filter)
  .map(([filterName, filterFilms]) => ({
    'name': filterName,
    'count': filterFilms(films).length
  }));
