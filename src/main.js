import {getRandomNumber} from './util.js';
import makeFilter from './make-filter.js';
import makeCard from './make-card.js';
import getFilm from './data.js';

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

const filtersContainer = document.querySelector(`.main-navigation`);
const filmsContainers = document.querySelectorAll(`.films-list__container`);

const createCards = (container, count, isControls) => {
  container.insertAdjacentHTML(`beforeend`, new Array(count)
    .fill(``)
    .map(() => makeCard(getFilm(), isControls))
    .join(``));
};

const updateCards = () => {
  const filters = filtersContainer.querySelectorAll(`.main-navigation__item`);

  const onFiltersClick = (evt) => {
    evt.preventDefault();
    const target = evt.target;
    const count = getRandomNumber(cardsCount.MIN, cardsCount.MAX);
    filmsContainers[0].innerHTML = ``;
    createCards(filmsContainers[0], count, true);
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

createCards(filmsContainers[0], filmsCount.COMMON, true);

for (let i = 1; i < filmsContainers.length; i++) {
  createCards(filmsContainers[i], filmsCount.EXTRA, false);
}

updateCards();
