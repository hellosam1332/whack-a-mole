import { useState } from 'react';
import useInterval from './useInterval';

type Status = 'idle' | 'running' | 'stopped';

interface Props {
  startFrom: number;
  onDone(): void;
}

export default function useCountDown({ startFrom, onDone }: Props) {
  const [count, setCount] = useState(startFrom);
  const [status, setStatus] = useState<Status>('idle');

  useInterval(
    () => {
      if (count === 0) {
        setStatus('stopped');
        onDone();
        return;
      }
      setCount((prev) => prev - 1);
    },
    status === 'running' ? 1000 : null
  );

  const pause = () => {
    setStatus('stopped');
  };

  const start = () => {
    setStatus('running');
  };

  return { count, pause, start };
}
