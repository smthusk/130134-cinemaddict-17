const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const shuffleArray = (arr) => {
  const shuffledArray = arr.slice();
  for (let it of shuffledArray) {
    const randomIndex = getRandomInteger(1, shuffledArray.length - 1);
    const curr = it;
    it = shuffledArray[randomIndex];
    shuffledArray[randomIndex] = curr;
  }
  return shuffledArray;
};

const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1),
  ];
};

export {getRandomInteger, shuffleArray, updateItem};
