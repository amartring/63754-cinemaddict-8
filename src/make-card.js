import {shuffleArray} from './util.js';

const getTitle = (array) => {
  let title = ``;
  array.forEach((item) => {
    title += item[Math.floor(Math.random() * item.length)];
  });
  return title;
};

export default (film, isControls) => {
  return `
    <article
      class="film-card ${isControls ? `` : ` film-card--no-controls`}">
      <h3 class="film-card__title">${getTitle(film.title)}</h3>
      <p class="film-card__rating">${film.rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${film.year}</span>
        <span class="film-card__duration">${film.duration}</span>
        <span class="film-card__genre">${film.genre}</span>
      </p>
      <img src="./images/posters/${film.picture}.jpg" alt="" class="film-card__poster">
      <p class="film-card__description">
        ${shuffleArray(film.description
          .split(`.`))
          .splice(Math.floor(Math.random() * 8), Math.floor(1 + Math.random() * 2))
          .join(`. `)}
      </p>
      <button class="film-card__comments">${film.comments} comments</button>

      ${isControls ? `
        <form class="film-card__controls">
          <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist"><!--Add to watchlist--> WL</button>
          <button class="film-card__controls-item button film-card__controls-item--mark-as-watched"><!--Mark as watched-->WTCHD</button>
          <button class="film-card__controls-item button film-card__controls-item--favorite"><!--Mark as favorite-->FAV</button>
        </form>
      `
    : ``}
    </article>
  `;
};
