import {getRandomNumber} from './util';

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
    [`Pikachu `, `Bigfoot `, `Stranger `, `Mr. President `, `House M.D. `],
    [`killed someone `, `fell in love `, `slipped `, `got lost `, `fought `],
    [`in the mountains`, `in NY`, `on the moon`, `in the attic`, `in the cave`],
  ],
  picture: [
    `accused`,
    `blackmail`,
    `blue-blazes`,
    `fuga-da-new-york`,
    `moonrise`,
    `three-friends`,
  ][Math.floor(Math.random() * 6)],
  description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Cras aliquet varius magna, non porta ligula feugiat eget.
                Fusce tristique felis at fermentum pharetra.
                Aliquam id orci ut lectus varius viverra.
                Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.
                Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.
                Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.
                Sed sed nisi sed augue convallis suscipit in sed felis.
                Aliquam erat volutpat.
                Nunc fermentum tortor ac porta dapibus.
                In rutrum ac purus sit amet tempus`,
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
