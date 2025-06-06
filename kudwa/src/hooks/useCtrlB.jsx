// src/hooks/useCtrlB.js
import { useEffect } from 'react';

export default function useCtrlB(callback) {
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.ctrlKey && e.key.toLowerCase() === 'b') {
        e.preventDefault(); // optional, to prevent browser default behavior
        callback();
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [callback]);
}