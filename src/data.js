import {shuffleArray, getRandomNumber} from './util';

const getDescription = () => {
  const description = `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Cras aliquet varius magna, non porta ligula feugiat eget.
                      Fusce tristique felis at fermentum pharetra.
                      Aliquam id orci ut lectus varius viverra.
                      Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.
                      Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.
                      Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.
                      Sed sed nisi sed augue convallis suscipit in sed felis.
                      Aliquam erat volutpat.
                      Nunc fermentum tortor ac porta dapibus.
                      In rutrum ac purus sit amet tempus`;
  return shuffleArray(description
    .split(`.`))
    .splice(Math.floor(Math.random() * 8), Math.floor(1 + Math.random() * 3))
    .join(`. `);
};

const getActors = () => {
  const actors = [
    `Leonardo DiCaprio`,
    `Brad Pitt`,
    `Sophie Marceau`,
    `James McAvoy`,
    `Penélope Cruz`,
    `Javier Bardem`,
    `Keira Knightley`,
    `Lena Headey`,
    `Vincent Perez`,
    `John Travolta`,
    `Samuel L. Jackson`,
    `Tim Roth`,
    `Christoph Waltz`,
  ];
  return shuffleArray(actors)
    .splice(Math.floor(Math.random() * 8), Math.floor(1 + Math.random() * 3))
    .join(`, `);
};

const getRatings = () => {
  const interval = {
    MIN: 6.5,
    MAX: 9.8,
    STEP: 0.1
  };
  const rating = [];
  for (let i = interval.MIN; i <= interval.MAX; i += interval.STEP) {
    rating.push(i.toFixed(1));
  }
  return rating;
};

const getDate = () => `${getRandomNumber(1986, 2010)}-${getRandomNumber(1, 12)}-${getRandomNumber(1, 28)}`;

const film = () => ({
  title: [
    `The Shawshank Redemption`,
    `The Green Mile`,
    `Forrest Gump`,
    `Schindler's List`,
    `Intouchables`,
    `Léon`,
    `Inception`,
    `The Lion King`,
    `Fight Club`,
    `La vita è bella`,
  ][Math.floor(Math.random() * 10)],
  director: [
    `Frank Darabont`,
    `Robert Zemeckis`,
    `Steven Spielberg`,
    `David Fincher`,
    `Luc Besson`,
    `Christopher Nolan`,
    `Roberto Benigni`,
    `Quentin Tarantino`,
    `James Cameron`,
  ][Math.floor(Math.random() * 9)],
  writer: [
    `Stephen King`,
    `Luc Besson`,
    `Christopher Nolan`,
    `Quentin Tarantino`,
    `Chuck Palahniuk`,
    `Roberto Benigni`,
    `James Cameron`,
  ][Math.floor(Math.random() * 7)],
  country: [
    `USA`,
    `France`,
    `Germany`,
    `Italy`,
    `Spain`,
    `United Kingdom`,
  ][Math.floor(Math.random() * 6)],
  actors: getActors(),
  picture: [
    `accused`,
    `blackmail`,
    `blue-blazes`,
    `fuga-da-new-york`,
    `moonrise`,
    `three-friends`,
  ][Math.floor(Math.random() * 6)],
  restriction: [0, 6, 12, 16, 18][Math.floor(Math.random() * 5)],
  description: getDescription(),
  rating: getRatings()[Math.floor(Math.random() * 34)],
  userRating: getRandomNumber(1, 9),
  date: getDate(),
  duration: getRandomNumber(5280000, 11700000),
  genre: [
    `comedy`,
    `biopic`,
    `thriller`,
    `drama`,
    `fantasy`,
    `detective`,
    `cartoon`,
    `crime`,
  ][Math.floor(Math.random() * 8)],
  commentsCount: getRandomNumber(0, 200),
  comments: [
    {
      text: `So long-long story, boring!`,
      author: `Tim Macoveev`,
      emoji: `😴`,
      date: Date.now(),
    }
  ],
  isOnWatchlist: false,
  isWatched: false,
  isFavorite: false,
});

const filters = [
  {
    name: `All movies`,
    count: null,
    isActive: true,
  },
  {
    name: `Watchlist`,
    count: 13,
    isActive: false,
  },
  {
    name: `History`,
    count: 4,
    isActive: false,
  },
  {
    name: `Favorites`,
    count: 8,
    isActive: false,
  }
];

export {film, filters};
