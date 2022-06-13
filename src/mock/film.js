import {getRandomInteger, shuffleArray} from '../utils/common.js';
import dayjs from 'dayjs';
import {nanoid} from 'nanoid';

const generateCommentsId = () => {
  const commentsCount = getRandomInteger(0, 15);
  return commentsCount ? Array.from(Array(commentsCount).keys()) : [];
};
const generateTitle = () => {
  const titles = [
    'Sharknado 4',
    'Titanic',
    'Django Unchained',
    'WALL·E',
    'Aliens',
    'Fight Club',
    'Goodfellas'
  ];

  const randomIndex = getRandomInteger(0, titles.length - 1);

  return titles[randomIndex];
};
const generatePoster = () => {
  const POSTERS = [
    'made-for-each-other.png',
    'popeye-meets-sinbad.png',
    'sagebrush-trail.jpg',
    'santa-claus-conquers-the-martians.jpg',
    'the-dance-of-life.jpg',
    'the-great-flamarion.jpg',
    'the-man-with-the-golden-arm.jpg'
  ];

  const randomIndex = getRandomInteger(0, POSTERS.length - 1);

  return `./images/posters/${POSTERS[randomIndex]}`;
};
const generateDate = () => {
  const maxYearsGap = 55;
  const yearsGap = getRandomInteger(-maxYearsGap, 0);

  return dayjs().add(yearsGap, 'year').toDate();
};

const generateDescription = () => {
  const descr = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.';
  const descriptions = descr.split('. ');
  return shuffleArray(descriptions).slice(1, getRandomInteger(2, 6)).join('. ');
};

export const generateFilm = () => ({
  'id': nanoid(),
  'comments': generateCommentsId(),
  'filmInfo': {
    'title': generateTitle(),
    'alternativeTitle': generateTitle(),
    'totalRating': getRandomInteger(0, 10),
    'poster': generatePoster(),
    'ageRating': getRandomInteger(0, 18),
    'director': 'Tom Ford',
    'writers': [
      'Takeshi Kitano',
      'Makoto Shinkai'
    ],
    'actors': [
      'Morgan Freeman',
      'Yura Borisov',
      'Masha Andreeva'
    ],
    'release': {
      'date': generateDate(),
      'releaseCountry': 'Finland'
    },
    'runtime': getRandomInteger(25, 160),
    'genre': [
      'Comedy',
      'Action'
    ],
    'description': generateDescription()
  },
  'userDetails': {
    'watchlist': getRandomInteger(0, 1),
    'alreadyWatched': getRandomInteger(0, 1),
    'watchingDate': generateDate(),
    'favorite': getRandomInteger(0, 1)
  }
});
