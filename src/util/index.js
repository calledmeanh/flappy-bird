export const getPercent = (size, percent) => {
  return (percent * size) / 100;
};

export const randomNumInRange = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const randomHeightPipe = (screenHeight, maxPer) => {
  const upPer = randomNumInRange(20, maxPer);
  const downPer = maxPer - upPer;

  const upHeight = getPercent(screenHeight, upPer);
  const downHeight = getPercent(screenHeight, downPer);
  const midHeight = getPercent(screenHeight, 100 - upPer + downPer);
  return { upHeight, midHeight, downHeight };
};

export const listener = (type, handler, target = window) => {
  target.addEventListener(type, handler, { passive: false });
  return () => {
    target.removeEventListener(type, handler);
  };
};

export const checkRectCollision = (rect1, rect2) => {
  if (
    rect1.x < rect2.x + rect2.w &&
    rect1.x + rect1.w > rect2.x &&
    rect1.y < rect2.y + rect2.h &&
    rect1.h + rect1.y > rect2.y
  ) {
    return true;
  } else {
    return false;
  }
};
