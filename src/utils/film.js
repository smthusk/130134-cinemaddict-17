import dayjs from 'dayjs';

const humanizeFilmDuration = (runtime) => {
  const hours = Math.floor(runtime / 60);
  const minutes = runtime % 60;

  return `${hours}h ${minutes}m`;
};

const humanizeFilmYear = (dueDate) => dayjs(dueDate).format('YYYY');

const humanizeCommentDate = (dueDate) => dayjs(dueDate).format('YYYY/MM/D H:MM');

const humanizeFilmReleaseDate = (dueDate) => dayjs(dueDate).format('DD MMMM YYYY');

export {humanizeFilmDuration, humanizeCommentDate, humanizeFilmReleaseDate, humanizeFilmYear};
