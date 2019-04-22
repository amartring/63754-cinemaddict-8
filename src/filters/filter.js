import Component from '../component';
import {FilterName} from '../constants';
import {HIDDEN_CLASS} from '../constants';


export default class Filter extends Component {
  constructor(data) {
    super();
    this._name = data.name;
    this._id = this._name.toLowerCase();
    this._isActive = data.isActive ? true : false;
    this._onFilter = null;
    this._onFilterClick = this._onFilterClick.bind(this);
  }

  _onFilterClick(evt) {
    evt.preventDefault();
    this._isActive = !this._isActive;
    this.isFunction(this._onFilter);
  }

  set onFilter(fn) {
    this._onFilter = fn;
  }

  get template() {
    return `
    <span>
      <a href="#${this._id}"
        class="main-navigation__item ${this._isActive ? ` main-navigation__item--active` : ``}">
        ${this._name}
        <span
          class="main-navigation__item-count ${this._name === FilterName.all ? HIDDEN_CLASS : ``}"
          id="${this._id}">
        </span>
      </a>
    </span>`.trim();
  }

  setCount(count) {
    this._element.querySelector(`.main-navigation__item-count`).textContent = `${count}`;
  }

  bind() {
    this._element.addEventListener(`click`, this._onFilterClick);
  }

  unbind() {
    this._element.removeEventListener(`click`, this._onFilterClick);
  }

  update(data) {
    this._isActive = data.isActive;
  }
}
