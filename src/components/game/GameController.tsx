import styled from '@emotion/styled';
import { GameStaus } from './GameContext';

interface Props {
  status: GameStaus;
  onClickStart(): void;
  onClickPause(): void;
  onClickStop(): void;
}

export default function GameController({
  status,
  onClickPause,
  onClickStart,
  onClickStop,
}: Props) {
  return (
    <Container>
      {status === 'idle' ? (
        <button type="button" onClick={onClickStart}>
          시작하기
        </button>
      ) : null}
      {status === 'running' ? (
        <button type="button" onClick={onClickPause}>
          일시정지
        </button>
      ) : null}
      {status === 'paused' ? (
        <button type="button" onClick={onClickStart}>
          재개하기
        </button>
      ) : null}

      <button type="button" onClick={onClickStop}>
        그만하기
      </button>
    </Container>
  );
}

const Container = styled.div`
  padding: 30px 0px;
  display: flex;
  justify-content: center;
  gap: 30px;
`;
