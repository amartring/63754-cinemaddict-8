import Film from './film';
import FilmExtra from './film-extra';
import Popup from './popup';
import Filter from './filter';
import Statistic from './statistic';
import Search from './search';
import API from './api';
import {filters} from './data';
import {HIDDEN_CLASS, VISIBLE_FILMS_NUMBER, AUTHORIZATION, END_POINT, Message, Rating} from './constants';
import {filterFilms, searchFilms} from './filter-films';

const api = new API({endPoint: END_POINT, authorization: AUTHORIZATION});

const body = document.querySelector(`body`);
const filtersContainer = body.querySelector(`.main-navigation`);
const filmsContainer = body.querySelector(`.films`);
const filmLists = filmsContainer.querySelectorAll(`.films-list__container`);
const filmsLoader = filmsContainer.querySelector(`.films-list__show-more`);
const statsLink = body.querySelector(`.main-navigation__item--additional`);
const statsContainer = body.querySelector(`.statistic`);
const messageContainer = document.querySelector(`.films-list__title`);
const searchContainer = document.querySelector(`.header__search`);
const footerStats = document.querySelector(`.footer__statistics p`);
const headerRating = document.querySelector(`.profile__rating`);

const mainList = filmLists[0];
const ratedList = filmLists[1];
const commentedList = filmLists[2];

const setupFilmsLoader = function () {
  const invisibleFilms = mainList.querySelectorAll(`.film-card.${HIDDEN_CLASS}`);
  return invisibleFilms.length === 0
    ? filmsLoader.classList.add(HIDDEN_CLASS)
    : filmsLoader.classList.remove(HIDDEN_CLASS);
};

const hideExtraFilms = () => {
  const films = mainList.querySelectorAll(`.film-card`);
  films.forEach((task, index) => {
    return index >= VISIBLE_FILMS_NUMBER && task.classList.add(HIDDEN_CLASS);
  });
};

const onLoaderClick = () => {
  const invisibleFilms = mainList.querySelectorAll(`.film-card.${HIDDEN_CLASS}`);
  for (let i = 0; i < invisibleFilms.length && i < VISIBLE_FILMS_NUMBER; i++) {
    invisibleFilms[i].classList.remove(HIDDEN_CLASS);
  }
  setupFilmsLoader();
};

const getRatedFilms = (data) => {
  return data.slice()
    .sort((left, right) => Number(right.totalRating) - Number(left.totalRating)).slice(0, 2);
};

const getCommentedFilms = (data) => {
  return data.slice()
    .sort((left, right) => right.comments.length - left.comments.length).slice(0, 2);
};

const renderFilms = (data, FilmConstructor, container) => {
  data.forEach((item) => {
    const filmComponent = new FilmConstructor(item);

    filmComponent.onClick = (newObj) => {
      const popupComponent = new Popup(item);
      popupComponent.update((Object.assign(item, newObj)));

      popupComponent.onClose = (newObject) => {
        item = Object.assign(item, newObject);

        api.updateFilms({id: item.id, data: item.toRAW()})
        .then((newFilm) => {
          filmComponent.update(newFilm);
          popupComponent.update(newFilm);
          body.removeChild(popupComponent.element);
          popupComponent.unrender();
        });
      };

      popupComponent.render();
      body.appendChild(popupComponent.element);
    };

    filmComponent.onAddToWatchList = (newObj) => {
      filmComponent.update((Object.assign(item, newObj)));
      updateFilterCount(`#watchlist`, filmComponent._isOnWatchlist);
    };

    filmComponent.onMarkAsWatched = (newObj) => {
      filmComponent.update((Object.assign(item, newObj)));
      updateFilterCount(`#history`, filmComponent._isWatched);
      updateRating();
    };

    filmComponent.onMarkAsFavorite = (newObj) => {
      filmComponent.update((Object.assign(item, newObj)));
      updateFilterCount(`#favorites`, filmComponent._isFavorite);
    };

    container.appendChild(filmComponent.render());
  });
};

const updateFilterCount = (id, state) => {
  let count = +(document.querySelector(id).textContent);
  state ? count++ : count--;
  document.querySelector(id).textContent = count;
  count ? document.querySelector(id).classList.remove(HIDDEN_CLASS) : document.querySelector(id).classList.add(HIDDEN_CLASS);
};

const updateRating = () => {
  const count = +(document.querySelector(`#history`).textContent);
  if (count >= Rating.low.minCount && count <= Rating.low.maxCount) {
    headerRating.textContent = Rating.low.name;
  } else if (count >= Rating.medium.minCount && count <= Rating.medium.maxCount) {
    headerRating.textContent = Rating.medium.name;
  } else if (count >= Rating.high.minCount) {
    headerRating.textContent = Rating.high.name;
  }
};

const renderFilters = (filtersData, filmsData) => {
  filtersData.reverse().forEach((item) => {
    const filterComponent = new Filter(item);
    let filteredFilms = filterFilms(filmsData, filterComponent._name);
    filterComponent.getCount(filteredFilms.length);

    filterComponent.onFilter = () => {
      document.querySelectorAll(`.main-navigation__item`).forEach((it) => it.classList.remove(`main-navigation__item--active`));
      filmsContainer.classList.remove(HIDDEN_CLASS);
      statsContainer.classList.add(HIDDEN_CLASS);
      messageContainer.classList.add(HIDDEN_CLASS);
      filteredFilms = filterFilms(filmsData, filterComponent._name);
      filterComponent.update(filteredFilms.length);
      filterComponent._isActive = false;

      mainList.innerHTML = ``;
      if (filteredFilms.length === 0) {
        messageContainer.textContent = Message.FILTER;
        messageContainer.classList.remove(HIDDEN_CLASS);
      }
      renderFilms(filteredFilms, Film, mainList);
      hideExtraFilms();
      setupFilmsLoader();
    };

    filtersContainer.insertAdjacentElement(`afterbegin`, filterComponent.render());
  });
};

const renderSearch = () => {
  const searchComponent = new Search();

  searchComponent.onSearch = (evt) => {
    const target = evt.target;
    mainList.innerHTML = ``;
    api.getFilms()
      .then((films) => {
        const filteredFilms = searchFilms(films, target.value);
        messageContainer.classList.add(HIDDEN_CLASS);
        renderFilms(filteredFilms, Film, mainList);
        hideExtraFilms();
        setupFilmsLoader();
        if (filteredFilms.length === 0) {
          messageContainer.classList.remove(HIDDEN_CLASS);
          messageContainer.textContent = Message.SEARCH;
        }
      });
  };

  searchContainer.appendChild(searchComponent.render());
};

const setupFooterStats = () => {
  const filmsCount = mainList.querySelectorAll(`.film-card`).length;
  footerStats.textContent = `${filmsCount} movie${filmsCount === 1 ? `` : `s`} inside`;
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
  messageContainer.classList.remove(HIDDEN_CLASS);
  messageContainer.textContent = text;
};

const hideLoadingMessage = () => {
  messageContainer.classList.add(HIDDEN_CLASS);
};

showLoadingMessage(Message.LOADING);

api.getFilms()
  .then((films) => {
    hideLoadingMessage();
    renderFilms(films, Film, mainList);
    hideExtraFilms();
    setupFilmsLoader();
    renderFilms(getRatedFilms(films), FilmExtra, ratedList);
    renderFilms(getCommentedFilms(films), FilmExtra, commentedList);
    renderFilters(filters, films);
    renderSearch();
    renderStatistic(films);
    setupFooterStats();
    updateRating();
  })
  .catch(() => {
    showLoadingMessage(Message.ERROR);
  });

statsLink.addEventListener(`click`, onStatsClick);
filmsLoader.addEventListener(`click`, onLoaderClick);
