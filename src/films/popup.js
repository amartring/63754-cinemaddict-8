import Component from '../component';
import moment from 'moment';
import {Message, KeyCode, DateFormate, MS_PER_MINUTE} from '../constants';

export default class Popup extends Component {
  constructor(data) {
    super();
    this._id = data.id;
    this._comments = data.comments;
    this._title = data.title;
    this._poster = data.poster;
    this._description = data.description;
    this._totalRating = data.totalRating;
    this._duration = data.duration;
    this._date = data.date;
    this._country = data.country;
    this._genre = data.genre;
    this._director = data.director;
    this._writers = data.writers;
    this._actors = data.actors;
    this._restriction = data.restriction;
    this._userRating = data.userRating;
    this._userDate = data.userDate;
    this._isOnWatchlist = data.isOnWatchlist;
    this._isWatched = data.isWatched;
    this._isFavorite = data.isFavorite;
    this._onCloseClick = this._onCloseClick.bind(this);
    this._onEscPress = this._onEscPress.bind(this);
    this._onEmojiChange = this._onEmojiChange.bind(this);
    this._onCommentAdd = this._onCommentAdd.bind(this);
    this._onCommentDelete = this._onCommentDelete.bind(this);
    this._onRatingChange = this._onRatingChange.bind(this);
    this._onWatchlistChange = this._onWatchlistChange.bind(this);
    this._onWatchedChange = this._onWatchedChange.bind(this);
    this._onFavoriteChange = this._onFavoriteChange.bind(this);
    this._onClose = null;
  }

  set onAddToWatchList(fn) {
    this._onAddToWatchList = fn;
  }

  set onMarkAsWatched(fn) {
    this._onMarkAsWatched = fn;
  }

  set onMarkAsFavorite(fn) {
    this._onMarkAsFavorite = fn;
  }

  set onClose(fn) {
    this._onClose = fn;
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
            <img class="film-details__poster-img" src="./${this._poster}" alt="film-poster">
            <p class="film-details__age">${this._restriction}+</p>
          </div>

          <div class="film-details__info">
            <div class="film-details__info-head">
              <div class="film-details__title-wrap">
                <h3 class="film-details__title">${this._title}</h3>
                <p class="film-details__title-original">Original: ${this._title}</p>
              </div>

              <div class="film-details__rating">
                <p class="film-details__total-rating">${this._totalRating}</p>
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
                <td class="film-details__cell">${this._writers.join(`, `)}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Actors</td>
                <td class="film-details__cell">${this._actors.join(`, `)}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Release Date</td>
                <td class="film-details__cell">${moment(this._date).format(DateFormate.POPUP)} (${this._country})</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Runtime</td>
                <td class="film-details__cell">${Math.floor(moment.duration(this._duration * MS_PER_MINUTE).asMinutes())} min</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Country</td>
                <td class="film-details__cell">${this._country}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Genres</td>
                <td class="film-details__cell">
                  <span class="film-details__genre">${this._genre.join(` `)}</span>
                </td>
              </tr>
            </table>

            <p class="film-details__film-description">${this._description}</p>
          </div>
        </div>

        <section class="film-details__controls">
          <input type="checkbox" class="film-details__control-input visually-hidden" id="toWatchlist" name="watchlist"
          ${this._isOnWatchlist && `checked`}>
          <label for="toWatchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

          <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched"
          ${this._isWatched && `checked`}>
          <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

          <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite"
          ${this._isFavorite && `checked`}>
          <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
        </section>

        <section class="film-details__comments-wrap">
          <h3 class="film-details__comments-title">
            Comments <span class="film-details__comments-count">${this._comments.length}</span>
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

                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-neutral-face" value="neutral-face" checked>
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
            <span class="film-details__watched-status"></span>
            <button class="film-details__watched-reset visually-hidden" type="button">undo</button>
          </div>

          <div class="film-details__user-score">
            <div class="film-details__user-rating-poster">
              <img src="./${this._poster}" alt="film-poster" class="film-details__user-rating-img">
            </div>

            <section class="film-details__user-rating-inner">
              <h3 class="film-details__user-rating-title">${this._title}</h3>

              <p class="film-details__user-rating-feelings">How you feel it?</p>

              <div class="film-details__user-rating-score">
                ${this._getUserRatingTemplate()}
              </div>
            </section>
          </div>
        </section>
      </form>
    </section>`.trim();
  }

  _getCommentsTemplate() {
    return this._comments.map((comment) => `
      <li class="film-details__comment">
        <span class="film-details__comment-emoji">${this._getEmoji(comment.emotion.split(`-`)[0])}</span>
        <div>
          <p class="film-details__comment-text">${comment.comment}</p>
          <p class="film-details__comment-info">
            <span class="film-details__comment-author">${comment.author}</span>
            <span class="film-details__comment-day">${moment(comment.date).fromNow()}</span>
          </p>
        </div>
      </li>`)
    .join(``);
  }

  _getUserRatingTemplate() {
    let result = ``;
    for (let i = 1; i <= 9; i++) {
      result += `
        <input type="radio" name="score" class="film-details__user-rating-input visually-hidden"
        value="${i}" id="rating-${i}" ${this._userRating === i && `checked`}>
        <label class="film-details__user-rating-label" for="rating-${i}">${i}</label>
      `;
    }
    return result;
  }

  _addNewComment() {
    const commentsList = this._element.querySelector(`.film-details__comments-list`);
    const commentField = this._element.querySelector(`.film-details__comment-input`);
    const newComment = {};
    newComment.comment = commentField.value;
    newComment.author = `Super Duper Alice Cooper`;
    newComment.emotion = this._element.querySelector(`.film-details__emoji-item:checked`).value;
    newComment.date = moment().toDate();

    this._comments.push(newComment);
    this._element.querySelector(`.film-details__add-emoji`).checked = false;
    commentField.value = ``;

    commentsList.innerHTML = this._getCommentsTemplate();
    this._partialUpdate();
    this._element.querySelector(`.film-details__watched-reset`).classList.remove(`visually-hidden`);
    this._element.querySelector(`.film-details__watched-status`).textContent = Message.COMMENT_ADD;
  }

  _deleteComment() {
    const commentsList = this._element.querySelector(`.film-details__comments-list`);
    const comment = this._comments.reverse().find((it) => it.author === `Super Duper Alice Cooper`);
    const index = this._comments.indexOf(comment);
    this._comments.splice(index, 1);
    commentsList.innerHTML = this._getCommentsTemplate();
    this._partialUpdate();
    this._element.querySelector(`.film-details__watched-reset`).classList.add(`visually-hidden`);
    this._element.querySelector(`.film-details__watched-status`).textContent = Message.COMMENT_DELETE;
  }

  _getEmoji(emo) {
    const emoji = {
      grinning: `😀`,
      sleeping: `😴`,
      neutral: `😐`,
    };
    return emoji[emo];
  }

  _onEmojiChange() {
    const emoji = this._element.querySelector(`.film-details__emoji-item:checked + label`).textContent;
    this._element.querySelector(`.film-details__add-emoji-label`).innerHTML = emoji;
  }

  _onCommentAdd(evt) {
    const commentField = this._element.querySelector(`.film-details__comment-input`);
    if ((evt.ctrlKey || evt.metaKey) && evt.keyCode === KeyCode.ENTER && commentField.value) {
      this._addNewComment();
    }
  }

  _onCommentDelete() {
    this._deleteComment();
  }

  _onRatingChange() {
    this._userRating = this._element.querySelector(`.film-details__user-rating-input:checked`).value;
    this._element.querySelector(`.film-details__user-rating span`).innerHTML = this._userRating;
  }

  _onWatchlistChange(evt) {
    evt.preventDefault();
    this._isOnWatchlist = !this._isOnWatchlist;
    this._partialUpdate();
  }

  _onWatchedChange(evt) {
    evt.preventDefault();
    this._isWatched = !this._isWatched;
    this._partialUpdate();
  }

  _onFavoriteChange(evt) {
    evt.preventDefault();
    this._isFavorite = !this._isFavorite;
    this._partialUpdate();
  }

  _onCloseClick(evt) {
    evt.preventDefault();
    const formData = new FormData(this._element.querySelector(`.film-details__inner`));
    const newData = this._processForm(formData);
    this.isFunction(this._onClose(newData));
    this.update(newData);
  }

  _onEscPress(evt) {
    if (evt.keyCode === KeyCode.ESC) {
      this._onCloseClick(evt);
    }
  }

  _processForm() {
    return {
      userRating: ``,
      comments: this._comments,
      isOnWatchlist: this._isOnWatchlist,
      isWatched: this._isWatched,
      isFavorite: this._isFavorite,
    };
  }

  _partialUpdate() {
    this.unbind();
    const oldElement = this._element;
    this._element = this.render();
    oldElement.parentNode.replaceChild(this._element, oldElement);
  }

  update(data) {
    this._userRating = data.userRating;
    this._isOnWatchlist = data.isOnWatchlist;
    this._isWatched = data.isWatched;
    this._isFavorite = data.isFavorite;
  }

  bind() {
    this._element.querySelector(`.film-details__close-btn`)
        .addEventListener(`click`, this._onCloseClick);
    document.addEventListener(`keydown`, this._onEscPress);
    this._element.querySelector(`.film-details__emoji-list`)
        .addEventListener(`click`, this._onEmojiChange);
    this._element.querySelector(`.film-details__new-comment`)
        .addEventListener(`keydown`, this._onCommentAdd);
    this._element.querySelector(`.film-details__watched-reset`)
        .addEventListener(`click`, this._onCommentDelete);
    this._element.querySelector(`.film-details__user-rating-score`)
        .addEventListener(`click`, this._onRatingChange);
    this._element.querySelector(`#toWatchlist`).addEventListener(`click`, this._onWatchlistChange);
    this._element.querySelector(`#watched`).addEventListener(`click`, this._onWatchedChange);
    this._element.querySelector(`#favorite`).addEventListener(`click`, this._onFavoriteChange);
  }

  unbind() {
    this._element.querySelector(`.film-details__close-btn`)
        .removeEventListener(`click`, this._onCloseClick);
    document.removeEventListener(`keydown`, this._onEscPress);
    this._element.querySelector(`.film-details__emoji-list`)
        .removeEventListener(`click`, this._onEmojiChange);
    this._element.querySelector(`.film-details__new-comment`)
        .removeEventListener(`keydown`, this._onCommentAdd);
    this._element.querySelector(`.film-details__watched-reset`)
        .removeEventListener(`click`, this._onCommentDelete);
    this._element.querySelector(`.film-details__user-rating-score`)
        .removeEventListener(`click`, this._onRatingChange);
    this._element.querySelector(`#toWatchlist`).removeEventListener(`click`, this._onWatchlistChange);
    this._element.querySelector(`#watched`).removeEventListener(`click`, this._onWatchedChange);
    this._element.querySelector(`#favorite`).removeEventListener(`click`, this._onFavoriteChange);
  }
}
