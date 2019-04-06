import Component from './component.js';
import moment from 'moment';

export default class Popup extends Component {
  constructor(data) {
    super();
    this._title = data.title;
    this._picture = data.picture;
    this._description = data.description;
    this._rating = data.rating;
    this._userRating = data.userRating;
    this._userDate = data.userDate;
    this._date = data.date;
    this._duration = data.duration;
    this._genre = data.genre;
    this._director = data.director;
    this._writer = data.writer;
    this._actors = data.actors;
    this._restriction = data.restriction;
    this._country = data.country;
    this._commentsCount = data.commentsCount;
    this._comments = data.comments;

    this._isOnWatchlist = data.isOnWatchlist;
    this._isWatched = data.isWatched;
    this._isFavorite = data.isFavorite;

    this._onPopupClose = this._onPopupClose.bind(this);
    this._onEmojiChange = this._onEmojiChange.bind(this);
    this._onCommentAdd = this._onCommentAdd.bind(this);
    this._onRatingChange = this._onRatingChange.bind(this);
    this._onWatchlistChange = this._onWatchlistChange.bind(this);
    this._onWatchedChange = this._onWatchedChange.bind(this);
    this._onFavoriteChange = this._onFavoriteChange.bind(this);

    this._onClose = null;

    this._htmlElement = `section`;
    this._classNames = [`film-details`];
  }

  _processForm(formData) {
    const entry = {
      userRating: ``,
      comments: this._comments,
      commentsCount: this._commentsCount,
      isOnWatchlist: this._isOnWatchlist,
      isWatched: this._isWatched,
      isFavorite: this._isFavorite,
    };

    const popupMapper = Popup.createMapper(entry);

    for (const pair of formData.entries()) {
      const [property, value] = pair;
      if (popupMapper[property]) {
        popupMapper[property](value);
      }
    }

    return entry;
  }

  _partialUpdate() {
    this._element.innerHTML = this.template;
  }

  _onPopupClose(evt) {
    evt.preventDefault();
    const formData = new FormData(this._element.querySelector(`.film-details__inner`));
    const newData = this._processForm(formData);

    if (typeof this._onClose === `function`) {
      this._onClose(newData);
    }

    this.update(newData);
  }

  _onEmojiChange() {
    const emoji = this._element.querySelector(`.film-details__emoji-item:checked + label`).textContent;
    this._element.querySelector(`.film-details__add-emoji-label`).innerHTML = emoji;
  }

  _onCommentAdd(evt) {
    const commentsList = this._element.querySelector(`.film-details__comments-list`);
    const commentField = this._element.querySelector(`.film-details__comment-input`);
    if (evt.ctrlKey && evt.keyCode === 13 && commentField.value) {
      const newComment = {};
      newComment.text = commentField.value;
      newComment.author = `Super Duper Alice Cooper`;
      newComment.emoji = this._element.querySelector(`.film-details__emoji-item:checked + label`).textContent;
      newComment.date = moment().toDate();

      this._comments.push(newComment);
      this._commentsCount++;
      this._element.querySelector(`.film-details__add-emoji`).checked = false;
      commentField.value = ``;

      commentsList.innerHTML = this._getCommentsTemplate();
      this.unbind();
      this._partialUpdate();
      this.bind();
    }
  }

  _onRatingChange() {
    this._userRating = this._element.querySelector(`.film-details__user-rating-input:checked`).value;
    this._element.querySelector(`.film-details__user-rating span`).innerHTML = this._userRating;
  }

  _onWatchlistChange() {
    this._isOnWatchlist = !this._isOnWatchlist;
    this.unbind();
    this._partialUpdate();
    this.bind();
  }

  _onWatchedChange() {
    this._isWatched = !this._isWatched;
    this.unbind();
    this._partialUpdate();
    this.bind();
  }

  _onFavoriteChange() {
    this._isFavorite = !this._isFavorite;
    this.unbind();
    this._partialUpdate();
    this.bind();
  }

  set onClose(fn) {
    this._onClose = fn;
  }

  _getCommentsTemplate() {
    return this._comments.map((comment) => `
      <li class="film-details__comment">
        <span class="film-details__comment-emoji">${comment.emoji}</span>
        <div>
          <p class="film-details__comment-text">${comment.text}</p>
          <p class="film-details__comment-info">
            <span class="film-details__comment-author">${comment.author}</span>
            <span class="film-details__comment-day">${moment(comment.date).startOf(`min`).fromNow()}</span>
          </p>
        </div>
      </li>`)
    .join(``);
  }

  get template() {
    return `
    <section class="film-details">
      <form class="film-details__inner" action="" method="get">
        <div class="film-details__close">
          <button class="film-details__close-btn" type="button">close</button>
        </div>
        <div class="film-details__info-wrap">
          <div class="film-details__poster">
            <img class="film-details__poster-img" src="images/posters/${this._picture}.jpg" alt="${this._picture}">
            <p class="film-details__age">${this._restriction}+</p>
          </div>

          <div class="film-details__info">
            <div class="film-details__info-head">
              <div class="film-details__title-wrap">
                <h3 class="film-details__title">${this._title}</h3>
                <p class="film-details__title-original">Original: ${this._title}</p>
              </div>

              <div class="film-details__rating">
                <p class="film-details__total-rating">${this._rating}</p>
                <p class="film-details__user-rating">Your rate <span>${this._userRating}</span></p>
              </div>
            </div>

            <table class="film-details__table">
              <tr class="film-details__row">
                <td class="film-details__term">Director</td>
                <td class="film-details__cell">${this._director}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Writers</td>
                <td class="film-details__cell">${this._writer}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Actors</td>
                <td class="film-details__cell">${this._actors}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Release Date</td>
                <td class="film-details__cell">${moment(this._date).format(`DD MMMM YYYY`)} (USA)</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Runtime</td>
                <td class="film-details__cell">${Math.floor(moment.duration(this._duration).asMinutes())} min</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Country</td>
                <td class="film-details__cell">${this._country}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Genres</td>
                <td class="film-details__cell">
                  <span class="film-details__genre">${this._genre}</span>
                </td>
              </tr>
            </table>

            <p class="film-details__film-description">${this._description}</p>
          </div>
        </div>

        <section class="film-details__controls">
          <input type="checkbox" class="film-details__control-input visually-hidden"
          id="watchlist" name="watchlist" ${this._isOnWatchlist && `checked`}>
          <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

          <input type="checkbox" class="film-details__control-input visually-hidden"
          id="watched" name="watched" ${this._isWatched && `checked`}>
          <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

          <input type="checkbox" class="film-details__control-input visually-hidden"
          id="favorite" name="favorite"  ${this._isFavorite && `checked`}>
          <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
        </section>

        <section class="film-details__comments-wrap">
          <h3 class="film-details__comments-title">
            Comments <span class="film-details__comments-count">${this._commentsCount}</span>
          </h3>

          <ul class="film-details__comments-list">
            ${this._getCommentsTemplate()}
          </ul>

          <div class="film-details__new-comment">
            <div>
              <label for="add-emoji" class="film-details__add-emoji-label">😐</label>
              <input type="checkbox" class="film-details__add-emoji visually-hidden" id="add-emoji">

              <div class="film-details__emoji-list">
                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
                <label class="film-details__emoji-label" for="emoji-sleeping">😴</label>

                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-neutral-face" value="neutral" checked>
                <label class="film-details__emoji-label" for="emoji-neutral-face">😐</label>

                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-grinning" value="grinning">
                <label class="film-details__emoji-label" for="emoji-grinning">😀</label>
              </div>
            </div>
            <label class="film-details__comment-label">
              <textarea class="film-details__comment-input" placeholder="← Select reaction, add comment here" name="comment"></textarea>
            </label>
          </div>
        </section>

        <section class="film-details__user-rating-wrap">
          <div class="film-details__user-rating-controls">
            <span class="film-details__watched-status film-details__watched-status--active">Already watched</span>
            <button class="film-details__watched-reset" type="button">undo</button>
          </div>

          <div class="film-details__user-score">
            <div class="film-details__user-rating-poster">
              <img src="images/posters/${this._picture}.jpg" alt="film-poster" class="film-details__user-rating-img">
            </div>

            <section class="film-details__user-rating-inner">
              <h3 class="film-details__user-rating-title">${this._title}</h3>

              <p class="film-details__user-rating-feelings">How you feel it?</p>

              <div class="film-details__user-rating-score">
                <input type="radio" name="score" class="film-details__user-rating-input visually-hidden"
                value="1" id="rating-1" ${this._userRating === 1 && `checked`}>
                <label class="film-details__user-rating-label" for="rating-1">1</label>

                <input type="radio" name="score" class="film-details__user-rating-input visually-hidden"
                value="2" id="rating-2" ${this._userRating === 2 && `checked`}>
                <label class="film-details__user-rating-label" for="rating-2">2</label>

                <input type="radio" name="score" class="film-details__user-rating-input visually-hidden"
                value="3" id="rating-3" ${this._userRating === 3 && `checked`}>
                <label class="film-details__user-rating-label" for="rating-3">3</label>

                <input type="radio" name="score" class="film-details__user-rating-input visually-hidden"
                value="4" id="rating-4" ${this._userRating === 4 && `checked`}>
                <label class="film-details__user-rating-label" for="rating-4">4</label>

                <input type="radio" name="score" class="film-details__user-rating-input visually-hidden"
                value="5" id="rating-5" ${this._userRating === 5 && `checked`}>
                <label class="film-details__user-rating-label" for="rating-5">5</label>

                <input type="radio" name="score" class="film-details__user-rating-input visually-hidden"
                value="6" id="rating-6" ${this._userRating === 6 && `checked`}>
                <label class="film-details__user-rating-label" for="rating-6">6</label>

                <input type="radio" name="score" class="film-details__user-rating-input visually-hidden"
                value="7" id="rating-7" ${this._userRating === 7 && `checked`}>
                <label class="film-details__user-rating-label" for="rating-7">7</label>

                <input type="radio" name="score" class="film-details__user-rating-input visually-hidden"
                value="8" id="rating-8" ${this._userRating === 8 && `checked`}>
                <label class="film-details__user-rating-label" for="rating-8">8</label>

                <input type="radio" name="score" class="film-details__user-rating-input visually-hidden"
                value="9" id="rating-9" ${this._userRating === 9 && `checked`}>
                <label class="film-details__user-rating-label" for="rating-9">9</label>

              </div>
            </section>
          </div>
        </section>
      </form>
    </section>`.trim();
  }

  bind() {
    this._element.querySelector(`.film-details__close-btn`)
        .addEventListener(`click`, this._onPopupClose);
    this._element.querySelector(`.film-details__emoji-list`)
        .addEventListener(`click`, this._onEmojiChange);
    this._element.querySelector(`.film-details__new-comment`)
        .addEventListener(`keydown`, this._onCommentAdd);
    this._element.querySelector(`.film-details__user-rating-score`)
        .addEventListener(`click`, this._onRatingChange);

    this._element.querySelector(`#watchlist`)
        .addEventListener(`click`, this._onWatchlistChange);
    this._element.querySelector(`#watched`)
        .addEventListener(`click`, this._onWatchedChange);
    this._element.querySelector(`#favorite`)
        .addEventListener(`click`, this._onFavoriteChange);
  }

  unbind() {
    this._element.querySelector(`.film-details__close-btn`)
        .removeEventListener(`click`, this._onCommentAdd);
    this._element.querySelector(`.film-details__emoji-list`)
        .removeEventListener(`click`, this._onEmojiChange);
    this._element.querySelector(`.film-details__new-comment`)
        .removeEventListener(`keydown`, this._onCommentAdd);
    this._element.querySelector(`.film-details__user-rating-score`)
        .removeEventListener(`click`, this._onRatingChange);

    this._element.querySelector(`#watchlist`)
        .removeEventListener(`click`, this._onWatchlistChange);
    this._element.querySelector(`#watched`)
        .removeEventListener(`click`, this._onWatchedChange);
    this._element.querySelector(`#favorite`)
        .removeEventListener(`click`, this._onFavoriteChange);
  }

  update(data) {
    this._commentsCount = data.commentsCount;
    this._userRating = data.userRating;
    this._isOnWatchlist = data.isOnWatchlist;
    this._isWatched = data.isWatched;
    this._isFavorite = data.isFavorite;
  }

  static createMapper(target) {
    return {
      score: (value) => {
        target.userRating = parseInt(value, 10);
      },
    };
  }
}
