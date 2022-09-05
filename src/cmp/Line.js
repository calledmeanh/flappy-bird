import React, { useRef } from 'react';
import { STYLES } from '../constant';
import { useRaf } from '../hook';
import { REDUCER_TYPE } from '../constant';
import { checkRectCollision } from '../util';

export function Line(props) {
  const crossLine = useRef();

  useRaf(() => {
    if (props.running && !props.gameover) {
      if (checkRectCollision(props.bird, props.line)) crossLine.current = true;
      else {
        if (crossLine.current) {
          props.dispatch({ type: REDUCER_TYPE.SCORE });
          crossLine.current = false;
        }
      }
    }
  });

  return (
    <div
      style={{
        ...STYLES.LINE,
        transform: `translate(${props.line.x}px, ${props.line.y}px)`,
        height: props.line.h,
      }}
    ></div>
  );
}
