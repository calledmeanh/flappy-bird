import React from 'react';
import { STYLES } from '../constant';

export function Ground(props) {
  return (
    <div style={{ ...STYLES.GROUND }}>
      <div style={{ ...STYLES.CROSSLINE }} className={props.gameover ? '' : 'crossline'}></div>
      <div style={{ ...STYLES.LANE }}></div>
    </div>
  );
}
