import {shuffleArray} from './util.js';
import {createElement} from './create-element.js';

class FilmNoConrtols {
  constructor(data) {
    this._title = data.title;
    this._picture = data.picture;
    this._description = data.description;
    this._rating = data.rating;
    this._year = data.year;
    this._duration = data.duration;
    this._genre = data.genre;
    this._comments = data.comments;

    this._element = null;
  }

  _getTitle() {
    let title = ``;
    this._title.forEach((item) => {
      title += item[Math.floor(Math.random() * item.length)];
    });
    return title;
  }

  _getDescription() {
    return shuffleArray(this._description
      .split(`.`))
      .splice(Math.floor(Math.random() * 8), Math.floor(1 + Math.random() * 2))
      .join(`. `);
  }

  get template() {
    return `
      <article
        class="film-card film-card--no-controls">
        <h3 class="film-card__title">${this._getTitle()}</h3>
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
      </article>
    `;
  }

  get element() {
    return this._element;
  }

  render() {
    this._element = createElement(this.template);
    // this.bind();
    return this._element;
  }

  unrender() {
    // this.unbind();
    this._element = null;
  }
}
