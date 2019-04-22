export const filmsContainer = document.querySelector(`.films`);
export const statsContainer = document.querySelector(`.statistic`);
export const messageContainer = document.querySelector(`.films-list__title`);

export const objectToSortedArray = (object) => {
  const arrayOfProperties = Object.keys(object).map((key) => [key, object[key]]);
  const compare = (firstCount, secondCount) => secondCount[1] - firstCount[1];
  return arrayOfProperties.sort(compare);
};

export const getRatedFilms = (data) => {
  return data.slice()
    .sort((left, right) => Number(right.totalRating) - Number(left.totalRating)).slice(0, 2);
};

export const getCommentedFilms = (data) => {
  return data.slice()
    .sort((left, right) => right.comments.length - left.comments.length).slice(0, 2);
};

export const rank = {
  'Comedy': `Harley Quinn`,
  'Thriller': `Thrill-seeker`,
  'Drama': `William Shakespeare`,
  'Animation': `Bugs Bunny`,
  'Adventure': `Dr. Henry Jones`,
  'Action': `Bruce Willis`,
  'Sci-Fi': `Doctor Who`,
  'Family': `Mary Poppins`,
  'Horror': `Freddy Krueger`,
};
