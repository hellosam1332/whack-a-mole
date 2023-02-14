import PageLayout from '../components/PageLayout';
import RankingSection from '../components/RankingSection';
import useLocalStorage, { ScoreResult } from '../hooks/useLocalStorage';

function RankingPage() {
  const [results, setResults] = useLocalStorage<ScoreResult[]>({
    key: 'score-results',
    initialValue: [],
  });

  const handleClickReset = () => {
    setResults([]);
  };

  return (
    <PageLayout title="순위화면">
      <RankingSection
        results={results
          .sort((a, b) => b.score - a.score)
          .map(({ date, score }, index) => ({
            rank: index + 1,
            score,
            date: new Date(date).toLocaleString(),
          }))}
        onClickReset={handleClickReset}
      />
    </PageLayout>
  );
}

export default RankingPage;
