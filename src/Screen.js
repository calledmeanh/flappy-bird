import React, { useEffect, useState } from 'react';
import {
  SCREEN_WIDTH,
  BIRD_CENTER_Y,
  BIRD_CENTER_X,
  BIRD_HEIGHT,
  VELOCITY,
  SCREEN_HEIGHT,
  GRAVITY,
  FPS,
  STYLES,
  BIRD_WIDTH,
} from './constants';
import { Bird } from './cmps/Bird';
import { Pipe } from './cmps/Pipe';
import { listener } from './utils';

function Screen() {
  let [birdY, setY] = useState(BIRD_CENTER_Y);
  let [velocity, setVel] = useState(VELOCITY);
  let [gameOver, setGameOver] = useState(false);

  // listen for key down event
  useEffect(() => {
    const onRemoveKeydown = listener('keydown', (e) => {
      if (!gameOver) {
        if (e.code === 'Space' && e.keyCode === 32) {
          setY((prev) => prev - BIRD_HEIGHT);
          setVel(VELOCITY);
        }
      }
    });

    return () => onRemoveKeydown();
  }, [gameOver]);

  // make bird fallin
  useEffect(() => {
    const birdFallinId = setInterval(() => {
      if (!gameOver) {
      }
      if (birdY < SCREEN_HEIGHT - BIRD_HEIGHT) {
        setVel((prev) => prev + GRAVITY * 2);
        setY((prev) => prev + velocity);
      } else {
        setY(SCREEN_HEIGHT - BIRD_HEIGHT);
        setGameOver(true);
        clearInterval(birdFallinId);
      }
    }, FPS);
    return () => clearInterval(birdFallinId);
  }, [birdY, velocity, gameOver]);

  return (
    <div style={{ ...STYLES.SCREEN }}>
      <Bird y={birdY} gameOver={gameOver} />
      <Pipe
        x={SCREEN_WIDTH}
        bird={{ x: BIRD_CENTER_X, y: birdY, w: BIRD_WIDTH, h: BIRD_HEIGHT }}
        gameOver={gameOver}
        setGameOver={setGameOver}
      />
      <Pipe
        x={SCREEN_WIDTH * 1.5}
        bird={{ x: BIRD_CENTER_X, y: birdY, w: BIRD_WIDTH, h: BIRD_HEIGHT }}
        gameOver={gameOver}
        setGameOver={setGameOver}
      />
    </div>
  );
}

export default Screen;
