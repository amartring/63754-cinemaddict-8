import Component from './component.js';

export default class Filter extends Component {
  constructor(data) {
    super();
    this._name = data.name;
    this._count = data.count;

    this._isActive = false;

    this._onFilterClick = this._onFilterClick.bind(this);

    this._onFilter = null;
  }

  _onFilterClick(evt) {
    evt.preventDefault();
    this._isActive = !this._isActive;

    if (typeof this._onFilter === `function`) {
      this._onFilter();
    }
  }

  set onFilter(fn) {
    this._onFilter = fn;
  }

  get template() {
    return `
    <div>
      <a href="#${this._name.toLowerCase().split(` `).slice(0, 1)}"
        class="main-navigation__item ${this._isActive && ` main-navigation__item--active`}">
        ${this._name}
        ${this._count && `<span class="main-navigation__item-count">${this._count}</span>`}
      </a>
    </div>`.trim();
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
