import {FilterName} from './constants';

export const filterFilms = (data, filterName) => {
  switch (filterName) {
    case FilterName.all:
      return data;

    case FilterName.watchlist:
      return data.filter((it) => it.isOnWatchlist);

    case FilterName.history:
      return data.filter((it) => it.isWatched);

    case FilterName.favorites:
      return data.filter((it) => it.isFavorite);
  }
  return data;
};

export const searchFilms = (data, request) => data.filter((it) => it.title.toLowerCase().includes(request.toLowerCase()));
