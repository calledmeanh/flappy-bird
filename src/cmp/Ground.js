import React from 'react';
import { STYLES } from '../constant';

export function Ground({ gameover }) {
  return (
    <div style={{ ...STYLES.GROUND }}>
      <div style={{ ...STYLES.CROSSLINE }} className={gameover ? '' : 'crossline'}></div>
      <div style={{ ...STYLES.LANE }}></div>
    </div>
  );
}
