import React, { Fragment, useRef } from 'react';
import { STYLES, SCREEN_HEIGHT, MAX_PIPE_HEIGHT_PERCENT, SCREEN_WIDTH } from '../constant';
import { REDUCER_TYPE } from '../reducer';
import { randomHeightPipe, checkRectCollision } from '../util';
import { useRaf } from '../hook';
import { Line } from './Line';

import pipeDownImg from '../asset/sprites/pipe-green-down.png';
import pipeUpImg from '../asset/sprites/pipe-green-up.png';

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

  // check collision of bird and pipe
  useRaf(() => {
    if (props.running && !props.gameover) {
      const { upHeight, downHeight } = height.current;
      const pipeUpImg = { x: x.current, y: 0, w: props.pipe.w, h: upHeight };
      const pipeDownImg = {
        x: x.current,
        y: SCREEN_HEIGHT - props.ground.h - downHeight,
        w: props.pipe.w,
        h: downHeight,
      };

      if (checkRectCollision(props.bird, pipeUpImg) || checkRectCollision(props.bird, pipeDownImg)) {
        if (hitRef.current) {
          hitRef.current.currentTime = 0;
          hitRef.current.play();
        }
        const payload = { gameover: true, running: false };
        props.dispatch({ type: REDUCER_TYPE.GAMEOVER, payload });
      }
    }
  });

  return (
    <Fragment>
      <div
        style={{
          ...STYLES.PIPE_UP,
          backgroundImage: `url(${pipeUpImg})`,
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
          backgroundImage: `url(${pipeDownImg})`,
          transform: `translateX(${x.current}px)`,
          height: height.current.downHeight,
        }}
      ></div>
      <audio ref={hitRef} src={hitSrc}></audio>
    </Fragment>
  );
}
