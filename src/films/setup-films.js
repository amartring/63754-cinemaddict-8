import Popup from './popup';
import filters from '../filters/filters-data';
import {renderFilters} from '../filters/setup-filters';
import {renderStatistic} from '../statistic/setup-satistic';
import {api} from '../main';
import {updateRating} from '../setup-main';

const body = document.querySelector(`body`);

export const renderFilms = (data, FilmConstructor, container) => {
  data.forEach((item) => {
    const filmComponent = new FilmConstructor(item);

    filmComponent.onClick = (newObj) => {
      const popupComponent = new Popup(item);
      popupComponent.update((Object.assign(item, newObj)));

      popupComponent.onClose = (newObject) => {
        item = Object.assign(item, newObject);

        api.updateFilm({id: item.id, data: item.toRAW()})
        .then((newFilm) => {
          filmComponent.update(newFilm);
          popupComponent.update(newFilm);
          body.removeChild(popupComponent.element);
          popupComponent.unrender();
          renderFilters(filters, data);
          renderStatistic(data);
          updateRating(data);
        });
      };

      popupComponent.render();
      body.appendChild(popupComponent.element);
    };

    filmComponent.onAddToWatchList = (newObj) => {
      // item.isWatched = !item.isWatched;
      item = Object.assign(item, newObj);
      api.updateFilm({id: item.id, data: item.toRAW()});
      renderFilters(filters, data);
      renderStatistic(data);
    };

    filmComponent.onMarkAsWatched = (newObj) => {
      item = Object.assign(item, newObj);
      api.updateFilm({id: item.id, data: item.toRAW()});
      renderFilters(filters, data);
      renderStatistic(data);
      updateRating(data);
    };

    filmComponent.onMarkAsFavorite = (newObj) => {
      item = Object.assign(item, newObj);
      api.updateFilm({id: item.id, data: item.toRAW()});
      renderFilters(filters, data);
      renderStatistic(data);
    };

    container.appendChild(filmComponent.render());
  });
};
