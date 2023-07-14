import React, { useRef } from 'react';
import { STYLES } from '../constant';
import { useRaf } from '../hook';
import { REDUCER_TYPE } from '../reducer';
import { checkRectCollision } from '../util';

import pointSrc from '../asset/audio/audio_point.ogg';

export function Line(props) {
  const crossLine = useRef();
  const pointRef = useRef();

  useRaf(() => {
    if (props.running && !props.gameover) {
      if (checkRectCollision(props.bird, props.line)) crossLine.current = true;
      else {
        if (crossLine.current && pointRef.current) {
          pointRef.current.currentTime = 0;
          pointRef.current.play();
          const payload = props.score + 1;
          props.dispatch({ type: REDUCER_TYPE.GET_SCORE, payload });
          crossLine.current = false;
        }
      }
    }
  });

  return (
    <>
      <div
        style={{
          ...STYLES.LINE,
          transform: `translate(${props.line.x}px, ${props.line.y}px)`,
          height: props.line.h,
        }}
      ></div>
      <audio ref={pointRef} src={pointSrc}></audio>
    </>
  );
}
