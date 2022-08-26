export const getPercent = (size, percent) => {
  return (percent * size) / 100;
};

export const randomNumInRange = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const randomHeight2Pipe = (screenHeight, maxPer) => {
  const upPer = randomNumInRange(20, maxPer);
  const downPer = maxPer - upPer;

  const upHeight = getPercent(screenHeight, upPer);
  const downHeight = getPercent(screenHeight, downPer);

  return { upHeight, downHeight };
};

export const listener = (type, handler, target = window) => {
  target.addEventListener(type, handler, { passive: false });
  return () => {
    target.removeEventListener(type, handler);
  };
};
