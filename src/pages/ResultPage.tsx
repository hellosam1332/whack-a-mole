import { useNavigate, useParams } from 'react-router-dom';
import PageLayout from '../components/PageLayout';
import ResultSection from '../components/ResultSection';
import useLocalStorage, { ScoreResult } from '../hooks/useLocalStorage';

function ResultPage() {
  const { col, row, moles } = useParams();
  const navigate = useNavigate();
  const [results] = useLocalStorage<ScoreResult[]>({
    key: 'score-results',
    initialValue: [],
  });

  const firstResult = results.sort((a, b) => b.date - a.date)[0];

  return (
    <PageLayout title="결과화면">
      {firstResult !== undefined ? (
        <ResultSection
          score={firstResult.score}
          onClickRetry={() => navigate(`/game/${col}/${row}/${moles}`)}
          onClickMoveToFirstPage={() => navigate(`/${col}/${row}/${moles}`)}
        />
      ) : null}
    </PageLayout>
  );
}

export default ResultPage;
