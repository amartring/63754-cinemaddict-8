import {getRandomNumber} from './util.js';
import FilmExtra from './film-extra.js';
import Film from './film.js';
import Popup from './popup.js';
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

const FILMS_COUNT = 7;

const cardsCount = {
  MIN: 1,
  MAX: 10,
};

const body = document.querySelector(`body`);
const filtersContainer = document.querySelector(`.main-navigation`);
const filmsContainer = document.querySelector(`.films`);
const filmLists = filmsContainer.querySelectorAll(`.films-list__container`);

const mainList = filmLists[0];
const ratedList = filmLists[1];
const commentedList = filmLists[2];

const updateCards = () => {
  const filters = filtersContainer.querySelectorAll(`.main-navigation__item`);

  const onFiltersClick = (evt) => {
    evt.preventDefault();
    const target = evt.target;
    const count = getRandomNumber(cardsCount.MIN, cardsCount.MAX);
    mainList.innerHTML = ``;
    ratedList.innerHTML = ``;
    commentedList.innerHTML = ``;
    createCards(count);
    filters.forEach((item) => item.classList.remove(`main-navigation__item--active`));
    target.classList.add(`main-navigation__item--active`);
  };

  filters.forEach((item) => item.addEventListener(`click`, onFiltersClick));
};

FILTERS.reverse().forEach((item) =>
  filtersContainer.insertAdjacentHTML(`afterbegin`, makeFilter(item.name, item.count, item.isActive)));

const getData = (count, data) => new Array(count).fill(``).map(() => data());

const getCardsArray = (data, Constructor) => {
  const array = [];
  data.forEach((item) => {
    array.push(new Constructor(item));
  });
  return array;
};

const renderCards = (cards, container) => cards.forEach((item) => container.appendChild(item.render()));

const addListeners = (component, popup) => {
  component.forEach((item, i) => {
    component[i].onClick = () => body.appendChild(popup[i].render());
  });

  popup.forEach((item) => {
    item.onClick = () => {
      const elem = body.querySelector(`.film-details`);
      body.removeChild(elem);
      item.unrender();
    };
  });
};

const createCards = (count) => {
  const mainData = getData(count, getFilm);
  const mainComponent = getCardsArray(mainData, Film);
  const mainPopup = getCardsArray(mainData, Popup);

  const ratedData = mainData.slice()
                                    .sort((left, right) => Number(right.rating) - Number(left.rating))
                                    .slice(0, 2);
  const ratedComponent = getCardsArray(ratedData, FilmExtra);
  const ratedPopup = getCardsArray(ratedData, Popup);

  const commentedData = mainData.slice()
                                        .sort((left, right) => right.comments - left.comments)
                                        .slice(0, 2);
  const commentedComponent = getCardsArray(commentedData, FilmExtra);
  const commentedPopup = getCardsArray(commentedData, Popup);

  renderCards(mainComponent, mainList);
  addListeners(mainComponent, mainPopup);

  renderCards(ratedComponent, ratedList);
  addListeners(ratedComponent, ratedPopup);

  renderCards(commentedComponent, commentedList);
  addListeners(commentedComponent, commentedPopup);
};

createCards(FILMS_COUNT);

updateCards();
