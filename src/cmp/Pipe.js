import React, { Fragment, useRef } from "react";
import { STYLES, SCREEN_HEIGHT, MAX_PIPE_HEIGHT_PERCENT, SCREEN_WIDTH } from "../constant";
import { REDUCER_TYPE } from "../reducer";
import { randomHeightPipe, checkRectCollision } from "../util";
import { useRaf } from "../hook";
import { Line } from "./Line";

import pipeDownImg from "../asset/sprites/pipe-green-down.png";
import pipeUpImg from "../asset/sprites/pipe-green-up.png";

import hitSrc from "../asset/audio/audio_hit.ogg";

export function Pipe({ initX, height, running, gameover, pipe, ground, bird, line, score, dispatch }) {
  const xRef = useRef(initX);
  const heightRef = useRef(height);
  const hitRef = useRef();

  // make pipe move to left
  useRaf(() => {
    if (running && !gameover) {
      if (xRef.current > -pipe.w) {
        xRef.current = xRef.current - pipe.v;
      } else {
        heightRef.current = randomHeightPipe(SCREEN_HEIGHT, MAX_PIPE_HEIGHT_PERCENT);
        xRef.current = SCREEN_WIDTH;
      }
    }
  });

  // check collision of bird and pipe
  useRaf(() => {
    if (running && !gameover) {
      const { upHeight, downHeight } = heightRef.current;
      const pipeUpImg = { x: xRef.current, y: 0, w: pipe.w, h: upHeight };
      const pipeDownImg = {
        x: xRef.current,
        y: SCREEN_HEIGHT - ground.h - downHeight,
        w: pipe.w,
        h: downHeight,
      };

      if (checkRectCollision(bird, pipeUpImg) || checkRectCollision(bird, pipeDownImg)) {
        if (hitRef.current) {
          hitRef.current.currentTime = 0;
          hitRef.current.play();
        }
        const payload = { gameover: true, running: false };
        dispatch({ type: REDUCER_TYPE.GAMEOVER, payload });
      }
    }
  });

  return (
    <Fragment>
      <div
        style={{
          ...STYLES.PIPE_UP,
          backgroundImage: `url(${pipeUpImg})`,
          transform: `translateX(${xRef.current}px)`,
          height: heightRef.current.upHeight,
        }}
      ></div>
      <Line
        bird={bird}
        line={{
          x: xRef.current + pipe.w / 2 - line.w,
          y: heightRef.current.upHeight,
          w: line.w,
          h: heightRef.current.midHeight,
        }}
        running={running}
        gameover={gameover}
        score={score}
        dispatch={dispatch}
      />
      <div
        style={{
          ...STYLES.PIPE_DOWN,
          backgroundImage: `url(${pipeDownImg})`,
          transform: `translateX(${xRef.current}px)`,
          height: heightRef.current.downHeight,
        }}
      ></div>
      <audio ref={hitRef} src={hitSrc}></audio>
    </Fragment>
  );
}
