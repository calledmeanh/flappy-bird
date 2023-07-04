import React, { useCallback, useEffect, useRef, useState } from 'react';
import { GRAVITY, REDUCER_TYPE, SCREEN_HEIGHT, STYLES } from '../constant';
import { useRaf } from '../hook';
import { listener } from '../util';

import birdDownImg from '../asset/sprites/yellowbird-downflap.png';
import birdMidImg from '../asset/sprites/yellowbird-midflap.png';
import birdUpImg from '../asset/sprites/yellowbird-upflap.png';

import wingSrc from '../asset/audio/audio_wing.ogg';

const birdSprites = [birdDownImg, birdMidImg, birdUpImg];
let birdIdx = 0;

export function Bird(props) {
  const [src, setSrc] = useState(birdDownImg);
  const velocity = useRef(props.bird.v);
  const tolerace = useRef(2);
  const rotate = useRef(0);
  const wingRef = useRef();

  // sprite animation
  useRaf(() => {
    if (!props.gameover) {
      if (birdIdx < birdSprites.length - 1) {
        setSrc(birdSprites[birdIdx]);
        birdIdx++;
      } else birdIdx = 0;
    }
  });

  // make bird fallin down
  useRaf(() => {
    if (props.running || props.gameover) {
      if (props.bird.y < SCREEN_HEIGHT - props.ground.h - props.bird.h) {
        if (props.gameover) tolerace.current = 6;
        velocity.current = velocity.current + GRAVITY * tolerace.current;
        rotate.current = Math.floor(velocity.current * 10);
        if (rotate.current >= 90) rotate.current = 90;
        const newPos = props.bird.y + velocity.current;
        props.dispatch({ type: REDUCER_TYPE.BIRD_DOWN, payload: newPos });
      } else {
        const birdStopState = { y: SCREEN_HEIGHT - props.ground.h - props.bird.h, gameover: true, running: false };
        props.dispatch({ type: REDUCER_TYPE.BIRD_STOP, payload: birdStopState });
      }
    }
  });

  // make bird jump when press space & touch
  const jumping = useCallback(() => {
    if (!props.gameover) {
      if (!props.running) props.dispatch({ type: REDUCER_TYPE.RUNNING, payload: true });
      else {
        if (wingRef.current) {
          wingRef.current.currentTime = 0;
          wingRef.current.play();
        }

        velocity.current = props.bird.v;
        rotate.current = -90;
        const payload = props.bird.y - props.bird.h * 1.5;
        props.dispatch({ type: REDUCER_TYPE.BIRD_JUMP, payload });
      }
    }
  }, [props]);

  // press space
  useEffect(() => {
    const onRemoveKeydown = listener('keydown', (e) => {
      switch (e.keyCode) {
        case 32: // space
          jumping();
          break;
        case 80: // p
          if (!props.gameover) props.dispatch({ type: REDUCER_TYPE.PAUSE, payload: false });
          break;
        default:
          break;
      }
    });
    return () => onRemoveKeydown();
  }, [props, jumping]);

  // touch
  useEffect(() => {
    const onRemoveTouch = listener('touchstart', (e) => {
      jumping();
    });
    return () => onRemoveTouch();
  }, [jumping]);

  return (
    <>
      <img
        src={src}
        alt="bird"
        style={{
          ...STYLES.BIRD,
          transform: `translate(${props.bird.x}px, ${props.bird.y}px) rotate(${rotate.current}deg)`,
        }}
      />
      <audio ref={wingRef} src={wingSrc}></audio>
    </>
  );
}
