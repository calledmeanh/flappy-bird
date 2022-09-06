import { getSizeByPercent, randomHeightPipe } from '../util';

const SMALLEST_DEVICE_WIDTH = 320;

/* 
  plus 70 to make min width equal to 320
  ex: if your vp is less than or equal to 500 (500 / 2 = 250 + 70 = 320)
 */
export const SCREEN_WIDTH = window.innerWidth <= 500 ? SMALLEST_DEVICE_WIDTH : 500;
export const SCREEN_HEIGHT = Math.floor(getSizeByPercent(window.innerHeight, 85));

export const BIRD_PERCENT = 6;
export const PIPE_WIDTH_PERCENT = 20;
// make sure the total height of two pipes is 75%
export const MAX_PIPE_HEIGHT_PERCENT = 75;
export const LINE_PERCENT = 0.5;

export const GRAVITY = 0.05;

export const SCREEN_WIDTH_HALF = SCREEN_WIDTH / 2;
export const SCREEN_HEIGHT_HALF = SCREEN_HEIGHT / 2;

export const BIRD_WIDTH = getSizeByPercent((SCREEN_WIDTH + SCREEN_HEIGHT) / 2, BIRD_PERCENT);
export const BIRD_HEIGHT = getSizeByPercent((SCREEN_WIDTH + SCREEN_HEIGHT) / 2, BIRD_PERCENT);

export const BIRD_WIDTH_HALF = BIRD_WIDTH / 2;
export const BIRD_HEIGHT_HALF = BIRD_HEIGHT / 2;

export const BIRD_CENTER_X = SCREEN_WIDTH_HALF - BIRD_WIDTH_HALF;
export const BIRD_CENTER_Y = SCREEN_HEIGHT_HALF - BIRD_HEIGHT_HALF;

export const GROUND_HEIGHT = 15;

export const PIPE_WIDTH = getSizeByPercent(SCREEN_WIDTH, PIPE_WIDTH_PERCENT);
export const PIPE_WIDTH_HALF = PIPE_WIDTH / 2;
export const { upHeight: PIPE_UP_HEIGHT, downHeight: PIPE_DOWN_HEIGHT } = randomHeightPipe(
  SCREEN_HEIGHT,
  MAX_PIPE_HEIGHT_PERCENT - GROUND_HEIGHT
);
export const PIPE_CENTER_X = SCREEN_WIDTH_HALF - PIPE_WIDTH_HALF;

export const LINE_WIDTH = getSizeByPercent(SCREEN_WIDTH, LINE_PERCENT);
export const LINE_WIDTH_HALF = LINE_WIDTH / 2;

export const REDUCER_TYPE = {
  BIRD_DOWN: 'bird-down',
  BIRD_STOP: 'bird-stop',
  BIRD_JUMP: 'bird-jump',
  SCORE: 'score',
  RUN: 'run',
  PAUSE: 'pause',
  GAMEOVER: 'gameover',
};

export const STYLES = {
  SCREEN: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    backgroundRepeat: 'repeat-x',
    backgroundSize: '100% 100%',
    margin: '0 auto',
    position: 'relative',
    overflow: 'hidden',
  },
  BIRD: {
    width: BIRD_WIDTH,
    height: BIRD_HEIGHT,
    position: 'absolute',
    zIndex: 1,
    transition: 'transform 0.05s linear',
  },
  PIPE_UP: {
    width: PIPE_WIDTH,
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100% 100%',
    position: 'absolute',
    top: 0,
  },
  PIPE_DOWN: {
    width: PIPE_WIDTH,
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100% 100%',
    position: 'absolute',
    bottom: GROUND_HEIGHT,
  },
  GROUND: {
    width: '100%',
    height: GROUND_HEIGHT,
    borderTop: '2px solid #543444',
    boxSizing: 'border-box',
    backgroundImage: 'repeating-linear-gradient(-45deg, #a3de5a 0 5px, #69a817 5px 10px)',
    position: 'absolute',
    bottom: 0,
  },
  SCORE: {
    fontSize: 60,
    userSelect: 'none',
    color: '#543444',
    position: 'absolute',
    transform: `translate(${BIRD_CENTER_X}px, ${50}px)`,
    zIndex: 1,
  },
  LINE: {
    width: LINE_WIDTH,
    position: 'absolute',
  },
};
