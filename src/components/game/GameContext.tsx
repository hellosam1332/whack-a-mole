import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
} from 'react';
import { MOLE_ANIMATION_DURATION_MS } from '../../config';

export type GameStaus = 'idle' | 'running' | 'paused' | 'done';

type Action =
  | { type: 'updateGameStatus'; status: GameStaus }
  | { type: 'whack'; targetId: number }
  | { type: 'inactivateAllMoles' }
  | { type: 'activateRandomMoles' };

type Dispatch = (action: Action) => void;

interface Mole {
  id: number;
  whacked: boolean;
  active: boolean;
}

interface GameState {
  status: GameStaus;
  score: number;
  moles: Mole[];
  columnSize: number;
  rowSize: number;
  numberOfActiveMolesInOnce: number;
}

const GameContext = createContext<
  { state: GameState; dispatch: Dispatch } | undefined
>(undefined);

function gameReducer(state: GameState, action: Action) {
  switch (action.type) {
    case 'updateGameStatus': {
      return {
        ...state,
        status: action.status,
        moles:
          action.status !== 'running'
            ? state.moles.map((mole) => ({
                ...mole,
                active: false,
              }))
            : state.moles,
      };
    }
    case 'inactivateAllMoles': {
      return {
        ...state,
        moles: state.moles.map((mole) => ({
          ...mole,
          active: false,
        })),
      };
    }
    case 'activateRandomMoles': {
      const shuffled = state.moles.slice().sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, state.numberOfActiveMolesInOnce);

      return {
        ...state,
        moles: state.moles.map((mole) => {
          return {
            ...mole,
            whacked: false,
            active: selected.includes(mole),
          };
        }),
      };
    }
    case 'whack': {
      const { targetId } = action;
      return {
        ...state,
        score: state.score + 100,
        moles: state.moles.map((mole) => ({
          ...mole,
          whacked: mole.id === targetId ? true : mole.whacked,
          active: mole.id === targetId ? false : mole.active,
        })),
      };
    }
    default: {
      throw new Error(`Unkown action type`);
    }
  }
}

interface ProivderProps {
  children: ReactNode;
  columnSize: number;
  rowSize: number;
  numberOfActiveMolesInOnce: number;
}

function GameProvider({
  children,
  columnSize,
  numberOfActiveMolesInOnce,
  rowSize,
}: ProivderProps) {
  const [state, dispatch] = useReducer(gameReducer, {
    status: 'idle',
    score: 0,
    moles: Array(columnSize * rowSize)
      .fill(0)
      .map((_, index) => ({
        id: index,
        active: false,
        whacked: false,
      })),
    columnSize,
    numberOfActiveMolesInOnce,
    rowSize,
  });

  const value = useMemo(() => {
    return { state, dispatch };
  }, [state]);

  const activateRandomMolesWithDuration = async () => {
    dispatch({ type: 'inactivateAllMoles' });
    await new Promise((resolve) =>
      setTimeout(resolve, MOLE_ANIMATION_DURATION_MS)
    );
    dispatch({ type: 'activateRandomMoles' });
  };

  const timeoutRef = useRef<number>();

  useEffect(() => {
    const shuffle = (time: number) => {
      return window.setTimeout(async () => {
        if (state.status !== 'running') {
          return;
        }
        await activateRandomMolesWithDuration();
        timeoutRef.current = shuffle(Math.max(500, time - 100)); // TODO implement difficulty
      }, time);
    };

    timeoutRef.current = shuffle(2000);
    return () => window.clearInterval(timeoutRef.current);
  }, [dispatch, state.status]);

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

function useGame() {
  const context = useContext(GameContext);

  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }

  return context;
}

export { GameProvider, useGame };
