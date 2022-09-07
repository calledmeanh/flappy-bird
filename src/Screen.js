import React, { useReducer, useRef } from 'react';
import {
  BIRD_CENTER_Y,
  BIRD_HEIGHT,
  STYLES,
  BIRD_CENTER_X,
  BIRD_WIDTH,
  REDUCER_TYPE,
  MAX_PIPE_HEIGHT_PERCENT,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  PIPE_WIDTH,
  LINE_WIDTH,
  GROUND_HEIGHT,
} from './constant';
import { getStateOfTime, randomHeightPipe } from './util';
import { Bird } from './cmp/Bird';
import { Pipe } from './cmp/Pipe';

import backgroundDay from './asset/sprites/background-day.png';
import backgroundNight from './asset/sprites/background-night.png';

const reducer = (state, action) => {
  switch (action.type) {
    case REDUCER_TYPE.BIRD_DOWN:
      return { ...state, bird: { ...state.bird, y: state.bird.y + action.payload } };
    case REDUCER_TYPE.BIRD_STOP:
      return { ...state, bird: { ...state.bird, y: action.payload - state.bird.h }, gameover: true, running: false };
    case REDUCER_TYPE.BIRD_JUMP:
      return { ...state, bird: { ...state.bird, y: state.bird.y - state.bird.h * 1.5 } };
    case REDUCER_TYPE.SCORE:
      return { ...state, score: state.score + 1 };
    case REDUCER_TYPE.RUN:
      return { ...state, running: true };
    case REDUCER_TYPE.PAUSE:
      return { ...state, running: false };
    case REDUCER_TYPE.GAMEOVER:
      return { ...state, gameover: true, running: false };
    default:
      return state;
  }
};

const initialState = {
  running: false,
  gameover: false,
  score: 0,
  line: { w: LINE_WIDTH },
  bird: { x: BIRD_CENTER_X, y: BIRD_CENTER_Y, w: BIRD_WIDTH, h: BIRD_HEIGHT, v: 0.4 },
  pipe: { w: PIPE_WIDTH, v: 2.4, initX: SCREEN_WIDTH },
  ground: { h: GROUND_HEIGHT },
};

function Screen() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const backgroundByTime = useRef(getStateOfTime() ? backgroundDay : backgroundNight);

  return (
    <div style={{ ...STYLES.SCREEN, backgroundImage: `url(${backgroundByTime.current})` }}>
      {state.score > 0 && <div style={{ ...STYLES.SCORE }}>{state.score}</div>}
      <Bird {...state} dispatch={dispatch} />
      <Pipe
        {...state}
        initX={state.pipe.initX}
        height={randomHeightPipe(SCREEN_HEIGHT, MAX_PIPE_HEIGHT_PERCENT)}
        dispatch={dispatch}
      />

      <Pipe
        {...state}
        initX={state.pipe.initX * 1.5}
        height={randomHeightPipe(SCREEN_HEIGHT, MAX_PIPE_HEIGHT_PERCENT)}
        dispatch={dispatch}
      />
      <div className={state.gameover ? '' : 'ground'} style={{ ...STYLES.GROUND }}></div>
    </div>
  );
}

export default Screen;
