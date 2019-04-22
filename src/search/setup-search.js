import Search from './search';
import Film from '../films/film';
import {renderFilms} from '../films/setup-films';
import {debounce} from '../debounce';
import {setupFilmsLoader, hideExtraFilms} from '../setup-main';
import {api, mainList} from '../main';
import {messageContainer} from '../util';
import {HIDDEN_CLASS, Message} from '../constants';

const searchContainer = document.querySelector(`.header__search`);

export const searchFilms = (data, request) => data.filter((it) => it.title.toLowerCase().includes(request.toLowerCase()));

export const renderSearch = () => {
  const searchComponent = new Search();

  searchComponent.onSearch = (evt) => {
    const target = evt.target;
    mainList.innerHTML = ``;
    api.getFilms()
      .then((films) => {
        const filteredFilms = searchFilms(films, target.value);
        messageContainer.classList.add(HIDDEN_CLASS);
        debounce(renderFilms(filteredFilms, Film, mainList));
        hideExtraFilms();
        setupFilmsLoader();
        if (filteredFilms.length === 0) {
          messageContainer.classList.remove(HIDDEN_CLASS);
          messageContainer.textContent = Message.SEARCH;
        }
      });
  };

  searchContainer.appendChild(searchComponent.render());
};
