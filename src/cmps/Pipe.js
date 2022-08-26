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
import { randomHeight2Pipe } from '../utils';

export function Pipe(props) {
  const [x, setX] = useState(props.x);
  const [heightUp, setHeightUp] = useState(PIPE_UP_HEIGHT);
  const [heightDown, setHeightDown] = useState(PIPE_DOWN_HEIGHT);

  // make pipe move to left
  useEffect(() => {
    const moveToLeftId = setInterval(() => {
      if (x > -PIPE_WIDTH) {
        setX((prev) => prev - VELOCITY * 2.8);
      } else {
        setX(SCREEN_WIDTH);
        const { upHeight, downHeight } = randomHeight2Pipe(SCREEN_HEIGHT, MAX_PIPE_HEIGHT_PERCENT);
        setHeightUp(upHeight);
        setHeightDown(downHeight);
        clearInterval(moveToLeftId);
      }
    }, FPS);
    return () => clearInterval(moveToLeftId);
  });

  return (
    <Fragment>
      <div style={{ ...STYLES.PIPE_UP, transform: `translateX(${x}px)`, height: heightUp }}></div>
      <div style={{ ...STYLES.PIPE_DOWN, transform: `translateX(${x}px)`, height: heightDown }}></div>
    </Fragment>
  );
}
