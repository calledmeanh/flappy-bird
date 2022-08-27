import React from 'react';
import { STYLES, BIRD_CENTER_X } from '../constants';

export function Bird(props) {
  return <div style={{ ...STYLES.BIRD, transform: `translate(${BIRD_CENTER_X}px, ${props.y}px)` }}></div>;
}
