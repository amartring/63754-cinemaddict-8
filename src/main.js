import Film from './film.js';
import FilmExtra from './film-extra.js';
import Popup from './popup.js';
import Filter from './filter.js';
import {film, filters} from './data.js';

const FILMS_COUNT = 7;

const body = document.querySelector(`body`);
const filtersContainer = document.querySelector(`.main-navigation`);
const filmsContainer = document.querySelector(`.films`);
const filmLists = filmsContainer.querySelectorAll(`.films-list__container`);

const mainList = filmLists[0];
const ratedList = filmLists[1];
const commentedList = filmLists[2];

const getData = (count, data) => new Array(count).fill(``).map(() => data());

const mainData = getData(FILMS_COUNT, film);

const renderCards = (data, FilmConstructor, container) => {
  data.forEach((item) => {
    const filmComponent = new FilmConstructor(item);

    filmComponent.onClick = (newObj) => {
      const popupComponent = new Popup(item);
      popupComponent.update((Object.assign(item, newObj)));

      popupComponent.onClose = (newObject) => {
        filmComponent.update((Object.assign(item, newObject)));
        body.removeChild(popupComponent.element);
        popupComponent.unrender();
      };

      popupComponent.render();
      body.appendChild(popupComponent.element);
    };

    filmComponent.onAddToWatchList = (newObj) => {
      filmComponent.update((Object.assign(item, newObj)));
    };

    filmComponent.onMarkAsWatched = (newObj) => {
      filmComponent.update((Object.assign(item, newObj)));
    };

    filmComponent.onMarkAsFavorite = (newObj) => {
      filmComponent.update((Object.assign(item, newObj)));
    };


    container.appendChild(filmComponent.render());
  });
};

const createCards = () => {
  const ratedData = mainData.slice()
                            .sort((left, right) => Number(right.rating) - Number(left.rating))
                            .slice(0, 2);
  const commentedData = mainData.slice()
                                .sort((left, right) => right.comments - left.comments)
                                .slice(0, 2);

  renderCards(mainData, Film, mainList);
  renderCards(ratedData, FilmExtra, ratedList);
  renderCards(commentedData, FilmExtra, commentedList);
};

// eslint-disable-next-line consistent-return
const filterTasks = (data, filterName) => {
  switch (filterName) {
    case `All movies`:
      return data;

    case `Watchlist`:
      return data.filter((it) => it.isOnWatchlist);

    case `History`:
      return data.filter((it) => it.isWatched);

    case `Favorites`:
      return data.filter((it) => it.isFavorite);
  }
};

const renderFilters = (filtersData, tasksData) => {
  filtersData.reverse().forEach((item) => {
    const filterComponent = new Filter(item);

    filterComponent.onFilter = () => {
      const filteredFilms = filterTasks(tasksData, filterComponent._name);
      mainList.innerHTML = ``;
      renderCards(filteredFilms, Film, mainList);
    };

    filtersContainer.insertAdjacentElement(`afterbegin`, filterComponent.render());
  });
};


createCards();
renderFilters(filters, mainData);
