import Component from '../component';
import ModelFilm from './model-film';
import {Method, StatusCode, URL} from '../constants';

const checkStatus = (response) => {
  return response.status >= StatusCode.SUCCESS && response.status < StatusCode.REDIRECTION
    ? response
    : new Error(`${response.status}: ${response.statusText}`);
};

const toJSON = (response) => {
  return response.json();
};

export default class API extends Component {
  constructor({endPoint, authorization}) {
    super();
    this._endPoint = endPoint;
    this._authorization = authorization;
  }

  getFilms() {
    return this._load({url: URL})
      .then(toJSON)
      .then(ModelFilm.parseFilms);
  }

  createFilms({film}) {
    return this._load({
      url: URL,
      method: Method.POST,
      body: JSON.stringify(film),
      headers: new Headers({'Content-Type': `application/json`})
    })
      .then(toJSON)
      .then(ModelFilm.parseFilm);
  }

  updateFilms({id, data}) {
    return this._load({
      url: `${URL}/${id}`,
      method: Method.PUT,
      body: JSON.stringify(data),
      headers: new Headers({'Content-Type': `application/json`})
    })
      .then(toJSON)
      .then(ModelFilm.parseFilm);
  }

  deleteFilm({id}) {
    return this._load({url: `${URL}/${id}`, method: Method.DELETE});
  }

  _load({url, method = Method.GET, body = null, headers = new Headers()}) {
    headers.append(`Authorization`, this._authorization);

    return fetch(`${this._endPoint}/${url}`, {method, body, headers})
      .then(checkStatus)
      .catch((err) => {
        throw err;
      });
  }
}
