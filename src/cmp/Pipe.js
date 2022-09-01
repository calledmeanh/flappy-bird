import React, { Fragment, useRef } from 'react';
import { STYLES, SCREEN_HEIGHT, MAX_PIPE_HEIGHT_PERCENT, REDUCER_TYPE, SCREEN_WIDTH } from '../constant';
import { randomHeight2Pipe, checkRectCollision } from '../util';
import { useRaf } from '../hook';

export function Pipe(props) {
  const x = useRef(props.initX);
  const height = useRef(props.height);

  // make pipe move to left
  useRaf(() => {
    if (!props.gameover) {
      if (x.current > -props.pipe.w) {
        x.current = x.current - props.pipe.v;
      } else {
        const newHeight = randomHeight2Pipe(SCREEN_HEIGHT, MAX_PIPE_HEIGHT_PERCENT);
        height.current = newHeight;
        x.current = SCREEN_WIDTH;
      }
    }
  });

  // check collision of bird and pipe
  useRaf(() => {
    if (!props.gameover) {
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
        style={{ ...STYLES.PIPE_UP, transform: `translateX(${x.current}px)`, height: height.current.upHeight }}
      ></div>
      <div
        style={{ ...STYLES.PIPE_DOWN, transform: `translateX(${x.current}px)`, height: height.current.downHeight }}
      ></div>
    </Fragment>
  );
}
