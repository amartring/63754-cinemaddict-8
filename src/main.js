import Film from './film.js';
import FilmExtra from './film-extra.js';
import Popup from './popup.js';
import Filter from './filter.js';
import Statistic from './statistic.js';
import API from './api.js';
import {filters} from './data.js';
import {HIDDEN_CLASS, Message} from './constants.js';
import {filterFilms} from './filter-films.js';

const FILMS_COUNT = 20;
const AUTHORIZATION = `Basic dXNlckBwYXNzd35yZAo=${Math.random()}`;
const END_POINT = `https://es8-demo-srv.appspot.com/moowle`;

const api = new API({endPoint: END_POINT, authorization: AUTHORIZATION});

const body = document.querySelector(`body`);
const filtersContainer = body.querySelector(`.main-navigation`);
const filmsContainer = body.querySelector(`.films`);
const filmLists = filmsContainer.querySelectorAll(`.films-list__container`);
const statsLink = body.querySelector(`.main-navigation__item--additional`);
const statsContainer = body.querySelector(`.statistic`);
const loadingContainer = document.querySelector(`.films-list__title`);

const mainList = filmLists[0];
const ratedList = filmLists[1];
const commentedList = filmLists[2];

// const getData = (count, data) => new Array(count).fill(``).map(() => data());

// const mainData = getData(FILMS_COUNT, film);

const getRatedFilms = (data) => {
  return data.slice()
    .sort((left, right) => Number(right.totalRating) - Number(left.totalRating)).slice(0, 2);
};

const getCommentedFilms = (data) => {
  return data.slice()
    .sort((left, right) => right.comments.length - left.comments.length).slice(0, 2);
};

const renderCards = (data, FilmConstructor, container) => {
  data.forEach((item) => {
    const filmComponent = new FilmConstructor(item);

    filmComponent.onClick = (newObj) => {
      const popupComponent = new Popup(item);
      popupComponent.update((Object.assign(item, newObj)));

      popupComponent.onClose = (newObject) => {
        item = Object.assign(item, newObject);

        api.updateFilms({id: item.id, data: item.toRAW()})
        .then((newFilm) => {
          // editTaskComponent.unblock();
          filmComponent.update(newFilm);
          popupComponent.update(newFilm);
          body.removeChild(popupComponent.element);
          popupComponent.unrender();
        })
        .catch(() => {
          // editTaskComponent.shake();
          // editTaskComponent.unblock();
        });
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

const renderFilters = (filtersData, tasksData) => {
  filtersData.reverse().forEach((item) => {
    const filterComponent = new Filter(item);

    filterComponent.onFilter = () => {
      filmsContainer.classList.remove(HIDDEN_CLASS);
      statsContainer.classList.add(HIDDEN_CLASS);
      const filteredFilms = filterFilms(tasksData, filterComponent._name);
      mainList.innerHTML = ``;
      renderCards(filteredFilms, Film, mainList);
    };

    filtersContainer.insertAdjacentElement(`afterbegin`, filterComponent.render());
  });
};

const renderStatistic = (data) => {
  statsContainer.innerHTML = ``;
  const statsComponent = new Statistic(data);
  statsContainer.appendChild(statsComponent.render());
};

const onStatsClick = () => {
  filmsContainer.classList.add(HIDDEN_CLASS);
  statsContainer.classList.remove(HIDDEN_CLASS);
};

const showLoadingMessage = (text) => {
  loadingContainer.classList.remove(HIDDEN_CLASS);
  loadingContainer.textContent = text;
};

const hideLoadingMessage = () => {
  loadingContainer.classList.add(HIDDEN_CLASS);
};

showLoadingMessage(Message.LOADING);

api.getFilms()
  .then((films) => {
    hideLoadingMessage();
    renderCards(films, Film, mainList);
    renderCards(getRatedFilms(films), FilmExtra, ratedList);
    renderCards(getCommentedFilms(films), FilmExtra, commentedList);
    renderFilters(filters, films);
    renderStatistic(films);
  })
  .catch(() => {
    showLoadingMessage(Message.ERROR);
  });

statsLink.addEventListener(`click`, onStatsClick);

console.log(api.getFilms());
