import React, { useCallback, useEffect, useRef } from 'react';
import { GRAVITY, SCREEN_HEIGHT, STYLES } from '../constant';
import { REDUCER_TYPE } from '../reducer';
import { useRaf } from '../hook';
import { listener, mobileCheck } from '../util';

import wingSrc from '../asset/audio/audio_wing.ogg';

export function Bird({ bird, gameover, running, ground, dispatch }) {
  const isMobile = useRef(mobileCheck());
  const velocity = useRef(bird.v);
  const tolerace = useRef(2);
  const rotate = useRef(0);
  const wingRef = useRef();

  // make bird fallin down
  useRaf(() => {
    if (running || gameover) {
      if (bird.y < SCREEN_HEIGHT - ground.h - bird.h) {
        if (gameover) tolerace.current = 6;
        velocity.current = velocity.current + GRAVITY * tolerace.current;
        rotate.current = Math.floor(velocity.current * 7);
        if (rotate.current >= 90) rotate.current = 90;
        const newPos = bird.y + velocity.current;
        dispatch({ type: REDUCER_TYPE.BIRD_DOWN, payload: newPos });
      } else {
        const birdStopState = { y: SCREEN_HEIGHT - ground.h - bird.h, gameover: true, running: false };
        dispatch({ type: REDUCER_TYPE.BIRD_STOP, payload: birdStopState });
      }
    }
  }, [running, gameover, bird.y, bird.h, ground.h, dispatch]);

  // make bird jump when press space & touch
  const jumping = useCallback(() => {
    if (!gameover) {
      if (!running) dispatch({ type: REDUCER_TYPE.RUNNING, payload: true });
      else {
        if (wingRef.current) {
          wingRef.current.currentTime = 0;
          wingRef.current.play();
        }

        velocity.current = bird.v;
        rotate.current = -90;
        const payload = bird.y - bird.h * 1.5;
        dispatch({ type: REDUCER_TYPE.BIRD_JUMP, payload });
      }
    }
  }, [gameover, running, bird.v, bird.y, bird.h, dispatch]);

  // press space
  useEffect(() => {
    const onRemoveKeydown = listener('keydown', (e) => {
      switch (e.keyCode) {
        case 32: // space
          jumping();
          break;
        case 80: // p
          if (!gameover) dispatch({ type: REDUCER_TYPE.PAUSE, payload: false });
          break;
        default:
          break;
      }
    });
    return () => onRemoveKeydown();
  }, [gameover, jumping, dispatch]);

  // touch & click
  useEffect(() => {
    let onRemoveJump;
    if (isMobile.current) {
      onRemoveJump = listener('touchstart', (e) => {
        jumping();
      });
    } else {
      onRemoveJump = listener('mousedown', (e) => {
        jumping();
      });
    }
    return () => onRemoveJump();
  }, [jumping]);

  return (
    <>
      <div
        className="bird"
        style={{
          ...STYLES.BIRD,
          transform: `translate(${bird.x}px, ${bird.y}px) rotate(${rotate.current}deg)`,
        }}
      ></div>
      <audio ref={wingRef} src={wingSrc}></audio>
    </>
  );
}
