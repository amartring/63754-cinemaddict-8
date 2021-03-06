export const Message = {
  LOADING: `Loading moovies…`,
  ERROR: `Something went wrong while loading movies. Check your connection or try again later`,
  FILTER: `Maybe at firs you'll add some films to this list?`,
  SEARCH: `Unable to find any movies on your request`,
  COMMENT_ADD: `Comment added`,
  COMMENT_DELETE: `Comment deleted`,
};

export const KeyCode = {
  ESC: 27,
  ENTER: 13,
};

export const FilterName = {
  all: `All movies`,
  watchlist: `Watchlist`,
  history: `History`,
  favorites: `Favorites`,
};

export const StatsFilterName = {
  all: `all-time`,
  today: `today`,
  week: `week`,
  month: `month`,
  year: `year`,
};

export const Rating = {
  low: {
    count: 10,
    name: `novice`,
  },
  medium: {
    count: 20,
    name: `fan`,
  },
  high: {
    name: `movie buff`,
  },
};

export const DateFormate = {
  STATS: `D MMMM YYYY`,
  POPUP: `DD MMMM YYYY`,
};

export const Method = {
  GET: `GET`,
  POST: `POST`,
  PUT: `PUT`,
  DELETE: `DELETE`
};

export const StatusCode = {
  SUCCESS: 200,
  REDIRECTION: 300,
};

export const URL = `movies`;
export const HIDDEN_CLASS = `visually-hidden`;
export const VISIBLE_FILMS_NUMBER = 5;
export const MS_PER_MINUTE = 60000;
export const AUTHORIZATION = `Basic dXNlckBwYXNzd35yZAo=${Math.random()}`;
export const END_POINT = `https://es8-demo-srv.appspot.com/moowle`;
