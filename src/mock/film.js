import {getRandomInteger, shuffleArray} from '../utils.js';
import dayjs from 'dayjs';

const generateComments = () => {
  const commentsCount = getRandomInteger(0, 522);
  const comments = () => commentsCount;
  return commentsCount ? Array.from({length: commentsCount}, comments) : [];
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
  "id": "0",
  "comments": generateComments(),
  "film_info": {
    "title": generateTitle(),
    "alternative_title": generateTitle(),
    "total_rating": getRandomInteger(0, 10),
    "poster": generatePoster(),
    "age_rating": getRandomInteger(0, 18),
    "director": "Tom Ford",
    "writers": [
      "Takeshi Kitano"
    ],
    "actors": [
      "Morgan Freeman"
    ],
    "release": {
      "date": generateDate(),
      "release_country": "Finland"
    },
    "runtime": getRandomInteger(25, 160),
    "genre": [
      "Comedy"
    ],
    "description": generateDescription()
  },
  "user_details": {
    "watchlist": getRandomInteger(0, 1),
    "already_watched": getRandomInteger(0, 1),
    "watching_date": generateDate(),
    "favorite": getRandomInteger(0, 1)
  }
});
