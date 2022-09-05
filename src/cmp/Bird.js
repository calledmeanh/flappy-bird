import React, { useCallback, useEffect, useRef } from 'react';
import { GRAVITY, REDUCER_TYPE, SCREEN_HEIGHT, STYLES } from '../constant';
import { useRaf } from '../hook';
import { listener } from '../util';

import birdDown from '../asset/yellowbird-downflap.png';

export function Bird(props) {
  const velocity = useRef(props.bird.v);

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

  const jumping = useCallback(() => {
    if (!props.gameover) {
      if (!props.running) {
        props.dispatch({ type: REDUCER_TYPE.RUN });
      } else {
        velocity.current = props.bird.v;
        props.dispatch({ type: REDUCER_TYPE.BIRD_JUMP });
      }
    }
  }, [props]);

  // make bird jump when press space
  useEffect(() => {
    const onRemoveKeydown = listener('keydown', (e) => {
      switch (e.keyCode) {
        case 32: // space
          jumping();
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
    return () => onRemoveKeydown();
  }, [props, jumping]);

  // make bird jump when touch
  useEffect(() => {
    const onRemoveTouch = listener('touchstart', (e) => {
      jumping();
    });
    return () => onRemoveTouch();
  }, [jumping]);

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
