import { getSizeByPercent, randomHeightPipe } from '../util';

const SMALLEST_DEVICE_WIDTH = 320;

/* 
  plus 70 to make min width equal to 320
  ex: if your vp is less than or equal to 500 (500 / 2 = 250 + 70 = 320)
 */
export const SCREEN_WIDTH = window.innerWidth <= 500 ? SMALLEST_DEVICE_WIDTH : 500;
export const SCREEN_HEIGHT = Math.floor(getSizeByPercent(window.innerHeight, 90));

export const BIRD_PERCENT = 6;
export const PIPE_WIDTH_PERCENT = 20;
export const GROUND_PERCENT = 7;
// make sure the total height of two pipes is 75%
export const MAX_PIPE_HEIGHT_PERCENT = 75 - GROUND_PERCENT;
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

export const GROUND_HEIGHT = getSizeByPercent(SCREEN_HEIGHT, GROUND_PERCENT);
export const CROSSLINE_HEIGHT = getSizeByPercent(SCREEN_HEIGHT, GROUND_PERCENT - 5);
export const LANE_HEIGHT = getSizeByPercent(SCREEN_HEIGHT, GROUND_PERCENT - 2);

export const PIPE_WIDTH = getSizeByPercent(SCREEN_WIDTH, PIPE_WIDTH_PERCENT);
export const PIPE_WIDTH_HALF = PIPE_WIDTH / 2;
export const { upHeight: PIPE_UP_HEIGHT, downHeight: PIPE_DOWN_HEIGHT } = randomHeightPipe(
  SCREEN_HEIGHT,
  MAX_PIPE_HEIGHT_PERCENT
);
export const PIPE_CENTER_X = SCREEN_WIDTH_HALF - PIPE_WIDTH_HALF;

export const LINE_WIDTH = getSizeByPercent(SCREEN_WIDTH, LINE_PERCENT);
export const LINE_WIDTH_HALF = LINE_WIDTH / 2;

export const REDUCER_TYPE = {
  BIRD_DOWN: 'bird-down',
  BIRD_STOP: 'bird-stop',
  BIRD_JUMP: 'bird-jump',
  SCORE: 'score',
  RUNNING: 'run',
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
    position: 'absolute',
    bottom: 0,
  },
  INSTRUCTION: {
    position: 'absolute',
    maxWidth: '100%',
    height: 'auto',
    top: '2%',
    left: '50%',
    transform: 'translate(-50%, -2%)',
    zIndex: 1,
  },
  CROSSLINE: {
    width: '100%',
    height: CROSSLINE_HEIGHT,
    backgroundImage: 'repeating-linear-gradient(-45deg, #a3de5a 0 5px, #69a817 5px 10px)',
    borderTop: '2px solid #543444',
    borderBottom: '2px solid #5e7e13',
    boxSizing: 'border-box',
  },
  LANE: {
    width: '100%',
    height: LANE_HEIGHT,
    backgroundColor: '#ddd894',
  },
  SCORE: {
    position: 'absolute',
    top: '7%',
    left: '50%',
    transform: 'translate(-50%, -7%)',
    zIndex: 1,
  },
  SCORE_IMG: {
    width: 30,
    height: 50,
    objectFit: 'contain',
  },
  LINE: {
    width: LINE_WIDTH,
    position: 'absolute',
  },
  RESTART: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    backgroundColor: 'rgba(0,0,0,0.5)',
    position: 'absolute',
    zIndex: 2,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  RESTART_SCORE: {
    margin: '20px 0',
  },
  RESTART_SCORE_IMG: {
    width: 26,
    height: 46,
    objectFit: 'contain',
  },
  RESTART_GAMEOVER: {
    maxWidth: '100%',
    height: 'auto',
    objectFit: 'scale-down',
  },
  RESTART_BTN: {
    width: 128,
    height: 48,
    cursor: 'pointer',
    objectFit: 'scale-down',
  },
};
