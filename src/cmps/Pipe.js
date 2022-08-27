import React, { Fragment, useState, useEffect } from 'react';
import {
  VELOCITY,
  FPS,
  PIPE_WIDTH,
  STYLES,
  SCREEN_WIDTH,
  PIPE_UP_HEIGHT,
  PIPE_DOWN_HEIGHT,
  SCREEN_HEIGHT,
  MAX_PIPE_HEIGHT_PERCENT,
} from '../constants';
import { randomHeight2Pipe, checkRectCollision } from '../utils';

export function Pipe(props) {
  const [x, setX] = useState(props.x);
  const [upHeight, setUpHeight] = useState(PIPE_UP_HEIGHT);
  const [downHeight, setDownHeight] = useState(PIPE_DOWN_HEIGHT);

  // make pipe move to left
  useEffect(() => {
    const moveToLeftId = setInterval(() => {
      if (!props.gameOver) {
        if (x > -PIPE_WIDTH) {
          setX((prev) => prev - VELOCITY * 2.8);
        } else {
          setX(SCREEN_WIDTH);
          const { upHeight, downHeight } = randomHeight2Pipe(SCREEN_HEIGHT, MAX_PIPE_HEIGHT_PERCENT);
          setUpHeight(upHeight);
          setDownHeight(downHeight);
          clearInterval(moveToLeftId);
        }
      }
    }, FPS);
    return () => clearInterval(moveToLeftId);
  }, [x, props.gameOver]);

  // check collision
  useEffect(() => {
    if (!props.gameOver) {
      const bird = { x: props.bird.x, y: props.bird.y, w: props.bird.w, h: props.bird.h };
      const pipeUp = { x, y: 0, w: PIPE_WIDTH, h: upHeight };
      const pipeDown = { x, y: SCREEN_HEIGHT - downHeight, w: PIPE_WIDTH, h: downHeight };

      if (checkRectCollision(bird, pipeUp) || checkRectCollision(bird, pipeDown)) {
        props.setGameOver(true);
      }
    }
  }, [downHeight, upHeight, x, props]);

  return (
    <Fragment>
      <div style={{ ...STYLES.PIPE_UP, transform: `translateX(${x}px)`, height: upHeight }}></div>
      <div style={{ ...STYLES.PIPE_DOWN, transform: `translateX(${x}px)`, height: downHeight }}></div>
    </Fragment>
  );
}
