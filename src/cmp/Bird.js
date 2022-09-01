import React, { useEffect, useRef } from 'react';
import { GRAVITY, REDUCER_TYPE, SCREEN_HEIGHT, STYLES } from '../constant';
import { useRaf } from '../hook';
import { listener } from '../util';

export function Bird(props) {
  const velocity = useRef(props.bird.v);

  // make bird fallin down
  useRaf(() => {
    if (props.bird.y < SCREEN_HEIGHT - props.bird.h) {
      velocity.current = velocity.current + GRAVITY * 2;
      props.dispatch({ type: REDUCER_TYPE.BIRD_DOWN, payload: props.bird.y + velocity.current });
    } else {
      props.dispatch({ type: REDUCER_TYPE.BIRD_STOP, payload: SCREEN_HEIGHT - props.bird.h });
      props.dispatch({ type: REDUCER_TYPE.GAMEOVER });
    }
  });

  // make bird jump when press space
  useEffect(() => {
    const onRemoveKeydown = listener('keydown', (e) => {
      if (!props.gameover) {
        if (e.code === 'Space' && e.keyCode === 32) {
          velocity.current = props.bird.v;
          props.dispatch({ type: REDUCER_TYPE.BIRD_JUMP, payload: props.bird.y - props.bird.h });
        }
      }
    });
    return () => onRemoveKeydown();
  }, [props]);

  return <div style={{ ...STYLES.BIRD, transform: `translate(${props.bird.x}px, ${props.bird.y}px)` }}></div>;
}
