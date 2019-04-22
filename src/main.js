import Film from './films/film';
import FilmExtra from './films/film-extra';
import API from './backend/api';
import {renderFilms} from './films/setup-films';
import {renderSearch} from './search/setup-search';
import {renderStatistic} from './statistic/setup-satistic';
import filters from './filters/filters-data';
import {renderFilters} from './filters/setup-filters';
import {updateRating, setupFooterStats, setupFilmsLoader, hideExtraFilms} from './setup-main';
import {getRatedFilms, getCommentedFilms, filmsContainer, messageContainer} from './util';
import {HIDDEN_CLASS, AUTHORIZATION, END_POINT, Message} from './constants';

export const api = new API({endPoint: END_POINT, authorization: AUTHORIZATION});

const filmLists = filmsContainer.querySelectorAll(`.films-list__container`);
export const mainList = filmLists[0];
const ratedList = filmLists[1];
const commentedList = filmLists[2];

const showLoadingMessage = (text) => {
  messageContainer.classList.remove(HIDDEN_CLASS);
  messageContainer.textContent = text;
};

const hideLoadingMessage = () => {
  messageContainer.classList.add(HIDDEN_CLASS);
};

showLoadingMessage(Message.LOADING);

api.getFilms()
  .then((films) => {
    hideLoadingMessage();
    renderFilms(films, Film, mainList);
    hideExtraFilms();
    setupFilmsLoader();
    renderFilms(getRatedFilms(films), FilmExtra, ratedList);
    renderFilms(getCommentedFilms(films), FilmExtra, commentedList);
    renderFilters(filters, films);
    renderSearch();
    renderStatistic(films);
    setupFooterStats();
    updateRating();
  })
  .catch(() => {
    showLoadingMessage(Message.ERROR);
  });
