import React, { useRef } from "react";
import { STYLES } from "../constant";
import { useRaf } from "../hook";
import { REDUCER_TYPE } from "../reducer";
import { checkRectCollision } from "../util";

import pointSrc from "../asset/audio/audio_point.mp3";

export function Line({ running, gameover, bird, line, score, dispatch }) {
  const crossLine = useRef();
  const pointRef = useRef();

  useRaf(() => {
    if (running && !gameover) {
      if (checkRectCollision(bird, line)) crossLine.current = true;
      else {
        if (crossLine.current && pointRef.current) {
          pointRef.current.currentTime = 0;
          pointRef.current.play();
          const payload = score + 1;
          dispatch({ type: REDUCER_TYPE.GET_SCORE, payload });
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
          transform: `translate(${line.x}px, ${line.y}px)`,
          height: line.h,
        }}
      ></div>
      <audio ref={pointRef} src={pointSrc} autoPlay="false"></audio>
    </>
  );
}
