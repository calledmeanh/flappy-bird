import React, { useEffect, useState } from 'react';
import { STYLES, BIRD_CENTER_X, BIRD_CENTER_Y, SCREEN_HEIGHT, BIRD_HEIGHT, GRAVITY, VELOCITY, FPS } from '../constants';
import { listener } from '../utils';

export function Bird() {
  let [y, setY] = useState(BIRD_CENTER_Y);
  let [velocity, setVel] = useState(VELOCITY);

  const jumping = () => {
    setY((prev) => prev - BIRD_HEIGHT);
    setVel(VELOCITY);
  };

  // listen for click event
  /* useEffect(() => {
    const onRemoveClick = listener('click', (e) => {
      jumping();
    });

    return () => {
      onRemoveClick();
    };
  }, []); */

  // listen for key down event
  useEffect(() => {
    const onRemoveKeydown = listener('keydown', (e) => {
      if (e.code === 'Space' && e.keyCode === 32) {
        jumping();
      }
    });

    return () => {
      onRemoveKeydown();
    };
  }, []);

  // make bird fallin
  useEffect(() => {
    const birdFallinId = setInterval(() => {
      if (y < SCREEN_HEIGHT - BIRD_HEIGHT) {
        setVel((prev) => prev + GRAVITY * 2);
        setY((prev) => prev + velocity);
      } else {
        setVel(0);
        setY(SCREEN_HEIGHT - BIRD_HEIGHT);
        clearInterval(birdFallinId);
      }
    }, FPS);
    return () => {
      clearInterval(birdFallinId);
    };
  });

  return <div style={{ ...STYLES.BIRD, transform: `translate(${BIRD_CENTER_X}px, ${y}px)` }}></div>;
}
