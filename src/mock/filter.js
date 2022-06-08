const filter = {
  'All movies': (films) => films,
  'Watchlist': (films) => films.filter((film) => film.userDetails.watchlist),
  'History': (films) => films.filter((film) => film.userDetails.alreadyWatched),
  'Favorite': (films) => films.filter((film) => film.userDetails.favorite),
};

export const generateFilter = (films) => Object.entries(filter)
  .map(([filterName, filterFilms]) => ({
    'name': filterName,
    'count': filterFilms(films).length
  }));
