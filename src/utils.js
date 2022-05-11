const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const shuffleArray = (arr) => {
  const myArr = arr.slice();
  // for (let i = 0; i < myArr.length; i++) {
  //   const randomIndex = getRandomInteger(1, myArr.length - 1);
  //   const curr = myArr[i];
  //   myArr[i] = myArr[randomIndex];
  //   myArr[randomIndex] = curr;
  // }
  for (let it of myArr) {
    const randomIndex = getRandomInteger(1, myArr.length - 1);
    const curr = it;
    it = myArr[randomIndex];
    myArr[randomIndex] = curr;
  }
  return myArr;
};

export {getRandomInteger, shuffleArray};
