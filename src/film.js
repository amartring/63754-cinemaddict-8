import Component from './component.js';
import moment from 'moment';

export default class Film extends Component {
  constructor(data) {
    super();
    this._title = data.title;
    this._picture = data.picture;
    this._description = data.description;
    this._rating = data.rating;
    this._date = data.date;
    this._duration = data.duration;
    this._genre = data.genre;
    this._commentsCount = data.commentsCount;

    this._onCommentsClick = this._onCommentsClick.bind(this);

    this._onClick = null;

    this._htmlElement = `article`;
    this._classNames = [`film-card`];
  }

  _onCommentsClick(evt) {
    evt.preventDefault();
    return typeof this._onClick === `function` && this._onClick();
  }

  _partialUpdate() {
    this._element.querySelector(`.film-card__comments span`).textContent = this._commentsCount;
  }

  set onClick(fn) {
    this._onClick = fn;
  }

  get template() {
    return `
        <h3 class="film-card__title">${this._title}</h3>
        <p class="film-card__rating">${this._rating}</p>
        <p class="film-card__info">
          <span class="film-card__year">${moment(this._date).format(`YYYY`)}</span>
          <span class="film-card__duration">
            ${moment.duration(this._duration).hours()}:${moment.duration(this._duration).minutes()}
          </span>
          <span class="film-card__genre">${this._genre}</span>
        </p>
        <img src="./images/posters/${this._picture}.jpg" alt="" class="film-card__poster">
        <p class="film-card__description">${this._description}</p>
        <button class="film-card__comments"><span>${this._commentsCount}</span> comments</button>
        <form class="film-card__controls">
          <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist"><!--Add to watchlist--> WL</button>
          <button class="film-card__controls-item button film-card__controls-item--mark-as-watched"><!--Mark as watched-->WTCHD</button>
          <button class="film-card__controls-item button film-card__controls-item--favorite"><!--Mark as favorite-->FAV</button>
        </form>
    `;
  }

  bind() {
    this._element.querySelector(`.film-card__comments`)
        .addEventListener(`click`, this._onCommentsClick);
  }

  unbind() {
    this._element.querySelector(`.film-card__comments`)
        .removeEventListener(`click`, this._onCommentsClick);
    this._onClick = null;
  }

  update(data) {
    this._commentsCount = data.commentsCount;
    this._userRating = data.userRating;
    this._isOnWatchlist = data.isOnWatchlist;
    this._isWatched = data.isWatched;
    this._isFavorite = data.isFavorite;

    this._partialUpdate();
  }
}
