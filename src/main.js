import {getRandomNumber} from './util.js';
import {FilmDetails} from './film-details.js';
import {FilmExtra} from './film-extra.js';
import {Film} from './film.js';
import getFilm from './data.js';
import makeFilter from './make-filter.js';

const FILTERS = [
  {
    name: `All movies`,
    count: null,
    isActive: true
  },
  {
    name: `Watchlist`,
    count: 13
  },
  {
    name: `History`,
    count: 4
  },
  {
    name: `Favorites`,
    count: 8
  }
];

const filmsCount = {
  COMMON: 7,
  EXTRA: 2
};

const cardsCount = {
  MIN: 1,
  MAX: 10
};

const body = document.querySelector(`body`);
const filtersContainer = document.querySelector(`.main-navigation`);
const filmsContainer = document.querySelector(`.films`);
const filmLists = filmsContainer.querySelectorAll(`.films-list__container`);

let Films = {
  main: {
    list: filmLists[0],
    data: [],
    component: [],
    popup: [],
  },

  rated: {
    list: filmLists[1],
    data: [],
    component: [],
    popup: [],
  },

  commented: {
    list: filmLists[2],
    data: [],
    component: [],
    popup: [],
  },
};

const updateCards = () => {
  const filters = filtersContainer.querySelectorAll(`.main-navigation__item`);

  const onFiltersClick = (evt) => {
    evt.preventDefault();
    const target = evt.target;
    const count = getRandomNumber(cardsCount.MIN, cardsCount.MAX);
    Films.main.list.innerHTML = ``;
    createCards(Films.main, Film, count);
    filters.forEach((item) => {
      item.classList.remove(`main-navigation__item--active`);
    });
    target.classList.add(`main-navigation__item--active`);
  };

  filters.forEach((item) => {
    item.addEventListener(`click`, onFiltersClick);
  });
};

FILTERS.reverse().forEach((item) => {
  filtersContainer.insertAdjacentHTML(`afterbegin`, makeFilter(item.name, item.count, item.isActive));
});

const getData = (count, data) => {
  return new Array(count)
  .fill(``)
  .map(() => data());
};

const getCardsArray = (data, Constructor) => {
  let array = [];
  data.forEach((item) => {
    array.push(new Constructor(item));
  });
  return array;
};

const renderCards = (array, container) => {
  for (const item of array) {
    container.appendChild(item.render());
  }
};

const addListeners = (component, popup) => {
  component.forEach((item, i) => {
    component[i].onClick = () => {
      body.appendChild(popup[i].render());
    };
  });

  popup.forEach((item) => {
    item.onClick = () => {
      const elem = body.querySelector(`.film-details`);
      body.removeChild(elem);
      item.unrender();
    };
  });
};

const createCards = (film, Class, count) => {
  film.data = getData(count, getFilm);
  film.component = getCardsArray(film.data, Class);
  film.popup = getCardsArray(film.data, FilmDetails);
  renderCards(film.component, film.list);
  addListeners(film.component, film.popup);
};

createCards(Films.main, Film, filmsCount.COMMON);
createCards(Films.rated, FilmExtra, filmsCount.EXTRA);
createCards(Films.commented, FilmExtra, filmsCount.EXTRA);

updateCards();
