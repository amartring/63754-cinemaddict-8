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

export default () => ({
  title: [
    `Pikachu got lost in NY`,
    `Bigfoot slipped on the moon`,
    `Stranger killed someone in the cave`,
    `Mr. President fell in love in the mountains`,
    `House M.D. fought in the attic`,
  ][Math.floor(Math.random() * 5)],
  picture: [
    `accused`,
    `blackmail`,
    `blue-blazes`,
    `fuga-da-new-york`,
    `moonrise`,
    `three-friends`,
  ][Math.floor(Math.random() * 6)],
  description: getDescription(),
  rating: getRatings()[Math.floor(Math.random() * 34)],
  year: getRandomNumber(1940, 2018),
  duration: [`1:30`, `1:40`, `1:50`, `2:00`, `2:10`][Math.floor(Math.random() * 5)],
  genre: [
    `comedy`,
    `horror`,
    `thriller`,
    `drama`,
    `fantasy`,
    `detective`,
  ][Math.floor(Math.random() * 6)],
  comments: getRandomNumber(0, 200),
});
