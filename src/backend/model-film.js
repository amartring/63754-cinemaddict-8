export default class ModelFilm {
  constructor(data) {
    this.id = data[`id`];
    this.comments = data[`comments`] || [];
    this.title = data.film_info[`title`];
    this.altTitle = data.film_info[`alternative_title`] || ``;
    this.poster = data.film_info[`poster`];
    this.description = data.film_info[`description`];
    this.totalRating = data.film_info[`total_rating`] || ``;
    this.actors = data.film_info[`actors`];
    this.restriction = data.film_info[`age_rating`];
    this.director = data.film_info[`director`];
    this.writers = data.film_info[`writers`];
    this.genre = data.film_info[`genre`] || [];
    this.duration = data.film_info[`runtime`];
    this.date = new Date(data.film_info.release[`date`]);
    this.country = data.film_info.release[`release_country`];
    this.isOnWatchlist = data.user_details[`watchlist`];
    this.isWatched = data.user_details[`already_watched`];
    this.isFavorite = data.user_details[`favorite`];
    this.userRating = data.user_details[`personal_rating`];
    this.userDate = new Date(data.user_details[`watching_date`]);
  }

  toRAW() {
    return {
      'id': this.id,
      'comments': this.comments,
      'title': this.title,
      'alternative_title': this.altTitle,
      'poster': this.poster,
      'description': this.description,
      'totalRating': this.totalRating,
      'actors': this.actors,
      'restriction': this.restriction,
      'director': this.director,
      'writers': this.writers,
      'genre': this.genre,
      'duration': this.duration,
      'date': this.date,
      'country': this.country,
      'watchlist': this.isOnWatchlist,
      'already_watched': this.isWatched,
      'favorite': this.isFavorite,
      'personal_rating': this.userRating,
      'watching_date': this.userDate,
    };
  }

  static parseFilm(data) {
    return new ModelFilm(data);
  }

  static parseFilms(data) {
    return data.map(ModelFilm.parseFilm);
  }
}
