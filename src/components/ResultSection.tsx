import styled from '@emotion/styled';

interface Props {
  score: number;
  onClickRetry(): void;
  onClickMoveToFirstPage(): void;
}

export default function ResultSection({
  score,
  onClickMoveToFirstPage,
  onClickRetry,
}: Props) {
  return (
    <Section>
      <h2>최종 점수</h2>
      <span>{`${score}점`}</span>
      <Buttons>
        <button type="button" onClick={onClickRetry}>
          다시하기
        </button>
        <button type="button" onClick={onClickMoveToFirstPage}>
          처음으로
        </button>
      </Buttons>
    </Section>
  );
}

const Section = styled.section`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Buttons = styled.div`
  padding: 30px 0;
  display: flex;
  gap: 10px;
`;
