import { useEffect, useState } from 'react';

type LocalStorageKeys = 'score-results';

export type ScoreResult = { score: number; date: number };

type ReturnType<T> = [T, React.Dispatch<React.SetStateAction<T>>];

interface Props<T> {
  key: LocalStorageKeys;
  initialValue: T;
}

export default function useLocalStorage<T>({
  key,
  initialValue,
}: Props<T>): ReturnType<T> {
  const [storage, setStorage] = useState<T>(() => {
    if (!initialValue) {
      return undefined;
    }

    try {
      const value = window.localStorage.getItem(key);
      return value ? JSON.parse(value) : initialValue;
    } catch (err) {
      return initialValue;
    }
  });

  useEffect(() => {
    if (!storage) return;

    window.localStorage.setItem(key, JSON.stringify(storage));
  }, [key, storage]);

  return [storage, setStorage];
}
