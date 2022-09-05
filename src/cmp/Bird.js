import React, { useEffect, useRef } from 'react';
import { GRAVITY, REDUCER_TYPE, SCREEN_HEIGHT, STYLES } from '../constant';
import { useRaf } from '../hook';
import { listener } from '../util';

import birdDown from '../asset/yellowbird-downflap.png';

export function Bird(props) {
  const velocity = useRef(props.bird.v);
  const onRemoveKeydown = useRef();

  // make bird fallin down
  useRaf(() => {
    if (props.running || props.gameover) {
      if (props.bird.y < SCREEN_HEIGHT - props.ground.h - props.bird.h) {
        velocity.current = velocity.current + GRAVITY * 2;
        props.dispatch({ type: REDUCER_TYPE.BIRD_DOWN, payload: velocity.current });
      } else {
        props.dispatch({ type: REDUCER_TYPE.BIRD_STOP, payload: SCREEN_HEIGHT - props.ground.h });
      }
    }
  });

  // make bird jump when press space
  useEffect(() => {
    onRemoveKeydown.current = listener('keydown', (e) => {
      switch (e.keyCode) {
        case 32: // space
          if (!props.gameover) {
            if (!props.running) {
              props.dispatch({ type: REDUCER_TYPE.RUN });
            } else {
              velocity.current = props.bird.v;
              props.dispatch({ type: REDUCER_TYPE.BIRD_JUMP });
            }
          }
          break;
        case 80: // p
          if (!props.gameover) {
            props.dispatch({ type: REDUCER_TYPE.PAUSE });
          }
          break;
        default:
          break;
      }
    });
    return () => onRemoveKeydown.current();
  }, [props]);

  return (
    <img
      src={birdDown}
      alt="bird"
      style={{
        ...STYLES.BIRD,
        transform: `translate(${props.bird.x}px, ${props.bird.y}px)`,
      }}
    />
  );
}
