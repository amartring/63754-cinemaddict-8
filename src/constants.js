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

export const Rating = {
  low: {
    minCount: 1,
    maxCount: 10,
    name: `novice`,
  },
  medium: {
    minCount: 11,
    maxCount: 20,
    name: `fan`,
  },
  high: {
    minCount: 21,
    name: `movie buff`,
  },
};

export const HIDDEN_CLASS = `visually-hidden`;

export const VISIBLE_FILMS_NUMBER = 5;

export const msPerMinute = 60000;
