import {FilterName} from './constants.js';

export const filterFilms = (data, filterName) => {
  let filteredFilms = data;
  switch (filterName) {
    case FilterName.all:
      filteredFilms = data;
      break;

    case FilterName.watchlist:
      filteredFilms = data.filter((it) => it.isOnWatchlist);
      break;

    case FilterName.history:
      filteredFilms = data.filter((it) => it.isWatched);
      break;

    case FilterName.favorites:
      filteredFilms = data.filter((it) => it.isFavorite);
      break;
  }
  return filteredFilms;
};
