import Filter from './filter';
import Film from '../films/film';
import {renderFilms} from '../films/setup-films';
import {setupFilmsLoader, hideExtraFilms} from '../setup-main';
import {mainList} from '../main';
import {filmsContainer, statsContainer, messageContainer} from '../util';
import {HIDDEN_CLASS, FilterName, Message} from '../constants';

const filtersContainer = document.querySelector(`.main-navigation__filters-container`);

const filterFilms = (data, filterName) => {
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

const activateFilter = (activeFilter, filters) => {
  for (const filter of filters) {
    if (filter.isActive) {
      filter.isActive = false;
      break;
    }
  }
  activeFilter.isActive = true;
  return filters;
};

export const renderFilters = (filtersData, filmsData) => {
  filtersData.forEach((item) => {
    const filterComponent = new Filter(item);
    let filteredFilms = filterFilms(filmsData, filterComponent._name);

    filterComponent.onFilter = () => {
      filtersContainer.innerHTML = ``;
      filtersData = activateFilter(item, filtersData);
      item.isActive = true;
      filterComponent.update(item);
      filmsContainer.classList.remove(HIDDEN_CLASS);
      statsContainer.classList.add(HIDDEN_CLASS);
      messageContainer.classList.add(HIDDEN_CLASS);
      filteredFilms = filterFilms(filmsData, filterComponent._name);

      mainList.innerHTML = ``;
      if (filteredFilms.length === 0) {
        messageContainer.textContent = Message.FILTER;
        messageContainer.classList.remove(HIDDEN_CLASS);
      }
      renderFilms(filteredFilms, Film, mainList);
      hideExtraFilms();
      setupFilmsLoader();
      renderFilters(filtersData, filmsData);
    };

    filtersContainer.appendChild(filterComponent.render());
    filterComponent.setCount(filteredFilms.length);
  });
};
