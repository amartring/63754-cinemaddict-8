import Component from './component.js';
// import {filterFilms} from './filter-films.js';

export default class Filter extends Component {
  constructor(data) {
    super();
    this._name = data.name;

    this._id = this._name.toLowerCase().split(` `).slice(0, 1);
    this._count = 0;

    this._isActive = false;

    this._onFilterClick = this._onFilterClick.bind(this);

    this._onFilter = null;
  }

  _onFilterClick(evt) {
    evt.preventDefault();
    this._isActive = !this._isActive;
    // this._partialUpdate();

    if (typeof this._onFilter === `function`) {
      this._onFilter();
    }
  }

  set onFilter(fn) {
    this._onFilter = fn;
  }

  get template() {
    return `
    <span>
      <a href="#${this._id}"
        class="main-navigation__item ${this._isActive && ` main-navigation__item--active`}">
        ${this._name}
        <span
          class="main-navigation__item-count ${this._count === 0 || this._name === `All movies` ? ` visually-hidden` : ``}"
          id="${this._id}">
            ${this._count}
        </span>
      </a>
    </span>`.trim();
  }

  getCount(data) {
    this._count = data;
  }

  bind() {
    this._element.querySelector(`.main-navigation__item`)
        .addEventListener(`click`, this._onFilterClick);
  }

  unbind() {
    this._element.querySelector(`.main-navigation__item`)
        .removeEventListener(`click`, this._onFilterClick);
    this._onClick = null;
  }

  update(data) {
    this._count = data;
    this.unbind();
    const oldElement = this._element;
    this._element = this.render();
    oldElement.parentNode.replaceChild(this._element, oldElement);
  }
}
