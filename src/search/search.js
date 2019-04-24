import Component from '../component';

export default class Search extends Component {
  constructor() {
    super();
    this._onSearchInput = this._onSearchInput.bind(this);
    this._onSearch = null;
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

  _onSearchInput(evt) {
    evt.preventDefault();
    this.isFunction(this._onSearch(evt));
  }

  bind() {
    this._element.querySelector(`.search__field`)
        .addEventListener(`keyup`, this._onSearchInput);
  }

  unbind() {
    this._element.querySelector(`.search__field`)
        .removeEventListener(`keyup`, this._onSearchInput);
    this._onSearch = null;
  }
}
