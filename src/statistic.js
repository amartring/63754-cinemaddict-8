import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import Component from './component.js';
import moment from 'moment';
import {createElement} from './create-element.js';
import {objectToSortedArray, rank} from './util.js';

export default class Statistic extends Component {
  constructor(data) {
    super();
    this._films = data;
    this._watchedFilms = data.filter((it) => it.isWatched);

    this._onFilterChange = this._onFilterChange.bind(this);

    this._onFilter = null;
  }

  // eslint-disable-next-line consistent-return
  _filterByTime(filterValue) {
    switch (filterValue) {
      case `all-time`:
        return this._watchedFilms;

      case `today`:
        return this._watchedFilms.filter((it) =>
          moment(it.userDate).format(`D MMMM YYYY`) === moment().format(`D MMMM YYYY`));

      case `week`:
        return this._watchedFilms.filter((it) =>
          moment(it.userDate).isAfter(moment().subtract(7, `days`)));

      case `month`:
        return this._watchedFilms.filter((it) =>
          moment(it.userDate).isAfter(moment().subtract(1, `months`)));

      case `year`:
        return this._watchedFilms.filter((it) =>
          moment(it.userDate).isAfter(moment().subtract(1, `year`)));
    }
  }

  _filterByGenre(films) {
    const data = {};

    const allGenres = films.map((it) => it.genre);
    const uniqueGenres = new Set(allGenres);
    uniqueGenres.forEach((it) => {
      data[it] = allGenres.filter((genre) => genre === it).length;
    });

    const datas = objectToSortedArray(data);
    const genres = datas.map((it) => it[0]);
    const genresCounts = datas.map((it) => it[1]);

    return [genres, genresCounts];
  }

  _getChartData(films) {
    const [genresLabels, genresCounts] = this._filterByGenre(films);

    const statsWrapper = this._element.querySelector(`.statistic__chart`);
    const BAR_HEIGHT = 50;
    statsWrapper.height = BAR_HEIGHT * genresLabels.length;

    this._genreChart = new Chart(statsWrapper, this._getChart());

    this._genreChart.data = {
      labels: genresLabels,
      datasets: [{
        data: genresCounts,
        backgroundColor: `#ffe800`,
        hoverBackgroundColor: `#ffe800`,
        anchor: `start`
      }]
    };

    this._genreChart.update();
  }

  _getChart() {
    return {
      plugins: [ChartDataLabels],
      type: `horizontalBar`,
      options: {
        plugins: {
          datalabels: {
            font: {
              size: 20
            },
            color: `#ffffff`,
            anchor: `start`,
            align: `start`,
            offset: 40,
          }
        },
        scales: {
          yAxes: [{
            ticks: {
              fontColor: `#ffffff`,
              padding: 100,
              fontSize: 20
            },
            gridLines: {
              display: false,
              drawBorder: false
            },
            barThickness: 24
          }],
          xAxes: [{
            ticks: {
              display: false,
              beginAtZero: true
            },
            gridLines: {
              display: false,
              drawBorder: false
            },
          }],
        },
        legend: {
          display: false
        },
        tooltips: {
          enabled: false
        }
      }
    };
  }

  _getTopGenre(films) {
    const [genresLabels, genresCounts] = this._filterByGenre(films);
    const maxCount = Math.max(...genresCounts);
    const maxIndex = genresCounts.indexOf(maxCount);
    return genresLabels[maxIndex];
  }

  _getRank(films) {
    const genre = this._getTopGenre(films);
    return rank[genre];
  }

  _getDurationTemplate(films) {
    const allDurations = films.map((it) => it.duration);
    const totalDuration = allDurations.reduce((it, next) => it + next);
    return `
      ${moment.duration(totalDuration).hours()}
      <span class="statistic__item-description">h</span>
      ${moment.duration(totalDuration).minutes()}
      <span class="statistic__item-description">m</span>
    `;
  }

  _getTopGenreTemplate(films) {
    const genre = this._getTopGenre(films);
    return `${genre ? genre : `-`}`;
  }

  _getWatchedTemplate(films) {
    return `
      <span class="statistic__item-text--count">
        ${films.length}
      </span>
      <span class="statistic__item-description">
        movie${films.length === 1 ? `` : `s`}
      </span>
    `;
  }

  _onFilterChange(evt) {
    evt.preventDefault();
    const target = evt.target;

    target.checked = true;

    const filteredDatas = this._filterByTime(target.value);

    this._element.querySelector(`.statistic__item-text--duration`).innerHTML = this._getDurationTemplate(filteredDatas);
    this._element.querySelector(`.statistic__item-text--top-genre`).innerHTML = this._getTopGenreTemplate(filteredDatas);
    this._element.querySelector(`.statistic__item-text--count`).innerHTML = this._getWatchedTemplate(filteredDatas);
    this._element.querySelector(`.statistic__rank-label`).innerHTML = this._getRank(filteredDatas);

    this._genreChart.destroy();
    this._getChartData(filteredDatas);
  }

  set onFilter(fn) {
    this._onFilter = fn;
  }

  get template() {
    return `
      <div>
        <p class="statistic__rank">Your rank <span class="statistic__rank-label">${this._getRank(this._watchedFilms)}</span></p>

        <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
          <p class="statistic__filters-description">Show stats:</p>

          <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-all-time" value="all-time" checked>
          <label for="statistic-all-time" class="statistic__filters-label">All time</label>

          <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-today" value="today">
          <label for="statistic-today" class="statistic__filters-label">Today</label>

          <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-week" value="week">
          <label for="statistic-week" class="statistic__filters-label">Week</label>

          <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-month" value="month">
          <label for="statistic-month" class="statistic__filters-label">Month</label>

          <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-year" value="year">
          <label for="statistic-year" class="statistic__filters-label">Year</label>
        </form>

        <ul class="statistic__text-list">
          <li class="statistic__text-item">
            <h4 class="statistic__item-title">You watched</h4>
            <p class="statistic__item-text statistic__item-text--count">
              ${this._getWatchedTemplate(this._watchedFilms)}
            </p>
          </li>
          <li class="statistic__text-item">
            <h4 class="statistic__item-title">Total duration</h4>
            <p class="statistic__item-text statistic__item-text--duration">
              ${this._getDurationTemplate(this._watchedFilms)}
            </p>
          </li>
          <li class="statistic__text-item">
            <h4 class="statistic__item-title">Top genre</h4>
            <p class="statistic__item-text statistic__item-text--top-genre">
              ${this._getTopGenreTemplate(this._watchedFilms)}
            </p>
          </li>
        </ul>

        <div class="statistic__chart-wrap">
          <canvas class="statistic__chart" width="1000"></canvas>
        </div>
      </div>`.trim();
  }

  bind() {
    this._element.querySelectorAll(`.statistic__filters-input`).forEach((it) =>
      it.addEventListener(`click`, this._onFilterChange));
  }

  unbind() {
    this._element.querySelectorAll(`.statistic__filters-input`).forEach((it) =>
      it.removeEventListener(`click`, this._onFilterChange));
    this._onClick = null;
  }

  render() {
    this._element = createElement(this.template);
    this._getChartData(this._watchedFilms);
    this.bind();
    return this._element;
  }
}

