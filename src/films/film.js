import Component from '../component';
import moment from 'moment';
import {MS_PER_MINUTE} from '../constants';

export default class Film extends Component {
  constructor(data) {
    super();
    this._id = data.id;
    this._comments = data.comments;
    this._title = data.title;
    this._poster = data.poster;
    this._description = data.description;
    this._totalRating = data.totalRating;
    this._date = data.date;
    this._duration = data.duration;
    this._genre = data.genre;
    this._isOnWatchlist = data.isOnWatchlist;
    this._isWatched = data.isWatched;
    this._isFavorite = data.isFavorite;
    this._onCommentsClick = this._onCommentsClick.bind(this);
    this._onWatchlistChange = this._onWatchlistChange.bind(this);
    this._onWatchedChange = this._onWatchedChange.bind(this);
    this._onFavoriteChange = this._onFavoriteChange.bind(this);
    this._onClick = null;
  }

  set onAddToWatchList(fn) {
    this._onAddToWatchList = fn;
  }

  set onMarkAsWatched(fn) {
    this._onMarkAsWatched = fn;
  }

  set onMarkAsFavorite(fn) {
    this._onMarkAsFavorite = fn;
  }

  set onClick(fn) {
    this._onClick = fn;
  }

  get template() {
    return `
      <article class="film-card">
        <h3 class="film-card__title">${this._title}</h3>
        <p class="film-card__rating">${this._totalRating}</p>
        <p class="film-card__info">
          <span class="film-card__year">${moment(this._date).format(`YYYY`)}</span>
          <span class="film-card__duration">
            ${moment.duration(this._duration * MS_PER_MINUTE).hours()}:${moment.duration(this._duration * MS_PER_MINUTE).minutes()}
          </span>
          <span class="film-card__genre">${this._genre.join(` `)}</span>
        </p>
        <img src="./${this._poster}" alt="" class="film-card__poster">
        <p class="film-card__description">${this._description}</p>
        <button class="film-card__comments"><span>${this._comments.length}</span> comments</button>
        <form class="film-card__controls">
          <button
            class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${this._isOnWatchlist && `film-card__controls-item--active`}">
              <!--Add to watchlist--> WL</button>
          <button
            class="film-card__controls-item button film-card__controls-item--mark-as-watched ${this._isWatched && `film-card__controls-item--active`}">
              <!--Mark as watched-->WTCHD</button>
          <button
            class="film-card__controls-item button film-card__controls-item--favorite ${this._isFavorite && `film-card__controls-item--active`}">
              <!--Mark as favorite-->FAV</button>
        </form>
      </article>`.trim();
  }

  _processForm() {
    return {
      comments: this._comments,
      isOnWatchlist: this._isOnWatchlist,
      isWatched: this._isWatched,
      isFavorite: this._isFavorite,
    };
  }

  _onCommentsClick(evt) {
    evt.preventDefault();
    const newData = this._processForm();
    this.isFunction(this._onClick(newData));
    this.update(newData);
  }

  _onWatchlistChange(evt) {
    evt.preventDefault();
    this._isOnWatchlist = !this._isOnWatchlist;
    this._partialUpdate();
    const newData = this._processForm();
    this.isFunction(this._onAddToWatchList(newData));
  }

  _onWatchedChange(evt) {
    evt.preventDefault();
    this._isWatched = !this._isWatched;
    this._partialUpdate();
    const newData = this._processForm();
    this.isFunction(this._onMarkAsWatched(newData));
  }

  _onFavoriteChange(evt) {
    evt.preventDefault();
    this._isFavorite = !this._isFavorite;
    this._partialUpdate();
    const newData = this._processForm();
    this.isFunction(this._onMarkAsFavorite(newData));
  }

  _changeClass(condition, item) {
    if (condition) {
      item.classList.add(`film-card__controls-item--active`);
    } else {
      item.classList.remove(`film-card__controls-item--active`);
    }
  }

  _partialUpdate() {
    const toWatchList = this._element.querySelector(`.film-card__controls-item--add-to-watchlist`);
    const toWatched = this._element.querySelector(`.film-card__controls-item--mark-as-watched`);
    const toFavorite = this._element.querySelector(`.film-card__controls-item--favorite`);
    this._changeClass(this._isOnWatchlist, toWatchList);
    this._changeClass(this._isWatched, toWatched);
    this._changeClass(this._isFavorite, toFavorite);
    this._element.querySelector(`.film-card__comments span`).textContent = this._comments.length;
  }

  update(data) {
    this._comments = data.comments;
    this._userRating = data.userRating;
    this._isOnWatchlist = data.isOnWatchlist;
    this._isWatched = data.isWatched;
    this._isFavorite = data.isFavorite;
    this._partialUpdate();
  }

  bind() {
    this._element.querySelector(`.film-card__comments`)
        .addEventListener(`click`, this._onCommentsClick);
    this._element.querySelector(`.film-card__controls-item--add-to-watchlist`)
        .addEventListener(`click`, this._onWatchlistChange);
    this._element.querySelector(`.film-card__controls-item--mark-as-watched`)
        .addEventListener(`click`, this._onWatchedChange);
    this._element.querySelector(`.film-card__controls-item--favorite`)
        .addEventListener(`click`, this._onFavoriteChange);
  }

  unbind() {
    this._element.querySelector(`.film-card__comments`)
        .removeEventListener(`click`, this._onCommentsClick);
    this._element.querySelector(`.film-card__controls-item--add-to-watchlist`)
        .removeEventListener(`click`, this._onWatchlistChange);
    this._element.querySelector(`.film-card__controls-item--mark-as-watched`)
        .removeEventListener(`click`, this._onWatchedChange);
    this._element.querySelector(`.film-card__controls-item--favorite`)
        .removeEventListener(`click`, this._onFavoriteChange);
    this._onClick = null;
  }
}
