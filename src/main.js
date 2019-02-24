import {getRandomNumber} from './util.js';
import makeFilter from './make-filter.js';
import makeCard from './make-card.js';

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

const FILM = {
  name: `Moonrise`,
  rating: `6.1`,
  year: `1948`,
  duration: `1h 30m`,
  genre: `Nuar`,
  description: `Danny Hawkins, has a tragic past. He makes an unintentional murder,
                saving the girl from the hands of scoundrels. Facing a painful choice,
                he tries to flee not only from the police, but from himself.`,
  comments: 7
};

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

const createCard = (container, count, film, isControls = false) => {
  for (let i = 0; i < count; i++) {
    container.insertAdjacentHTML(`beforeend`,
        makeCard(film.name, film.rating, film.year, film.duration, film.genre, film.description, film.comments, isControls));
  }
};

// const onFiltersClick = (evt) => {
//   evt.preventDefault();
//   const target = evt.target;
//   const count = getRandomNumber(cardsCount.MIN, cardsCount.MAX);
//   const filters = filtersContainer.querySelectorAll(`.main-navigation__item`);
//   filmsContainers[0].innerHTML = ``;
//   createCard(filmsContainers[0], count, FILM, true);
//   filters.forEach((item) => {
//     item.classList.remove(`main-navigation__item--active`);
//   });
//   target.classList.add(`main-navigation__item--active`);
// };

const updateCards = () => {
  const filters = filtersContainer.querySelectorAll(`.main-navigation__item`);

  const onFiltersClick = (evt) => {
    evt.preventDefault();
    const target = evt.target;
    const count = getRandomNumber(cardsCount.MIN, cardsCount.MAX);
    // const filters = filtersContainer.querySelectorAll(`.main-navigation__item`);
    filmsContainers[0].innerHTML = ``;
    createCard(filmsContainers[0], count, FILM, true);
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

createCard(filmsContainers[0], filmsCount.COMMON, FILM, true);

for (let i = 1; i < filmsContainers.length; i++) {
  createCard(filmsContainers[i], filmsCount.EXTRA, FILM);
}

updateCards();
