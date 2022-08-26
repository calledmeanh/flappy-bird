import React from 'react';
import { SCREEN_WIDTH, SCREEN_WIDTH_HALF, STYLES } from './constants';
import { Bird } from './cmps/Bird';
import { Pipe } from './cmps/Pipe';

function Screen() {
  return (
    <div style={{ ...STYLES.SCREEN }}>
      <Bird />
      <Pipe x={SCREEN_WIDTH} />
      <Pipe x={SCREEN_WIDTH + SCREEN_WIDTH_HALF} />
    </div>
  );
}

export default Screen;
