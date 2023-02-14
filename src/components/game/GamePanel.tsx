import styled from '@emotion/styled';

interface Props {
  remainingTime: number;
  currentScore: number;
}

export default function GamePanel({ remainingTime, currentScore }: Props) {
  return (
    <Container>
      <h3>{`남은시간 ${remainingTime}초`}</h3>
      <h3>{`${currentScore}점`}</h3>
    </Container>
  );
}

const Container = styled.div`
  padding: 30px;
  display: flex;
  justify-content: space-between;
`;
