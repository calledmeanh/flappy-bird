import React from 'react';
import { STYLES } from '../constant';
import { transformScore } from '../util';

import restartBtnImg from '../asset/sprites/restart.png';
import gameoverImg from '../asset/sprites/gameover.png';

export function Restart({ score }) {
  const reset = (e) => window.location.reload();

  return (
    <div style={{ ...STYLES.RESTART }}>
      <img style={{ ...STYLES.RESTART_GAMEOVER }} src={gameoverImg} alt="gameover" />
      <div style={{ ...STYLES.RESTART_SCORE }}>
        {transformScore(score).map((s, i) => {
          return <img key={i} style={{ ...STYLES.RESTART_SCORE_IMG }} src={s} alt={i} />;
        })}
      </div>
      <img style={{ ...STYLES.RESTART_BTN }} src={restartBtnImg} onClick={reset} alt="restart-btn" />
    </div>
  );
}
