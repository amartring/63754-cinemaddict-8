import {createElement} from './create-element.js';

export default class Component {
  constructor() {
    if (new.target === Component) {
      throw new Error(`Can't instantiate Component, only concrete one.`);
    }

    this._element = null;
  }

  get template() {
    throw new Error(`You have to define template.`);
  }

  get element() {
    return this._element;
  }

  bind() {}

  unbind() {}

  render() {
    this._element = createElement(this.template, this._htmlElement, this._classNames);
    this.bind();
    return this._element;
  }

  unrender() {
    this.unbind();
    this._element = null;
  }
}
