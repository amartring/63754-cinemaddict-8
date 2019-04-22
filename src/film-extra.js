import Component from './component';
import moment from 'moment';

export default class FilmExtra extends Component {
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
    this._onCommentsClick = this._onCommentsClick.bind(this);
    this._onClick = null;
  }

  _onCommentsClick(evt) {
    evt.preventDefault();
    return typeof this._onClick === `function` && this._onClick();
  }

  set onClick(fn) {
    this._onClick = fn;
  }

  get template() {
    return `
    <article class="film-card film-card--no-controls">
      <h3 class="film-card__title">${this._title}</h3>
      <p class="film-card__rating">${this._totalRating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${moment(this._date).format(`YYYY`)}</span>
        <span class="film-card__duration">
        ${moment.duration(this._duration * 1000 * 60).hours()}:${moment.duration(this._duration * 1000 * 60).minutes()}
        </span>
        <span class="film-card__genre">${this._genre.join(` `)}</span>
      </p>
      <img src="./${this._poster}" alt="" class="film-card__poster">
      <p class="film-card__description">${this._description}</p>
      <button class="film-card__comments">${this._comments.length} comments</button>
    </article>`.trim();
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
    this._comments = data.comments;
    this._userRating = data.userRating;
    this._isOnWatchlist = data.isOnWatchlist;
    this._isWatched = data.isWatched;
    this._isFavorite = data.isFavorite;
  }
}
