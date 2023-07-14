import React from 'react';
import { transformScore } from '../util';
import { STYLES } from '../constant';

export function Score({ score, display }) {
  const styleByDisplay = display === 'SCREEN' ? STYLES.SCORE_IN_SCREEN : STYLES.SCORE_IN_RESTART;
  return (
    <div style={{ ...styleByDisplay }}>
      {transformScore(score).map((s, i) => {
        return <img key={i} style={{ ...STYLES.SCORE_IMG }} src={s} alt={i} />;
      })}
    </div>
  );
}
