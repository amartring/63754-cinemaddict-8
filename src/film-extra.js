import {createElement} from './create-element.js';

export default class FilmExtra {
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
        ${this._description}
      </p>
      <button class="film-card__comments">${this._comments} comments</button>
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
    this._onClick = null;
  }

  render() {
    this._element = createElement(this.template, `div`, [`film-card`, `film-card--no-controls`]);
    this.bind();
    return this._element;
  }

  unrender() {
    this.unbind();
    this._element = null;
  }
}
