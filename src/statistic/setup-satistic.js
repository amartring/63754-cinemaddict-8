import Statistic from './statistic';
import {filmsContainer, statsContainer} from '../util';
import {HIDDEN_CLASS} from '../constants';

const statsLink = document.querySelector(`.main-navigation__item--additional`);

export const renderStatistic = (data) => {
  statsContainer.innerHTML = ``;
  const statsComponent = new Statistic(data);
  statsContainer.appendChild(statsComponent.render());
};

const onStatsClick = () => {
  filmsContainer.classList.add(HIDDEN_CLASS);
  statsContainer.classList.remove(HIDDEN_CLASS);
};

statsLink.addEventListener(`click`, onStatsClick);
