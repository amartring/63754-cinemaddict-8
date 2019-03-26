// import {getRandomNumber} from './util.js';
import Film from './film.js';
import FilmExtra from './film-extra.js';
import Popup from './popup.js';
import Filter from './filter.js';
import {film, filters} from './data.js';
// import makeFilter from './make-filter.js';

// const FILTERS = [
//   {
//     name: `All movies`,
//     count: null,
//     isActive: true
//   },
//   {
//     name: `Watchlist`,
//     count: 13
//   },
//   {
//     name: `History`,
//     count: 4
//   },
//   {
//     name: `Favorites`,
//     count: 8
//   }
// ];

const FILMS_COUNT = 7;

// const cardsCount = {
//   MIN: 1,
//   MAX: 10,
// };

const body = document.querySelector(`body`);
const filtersContainer = document.querySelector(`.main-navigation`);
const filmsContainer = document.querySelector(`.films`);
const filmLists = filmsContainer.querySelectorAll(`.films-list__container`);

const mainList = filmLists[0];
const ratedList = filmLists[1];
const commentedList = filmLists[2];

// const updateCards = () => {
//   const filters = filtersContainer.querySelectorAll(`.main-navigation__item`);

//   const onFiltersClick = (evt) => {
//     evt.preventDefault();
//     const target = evt.target;
//     const count = getRandomNumber(cardsCount.MIN, cardsCount.MAX);
//     mainList.innerHTML = ``;
//     ratedList.innerHTML = ``;
//     commentedList.innerHTML = ``;
//     createCards(count);
//     filters.forEach((item) => item.classList.remove(`main-navigation__item--active`));
//     target.classList.add(`main-navigation__item--active`);
//   };

//   filters.forEach((item) => item.addEventListener(`click`, onFiltersClick));
// };

// FILTERS.reverse().forEach((item) =>
//   filtersContainer.insertAdjacentHTML(`afterbegin`, makeFilter(item.name, item.count, item.isActive)));

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

    container.appendChild(filmComponent.render());
  });
};

const createCards = () => {
  // const mainData = getData(count, film);
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
  filtersData.forEach((item) => {
    const filterComponent = new Filter(item);

    filterComponent.onFilter = () => {
      const filteredFilms = filterTasks(tasksData, filterComponent._name);
      mainList.innerHTML = ``;
      renderCards(filteredFilms);
    };

    filtersContainer.appendChild(filterComponent.render());
  });
};


createCards();
renderFilters(filters, mainData);

// updateCards();
