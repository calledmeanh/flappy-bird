import React from 'react';
import { STYLES } from './constants';
import { Bird } from './cmps/Bird';
import { Pipe } from './cmps/Pipe';

function Screen() {
  return (
    <div style={{ ...STYLES.SCREEN }}>
      <Bird />
      <Pipe />
    </div>
  );
}

export default Screen;
