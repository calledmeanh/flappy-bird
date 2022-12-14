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
import { getStateOfTime, randomHeightPipe, transformScore } from './util';
import { Bird } from './cmp/Bird';
import { Pipe } from './cmp/Pipe';
import { Ground } from './cmp/Ground';
import { Restart } from './cmp/Restart';

import backgroundDayImg from './asset/sprites/background-day.png';
import backgroundNightImg from './asset/sprites/background-night.png';
import instructionImg from './asset/sprites/instruction.png';

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
  pipe: { w: PIPE_WIDTH, v: SCREEN_WIDTH < 500 ? 2 : 2.4, initX: SCREEN_WIDTH },
  ground: { h: GROUND_HEIGHT },
};

function Screen() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const backgroundByTime = useRef(getStateOfTime() ? backgroundDayImg : backgroundNightImg);
  return (
    <div style={{ ...STYLES.SCREEN, backgroundImage: `url(${backgroundByTime.current})` }}>
      {state.running && !state.gameover && (
        <div style={{ ...STYLES.SCORE }}>
          {transformScore(state.score).map((s, i) => {
            return <img key={i} style={{ ...STYLES.SCORE_IMG }} src={s} alt={i} />;
          })}
        </div>
      )}
      {!state.running && !state.gameover && (
        <img style={{ ...STYLES.INSTRUCTION }} src={instructionImg} alt="instruction" />
      )}
      <Bird {...state} dispatch={dispatch} />
      <Pipe
        {...state}
        initX={state.pipe.initX}
        height={randomHeightPipe(SCREEN_HEIGHT, MAX_PIPE_HEIGHT_PERCENT)}
        dispatch={dispatch}
      />

      <Pipe
        {...state}
        initX={state.pipe.initX * 1.5 + state.pipe.w / 2}
        height={randomHeightPipe(SCREEN_HEIGHT, MAX_PIPE_HEIGHT_PERCENT)}
        dispatch={dispatch}
      />
      <Ground gameover={state.gameover} />
      {Boolean(state.gameover) && <Restart score={state.score} />}
    </div>
  );
}

export default Screen;
