import React, { useReducer } from 'react';
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
} from './constant';
import { randomHeight2Pipe } from './util';
import { Bird } from './cmp/Bird';
import { Pipe } from './cmp/Pipe';

const reducer = (state, action) => {
  switch (action.type) {
    case REDUCER_TYPE.BIRD_DOWN:
      return { ...state, bird: { ...state.bird, y: action.payload } };
    case REDUCER_TYPE.BIRD_STOP:
      return { ...state, bird: { ...state.bird, y: action.payload } };
    case REDUCER_TYPE.BIRD_JUMP:
      return { ...state, bird: { ...state.bird, y: action.payload } };
    case REDUCER_TYPE.GAMEOVER:
      return { ...state, gameover: true };
    default:
      return state;
  }
};

const initialState = {
  running: false,
  gameover: false,
  score: 0,
  bird: { x: BIRD_CENTER_X, y: BIRD_CENTER_Y, w: BIRD_WIDTH, h: BIRD_HEIGHT, v: 0.5 },
  pipe: { w: PIPE_WIDTH, v: 1.5 },
};

function Screen() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div style={{ ...STYLES.SCREEN }}>
      <Bird {...state} dispatch={dispatch} />
      <Pipe
        {...state}
        initX={SCREEN_WIDTH}
        height={randomHeight2Pipe(SCREEN_HEIGHT, MAX_PIPE_HEIGHT_PERCENT)}
        dispatch={dispatch}
      />

      <Pipe
        {...state}
        initX={SCREEN_WIDTH * 1.5}
        height={randomHeight2Pipe(SCREEN_HEIGHT, MAX_PIPE_HEIGHT_PERCENT)}
        dispatch={dispatch}
      />
    </div>
  );
}

export default Screen;
