import Component from './component.js';
import {filterFilms} from './filter-films.js';

export default class Filter extends Component {
  constructor(data) {
    super();
    this._name = data.name;
    this._count = data.count;

    this._isActive = false;

    this._onFilterClick = this._onFilterClick.bind(this);

    this._onFilter = null;
  }

  _partialUpdate() {
    this._element.innerHTML = this.template;
  }

  _getFilerData() {
    return filterFilms();
  }

  _onFilterClick(evt) {
    evt.preventDefault();
    this._isActive = !this._isActive;
    this.unbind();
    this._partialUpdate();
    this.bind();

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
      <a href="#${this._name.toLowerCase().split(` `).slice(0, 1)}"
        class="main-navigation__item ${this._isActive && ` main-navigation__item--active`}">
        ${this._name}
        ${this._count && `<span class="main-navigation__item-count">${this._count}</span>`}
      </a>
    </span>`.trim();
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
}
