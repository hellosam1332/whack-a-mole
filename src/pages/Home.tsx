import { useNavigate, useParams } from 'react-router-dom';
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
      </section>
    </PageLayout>
  );
}

export default Home;
