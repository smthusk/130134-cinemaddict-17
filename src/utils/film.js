import dayjs from 'dayjs';

const humanizeFilmDuration = (runtime) => {
  const hours = Math.floor(runtime / 60);
  const minutes = runtime % 60;

  return `${hours}h ${minutes}m`;
};

const humanizeFilmYear = (dueDate) => dayjs(dueDate).format('YYYY');

const humanizeCommentDate = (dueDate) => dayjs(dueDate).format('YYYY/MM/D H:MM');

const humanizeFilmReleaseDate = (dueDate) => dayjs(dueDate).format('DD MMMM YYYY');

const getWeightForNullDate = (dateA, dateB) => {
  if (dateA === null && dateB === null) {
    return 0;
  }

  if (dateA === null) {
    return 1;
  }

  if (dateB === null) {
    return -1;
  }

  return null;
};

const sortByDate = (filmA, filmB) => {
  const weight = getWeightForNullDate(filmA.filmInfo.release.date, filmB.filmInfo.release.date);

  return weight ?? dayjs(filmB.filmInfo.release.date).diff(dayjs(filmA.filmInfo.release.date));
};

const sortByRating = (filmA, filmB) => filmB.filmInfo.totalRating - filmA.filmInfo.totalRating;

export {humanizeFilmDuration, humanizeCommentDate, humanizeFilmReleaseDate, humanizeFilmYear, sortByDate, sortByRating};
