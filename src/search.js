import Component from './component.js';

export default class Search extends Component {
  constructor() {
    super();

    this._onSearchInput = this._onSearchInput.bind(this);

    this._onSearch = null;
  }

  _onSearchInput(evt) {
    evt.preventDefault();
    if (typeof this._onSearch === `function`) {
      this._onSearch(evt);
    }
  }

  set onSearch(fn) {
    this._onSearch = fn;
  }

  get template() {
    return `
    <form class="search">
      <input type="text" name="search" class="search__field" placeholder="Search">
      <button type="submit" class="visually-hidden">Search</button>
    </form>`.trim();
  }

  bind() {
    this._element.querySelector(`.search__field`)
        .addEventListener(`input`, this._onSearchInput);
  }

  unbind() {
    this._element.querySelector(`.search__field`)
        .removeEventListener(`input`, this._onSearchInput);
    this._onSearch = null;
  }
}
