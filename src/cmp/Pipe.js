import React, { Fragment, useRef } from 'react';
import { STYLES, SCREEN_HEIGHT, MAX_PIPE_HEIGHT_PERCENT, REDUCER_TYPE, SCREEN_WIDTH } from '../constant';
import { randomHeightPipe, checkRectCollision } from '../util';
import { useRaf } from '../hook';
import { Line } from './Line';

import pipeDown from '../asset/pipe-green-down.png';
import pipeUp from '../asset/pipe-green-up.png';

export function Pipe(props) {
  const x = useRef(props.initX);
  const height = useRef(props.height);

  // make pipe move to left
  useRaf(() => {
    if (props.running && !props.gameover) {
      if (x.current > -props.pipe.w) {
        x.current = x.current - props.pipe.v;
      } else {
        height.current = randomHeightPipe(SCREEN_HEIGHT, MAX_PIPE_HEIGHT_PERCENT);
        x.current = SCREEN_WIDTH;
      }
    }
  });

  // check collision of bird and pipe
  useRaf(() => {
    if (props.running && !props.gameover) {
      const { upHeight, downHeight } = height.current;
      const pipeUp = { x: x.current, y: 0, w: props.pipe.w, h: upHeight };
      const pipeDown = { x: x.current, y: SCREEN_HEIGHT - downHeight, w: props.pipe.w, h: downHeight };

      if (checkRectCollision(props.bird, pipeUp) || checkRectCollision(props.bird, pipeDown)) {
        props.dispatch({ type: REDUCER_TYPE.GAMEOVER });
      }
    }
  });

  return (
    <Fragment>
      <div
        style={{
          ...STYLES.PIPE_UP,
          backgroundImage: `url(${pipeUp})`,
          transform: `translateX(${x.current}px)`,
          height: height.current.upHeight,
        }}
      ></div>
      <Line
        bird={props.bird}
        line={{
          x: x.current + props.pipe.w - props.line.w,
          y: height.current.upHeight,
          w: props.line.w,
          h: height.current.midHeight,
        }}
        running={props.running}
        gameover={props.gameover}
        score={props.score}
        dispatch={props.dispatch}
      />
      <div
        style={{
          ...STYLES.PIPE_DOWN,
          backgroundImage: `url(${pipeDown})`,
          transform: `translateX(${x.current}px)`,
          height: height.current.downHeight,
        }}
      ></div>
    </Fragment>
  );
}
