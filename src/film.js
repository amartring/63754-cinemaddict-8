import {shuffleArray} from './util.js';
import {createElement} from './create-element.js';

class Film {
  constructor(data) {
    this._title = data.title;
    this._picture = data.picture;
    this._description = data.description;
    this._rating = data.rating;
    this._year = data.year;
    this._duration = data.duration;
    this._genre = data.genre;
    this._comments = data.comments;

    this._onCommentsClick = this._onCommentsClick.bind(this);

    this._element = null;
    this._onClick = null;
  }

  _getDescription() {
    return shuffleArray(this._description
      .split(`.`))
      .splice(Math.floor(Math.random() * 8), Math.floor(1 + Math.random() * 2))
      .join(`. `);
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
        <h3 class="film-card__title">${this._title}</h3>
        <p class="film-card__rating">${this._rating}</p>
        <p class="film-card__info">
          <span class="film-card__year">${this._year}</span>
          <span class="film-card__duration">${this._duration}</span>
          <span class="film-card__genre">${this._genre}</span>
        </p>
        <img src="./images/posters/${this._picture}.jpg" alt="" class="film-card__poster">
        <p class="film-card__description">
          ${this._getDescription()}
        </p>
        <button class="film-card__comments">${this._comments} comments</button>
        <form class="film-card__controls">
          <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist"><!--Add to watchlist--> WL</button>
          <button class="film-card__controls-item button film-card__controls-item--mark-as-watched"><!--Mark as watched-->WTCHD</button>
          <button class="film-card__controls-item button film-card__controls-item--favorite"><!--Mark as favorite-->FAV</button>
        </form>
    `;
  }

  get element() {
    return this._element;
  }

  bind() {
    this._element.querySelector(`.film-card__comments`)
        .addEventListener(`click`, this._onCommentsClick);
  }

  unbind() {
    this._element.querySelector(`.film-card__comments`)
        .removeEventListener(`click`, this._onCommentsClick);
  }

  render() {
    this._element = createElement(this.template, `article`, [`film-card`]);
    this.bind();
    return this._element;
  }

  unrender() {
    this.unbind();
    this._element = null;
  }
}

export {Film};
