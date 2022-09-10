import React from 'react';
import { STYLES } from '../constant';

import restartBtnImg from '../asset/sprites/restart.png';
import gameoverImg from '../asset/sprites/gameover.png';
import { transformScore } from '../util';

export function Restart(props) {
  const reset = (e) => window.location.reload();

  return (
    <div style={{ ...STYLES.RESTART }}>
      <img style={{ ...STYLES.RESTART_GAMEOVER }} src={gameoverImg} alt="gameover" />
      <div style={{ ...STYLES.RESTART_SCORE }}>
        {transformScore(props.score).map((s, i) => {
          return <img key={i} style={{ ...STYLES.RESTART_SCORE_IMG }} src={s} alt={i} />;
        })}
      </div>
      <img style={{ ...STYLES.RESTART_BTN }} src={restartBtnImg} onClick={reset} alt="restart-btn" />
    </div>
  );
}
