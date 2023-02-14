import { useEffect, useRef } from 'react';

export default function useInterval(
  callback: () => void,
  delay: number | null
) {
  const callbackRef = useRef<() => void>();

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    function intervalCallback() {
      if (!callbackRef.current) {
        return;
      }
      callbackRef.current();
    }

    if (delay === null) {
      return () => {};
    }

    const id = setInterval(intervalCallback, delay);
    return () => clearInterval(id);
  }, [delay]);
}
