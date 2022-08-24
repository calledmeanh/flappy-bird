export const getPercent = (size, percent) => {
  return (percent * size) / 100;
};

export const randomNumInRange = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const randomHeightPipe = (screenHeight) => {
  // make sure the total height of two pipes is 60 <= h <= 80
  const percent = randomNumInRange(30, 40);
  const height = getPercent(screenHeight, percent);

  return height;
};

export const listener = (type, handler, target = window) => {
  target.addEventListener(type, handler, { passive: false });
  return () => {
    target.removeEventListener(type, handler);
  };
};
