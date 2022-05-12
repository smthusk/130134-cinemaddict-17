import {getRandomInteger, shuffleArray} from '../utils.js';
import dayjs from 'dayjs';

const generateAuthor = () => {
  const authors = [
    'Ilya O\'Reilly',
    'Vasia Pupkin',
    'Fedor Bondarchuk',
    'Stepan Ivanov',
    'Peter The First',
    'Jack Sparrow'
  ];

  const randomIndex = getRandomInteger(0, authors.length - 1);

  return authors[randomIndex];
};

const generateEmoji = () => {
  const emoji = ['smile', 'sleeping', 'puke', 'angry'];

  const randomIndex = getRandomInteger(0, emoji.length - 1);

  return emoji[randomIndex];
};

const generateDescription = () => {
  const descr = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.';
  const descriptions = descr.split('. ');
  return shuffleArray(descriptions).slice(1, getRandomInteger(2, 6)).join('. ');
};

const generateDate = () => {
  const maxDaysGap = 355;
  const daysGap = getRandomInteger(-maxDaysGap, 0);

  return dayjs().add(daysGap, 'day').toDate();
};

let id = 0;

export const generateComment = () => ({
  'id': id++,
  'author': generateAuthor(),
  'comment': generateDescription(),
  'date': generateDate(),
  'emotion': generateEmoji()
});
