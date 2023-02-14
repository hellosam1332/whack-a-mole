import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { GameProvider } from '../components/game/GameContext';
import PageLayout from '../components/PageLayout';
import GameSection from '../components/game/GameSectionContainer';
import GameStartUtils from '../utils/GameStartUtils';

function GamePage() {
  const { columnSize, rowSize, numberOfMoles, isValid } = useQueryParam();

  if (!isValid) {
    return null;
  }

  return (
    <PageLayout title="게임화면">
      <GameProvider
        columnSize={columnSize}
        rowSize={rowSize}
        numberOfActiveMolesInOnce={numberOfMoles}
      >
        <GameSection />
      </GameProvider>
    </PageLayout>
  );
}

function useQueryParam() {
  const { col, row, moles } = useParams();
  const columnSize = Number(col);
  const rowSize = Number(row);
  const numberOfMoles = Number(moles);

  const navigate = useNavigate();

  const isValid =
    !Number.isNaN(columnSize) &&
    !Number.isNaN(rowSize) &&
    !Number.isNaN(numberOfMoles) &&
    GameStartUtils.validateColSize(columnSize) &&
    GameStartUtils.validateRowSize(rowSize) &&
    GameStartUtils.validateNumberOfMoles(numberOfMoles, columnSize, rowSize);

  useEffect(() => {
    if (isValid) {
      return;
    }
    alert('잘못된 접근입니다.');
    navigate('/');
  }, [isValid, navigate]);

  return { columnSize, rowSize, numberOfMoles, isValid };
}

export default GamePage;
