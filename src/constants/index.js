import { getPercent, randomHeightPipe } from '../utils';

export const FPS = 1000 / 60;
export const GRAVITY = 0.05;
export const VELOCITY = 0.5;

export const SCREEN_WIDTH = 400;
export const SCREEN_HEIGHT = 600;

export const SCREEN_WIDTH_HALF = SCREEN_WIDTH / 2;
export const SCREEN_HEIGHT_HALF = SCREEN_HEIGHT / 2;

export const BIRD_WIDTH = getPercent(SCREEN_WIDTH, 15);
export const BIRD_HEIGHT = getPercent(SCREEN_HEIGHT, 10);

export const BIRD_WIDTH_HALF = BIRD_WIDTH / 2;
export const BIRD_HEIGHT_HALF = BIRD_HEIGHT / 2;

export const BIRD_CENTER_X = SCREEN_WIDTH_HALF - BIRD_WIDTH_HALF;
export const BIRD_CENTER_Y = SCREEN_HEIGHT_HALF - BIRD_HEIGHT_HALF;

export const PIPE_WIDTH = getPercent(SCREEN_WIDTH, 25);
export const PIPE_WIDTH_HALF = PIPE_WIDTH / 2;
export const PIPE_CENTER_X = SCREEN_WIDTH_HALF - PIPE_WIDTH_HALF;

export const PIPE_UP_HEIGHT = randomHeightPipe(SCREEN_HEIGHT);
export const PIPE_DOWN_HEIGHT = randomHeightPipe(SCREEN_HEIGHT);

export const STYLES = {
  SCREEN: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    backgroundColor: '#f9dcbc',
    margin: '0 auto',
    position: 'relative',
    overflow: 'hidden',
  },
  BIRD: {
    width: BIRD_WIDTH,
    height: BIRD_HEIGHT,
    backgroundColor: 'red',
    position: 'absolute',
    zIndex: 1,
    transform: `translate(${BIRD_CENTER_X}px, ${BIRD_CENTER_Y}px)`,
    transition: 'transform ease 0.03s',
  },
  PIPE_UP: {
    width: PIPE_WIDTH,
    height: PIPE_UP_HEIGHT,
    backgroundColor: '#35d59c',
    position: 'absolute',
    top: 0,
    transform: `translateX(${PIPE_CENTER_X}px)`,
    // transition: 'transform ease 0.05s',
  },
  PIPE_DOWN: {
    width: PIPE_WIDTH,
    height: PIPE_DOWN_HEIGHT,
    backgroundColor: '#35d59c',
    position: 'absolute',
    bottom: 0,
    transform: `translateX(${PIPE_CENTER_X}px)`,
    // transition: 'transform ease 0.05s',
  },
};
