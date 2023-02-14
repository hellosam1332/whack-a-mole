import { useNavigate, useParams } from 'react-router-dom';
import styled from '@emotion/styled';
import PageLayout from '../components/PageLayout';
import GameStartForm from '../components/form/GameStartForm';

function Home() {
  const { col, row, moles } = useParams();
  const navigate = useNavigate();

  const submitForm = ({
    column,
    row: rowSize,
    numberOfMoles,
  }: {
    column: number;
    row: number;
    numberOfMoles: number;
  }) => {
    navigate(`/game/${column}/${rowSize}/${numberOfMoles}`);
  };

  const moveToRankingPage = () => {
    navigate('/ranking');
  };

  return (
    <PageLayout title="준비화면">
      <section>
        <GameStartForm
          initialValue={{
            column: col !== undefined ? Number(col) : 0,
            row: row !== undefined ? Number(row) : 0,
            numberOfMoles: moles !== undefined ? Number(moles) : 0,
          }}
          onSubmit={submitForm}
        />
        <RankingButton type="button" onClick={moveToRankingPage}>
          순위보기
        </RankingButton>
      </section>
    </PageLayout>
  );
}

const RankingButton = styled.button`
  margin-top: 20px;
  width: 100px;
`;

export default Home;
