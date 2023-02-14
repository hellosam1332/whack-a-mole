import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { GAME_TIME_MS } from '../../config';
import useCountDown from '../../hooks/useCountDown';
import useLocalStorage, { ScoreResult } from '../../hooks/useLocalStorage';
import { useGame } from './GameContext';
import GameController from './GameController';
import GamePanel from './GamePanel';
import Mole from './Mole';

export default function GameSectionContainer() {
  const {
    state: {
      status,
      score,
      moles,
      columnSize,
      rowSize,
      numberOfActiveMolesInOnce,
    },
    dispatch,
  } = useGame();

  const navigate = useNavigate();

  const [results, setResults] = useLocalStorage<ScoreResult[]>({
    key: 'score-results',
    initialValue: [],
  });

  const moveToResultPage = () => {
    setResults([...results, { score, date: Date.now() }]);
    setTimeout(() => {
      navigate(`/result/${columnSize}/${rowSize}/${numberOfActiveMolesInOnce}`);
    }, 500);
  };

  const { count, start, pause } = useCountDown({
    startFrom: Math.floor(GAME_TIME_MS / 1000),
    onDone: moveToResultPage,
  });

  const handleWhack = (id: number) => () => {
    dispatch({ type: 'whack', targetId: id });
  };

  return (
    <section>
      <GamePanel currentScore={score} remainingTime={count} />
      <Moles col={columnSize} row={rowSize}>
        {moles.map(({ id, active, whacked }) => (
          <Mole
            key={id}
            active={active}
            whacked={whacked}
            onWhack={handleWhack(id)}
          />
        ))}
      </Moles>
      <GameController
        status={status}
        onClickStart={() => {
          start();
          dispatch({ type: 'updateGameStatus', status: 'running' });
        }}
        onClickPause={() => {
          pause();
          dispatch({ type: 'updateGameStatus', status: 'paused' });
        }}
        onClickStop={() => {
          navigate(`/${columnSize}/${rowSize}/${numberOfActiveMolesInOnce}`);
        }}
      />
    </section>
  );
}

const Moles = styled.div<{ col: number; row: number }>`
  max-width: ${({ col }) => `${col * 200}px`};
  min-width: ${({ col }) => `${col * 100}px`};
  margin: 0 auto;
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(${({ col }) => col}, 1fr);
  grid-template-rows: repeat(${({ row }) => row}, 1fr);
  aspect-ratio: ${({ col, row }) => col / row};
`;
