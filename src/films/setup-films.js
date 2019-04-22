import Popup from './popup';
import {api} from '../main';
import {updateRating} from '../setup-main';
import {HIDDEN_CLASS} from '../constants';

const body = document.querySelector(`body`);

const updateFilterCount = (id, state) => {
  let count = +(document.querySelector(id).textContent);
  state ? count++ : count--;
  document.querySelector(id).textContent = count;
  count ? document.querySelector(id).classList.remove(HIDDEN_CLASS) : document.querySelector(id).classList.add(HIDDEN_CLASS);
};

export const renderFilms = (data, FilmConstructor, container) => {
  data.forEach((item) => {
    const filmComponent = new FilmConstructor(item);

    filmComponent.onClick = (newObj) => {
      const popupComponent = new Popup(item);
      popupComponent.update((Object.assign(item, newObj)));

      popupComponent.onClose = (newObject) => {
        item = Object.assign(item, newObject);

        api.updateFilms({id: item.id, data: item.toRAW()})
        .then((newFilm) => {
          filmComponent.update(newFilm);
          popupComponent.update(newFilm);
          body.removeChild(popupComponent.element);
          popupComponent.unrender();
        });
      };

      popupComponent.render();
      body.appendChild(popupComponent.element);
    };

    filmComponent.onAddToWatchList = (newObj) => {
      filmComponent.update((Object.assign(item, newObj)));
      updateFilterCount(`#watchlist`, filmComponent._isOnWatchlist);
    };

    filmComponent.onMarkAsWatched = (newObj) => {
      filmComponent.update((Object.assign(item, newObj)));
      updateFilterCount(`#history`, filmComponent._isWatched);
      updateRating();
    };

    filmComponent.onMarkAsFavorite = (newObj) => {
      filmComponent.update((Object.assign(item, newObj)));
      updateFilterCount(`#favorites`, filmComponent._isFavorite);
    };

    container.appendChild(filmComponent.render());
  });
};
