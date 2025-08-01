import { useCallback } from 'react';

export const useCombinedRefs = (...refs: React.ForwardedRef<HTMLInputElement>[]) => {
  return useCallback((node: HTMLInputElement | null) => {
    refs.forEach(ref => {
      if (!ref) return;
      if (typeof ref === 'function') ref(node);
      else (ref as React.MutableRefObject<HTMLInputElement | null>).current = node;
    });
  }, refs);
};
