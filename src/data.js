import {FilterName} from './constants';

export const filters = [
  {
    name: FilterName.all,
    isActive: true,
  },
  {
    name: FilterName.watchlist,
    isActive: false,
  },
  {
    name: FilterName.history,
    isActive: false,
  },
  {
    name: FilterName.favorites,
    isActive: false,
  }
];
