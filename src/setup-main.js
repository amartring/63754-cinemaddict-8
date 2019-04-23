
import {Rating} from './constants';
import {mainList} from './main';
import {filmsContainer} from './util';
import {HIDDEN_CLASS, VISIBLE_FILMS_NUMBER} from './constants';

const headerRating = document.querySelector(`.profile__rating`);
const footerStats = document.querySelector(`.footer__statistics p`);
const filmsLoader = filmsContainer.querySelector(`.films-list__show-more`);

export const updateRating = (data) => {
  const count = (data.filter((it) => it.isWatched)).length;
  if (count <= Rating.low.count) {
    headerRating.textContent = Rating.low.name;
  } else if (count <= Rating.medium.count) {
    headerRating.textContent = Rating.medium.name;
  } else {
    headerRating.textContent = Rating.high.name;
  }
};

export const setupFooterStats = () => {
  const filmsCount = mainList.querySelectorAll(`.film-card`).length;
  footerStats.textContent = `${filmsCount} movie${filmsCount === 1 ? `` : `s`} inside`;
};

export const setupFilmsLoader = () => {
  const invisibleFilms = mainList.querySelectorAll(`.film-card.${HIDDEN_CLASS}`);
  return invisibleFilms.length === 0
    ? filmsLoader.classList.add(HIDDEN_CLASS)
    : filmsLoader.classList.remove(HIDDEN_CLASS);
};

export const hideExtraFilms = () => {
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

filmsLoader.addEventListener(`click`, onLoaderClick);
