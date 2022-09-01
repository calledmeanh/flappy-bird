import { useCallback, useEffect, useRef } from 'react';

export const useRaf = (cb) => {
  const rafId = useRef();

  const looping = useCallback(() => {
    cb();
    rafId.current = requestAnimationFrame(looping);
  }, [cb]);

  useEffect(() => {
    rafId.current = requestAnimationFrame(looping);
    return () => cancelAnimationFrame(rafId.current);
  }, [looping]);
};
