import React, { Fragment, useEffect, useRef } from 'react';
import { STYLES, SCREEN_HEIGHT, MAX_PIPE_HEIGHT_PERCENT, REDUCER_TYPE, SCREEN_WIDTH } from '../constant';
import { randomHeightPipe, checkRectCollision } from '../util';
import { useRaf } from '../hook';
import { Line } from './Line';

import pipeDown from '../asset/sprites/pipe-green-down.png';
import pipeUp from '../asset/sprites/pipe-green-up.png';

import hitSrc from '../asset/audio/audio_hit.ogg';

export function Pipe(props) {
  const x = useRef(props.initX);
  const height = useRef(props.height);
  const hitRef = useRef();

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

  useEffect(() => {
    console.log(hitRef);
  }, []);

  // check collision of bird and pipe
  useRaf(() => {
    if (props.running && !props.gameover) {
      const { upHeight, downHeight } = height.current;
      const pipeUp = { x: x.current, y: 0, w: props.pipe.w, h: upHeight };
      const pipeDown = { x: x.current, y: SCREEN_HEIGHT - props.ground.h - downHeight, w: props.pipe.w, h: downHeight };

      if (checkRectCollision(props.bird, pipeUp) || checkRectCollision(props.bird, pipeDown)) {
        if (hitRef.current) {
          hitRef.current.currentTime = 0;
          hitRef.current.play();
        }

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
          x: x.current + props.pipe.w / 2 - props.line.w,
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
      <audio ref={hitRef} src={hitSrc}></audio>
    </Fragment>
  );
}
