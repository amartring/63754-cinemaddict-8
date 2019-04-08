const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const randomNumber = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[randomNumber];
    array[randomNumber] = temp;
  }
  return array;
};

const objectToSortedArray = (object) => {
  const arrayOfProperties = Object.keys(object).map((key) => [key, object[key]]);
  const compare = (firstCount, secondCount) => secondCount[1] - firstCount[1];
  return arrayOfProperties.sort(compare);
};

const rank = {
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

export {getRandomNumber, shuffleArray, objectToSortedArray, rank};
