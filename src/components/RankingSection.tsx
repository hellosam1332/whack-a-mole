import styled from '@emotion/styled';

const MAX_NUMBER_OF_ROW = 10;

type Result = {
  rank: number;
  date: string;
  score: number;
};

interface Props {
  results: Result[];
  onClickReset(): void;
}

export default function RankingSection({ results, onClickReset }: Props) {
  return (
    <Section>
      {results.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>순위</th>
              <th>일시</th>
              <th>점수</th>
            </tr>
          </thead>
          <tbody>
            {results
              .slice(0, MAX_NUMBER_OF_ROW - 1)
              .map(({ rank, date, score }) => (
                <tr key={rank}>
                  <td>{rank}</td>
                  <td>{date}</td>
                  <td>{score}</td>
                </tr>
              ))}
          </tbody>
        </table>
      ) : (
        <h2>기록이 없네요!</h2>
      )}

      <Buttons>
        <Button type="button" onClick={onClickReset}>
          초기화
        </Button>
      </Buttons>
    </Section>
  );
}

const Section = styled.section`
  padding: 50px 0;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  table > thead > tr > th {
    text-align: start;
  }
`;

const Buttons = styled.div`
  padding: 30px 0;
  display: flex;
  justify-content: center;
`;
const Button = styled.button`
  display: flex;
  justify-content: center;
  width: 100px;
`;
