import zeroImg from '../asset/sprites/0.png';
import oneImg from '../asset/sprites/1.png';
import twoImg from '../asset/sprites/2.png';
import threeImg from '../asset/sprites/3.png';
import fourImg from '../asset/sprites/4.png';
import fiveImg from '../asset/sprites/5.png';
import sixImg from '../asset/sprites/6.png';
import sevenImg from '../asset/sprites/7.png';
import eightImg from '../asset/sprites/8.png';
import nineImg from '../asset/sprites/9.png';

export const getSizeByPercent = (size, percent) => (percent * size) / 100;

export const randomNumInRange = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const randomHeightPipe = (screenHeight, maxPer) => {
  const upPer = randomNumInRange(20, maxPer);
  const downPer = maxPer - upPer;

  const upHeight = getSizeByPercent(screenHeight, upPer);
  const downHeight = getSizeByPercent(screenHeight, downPer);
  const midHeight = getSizeByPercent(screenHeight, 100 - (upPer + downPer));
  return { upHeight, midHeight, downHeight };
};

export const getStateOfTime = () => {
  const hours = new Date().getHours();
  if (hours >= 6 && hours < 20) return true; // day
  return false; // night
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

export const getImageByNumber = (num) => {
  switch (num) {
    case 0:
      return zeroImg;
    case 1:
      return oneImg;
    case 2:
      return twoImg;
    case 3:
      return threeImg;
    case 4:
      return fourImg;
    case 5:
      return fiveImg;
    case 6:
      return sixImg;
    case 7:
      return sevenImg;
    case 8:
      return eightImg;
    case 9:
      return nineImg;
    default:
      return '';
  }
};

export const transformScore = (score) => {
  if (score < 10) {
    const scoreImg = getImageByNumber(score);
    return [scoreImg];
  }

  const scoreStr = score.toString();
  const scoreArr = scoreStr.split('');

  return scoreArr.reduce((init, s) => {
    const scoreInt = parseInt(s);
    const scoreImg = getImageByNumber(scoreInt);
    init.push(scoreImg);
    return init;
  }, []);
};
