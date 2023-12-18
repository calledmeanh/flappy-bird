import React from "react";
import { STYLES } from "../constant";
import { Score } from "./Score";

import restartBtnImg from "../asset/sprites/restart.png";
import gameoverImg from "../asset/sprites/gameover.png";

export function Restart({ score }) {
  const reset = (e) => window.location.reload();

  return (
    <div style={{ ...STYLES.RESTART }}>
      <img style={{ ...STYLES.RESTART_GAMEOVER }} src={gameoverImg} alt="gameover" />
      <Score score={score} display={"RESTART"} />
      <img style={{ ...STYLES.RESTART_BTN }} src={restartBtnImg} onClick={reset} alt="restart-btn" />
    </div>
  );
}
