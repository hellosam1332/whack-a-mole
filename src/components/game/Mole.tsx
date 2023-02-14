import styled from '@emotion/styled';
import { MOLE_ANIMATION_DURATION_MS } from '../../config';

interface Props {
  active: boolean;
  whacked: boolean;
  onWhack(): void;
}

function Mole({ active, whacked, onWhack }: Props) {
  const whack = () => {
    if (!active || whacked) {
      return;
    }
    onWhack();
  };

  return (
    <Container>
      <Button
        data-testid="mole-button"
        type="button"
        onClick={whack}
        visible={active && !whacked}
        transitionDuration={whacked ? 0 : MOLE_ANIMATION_DURATION_MS}
      />
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  background-color: red;
  overflow: hidden;
  display: grid;
  place-items: center;
`;

const Button = styled.button<{
  transitionDuration: number;
  visible: boolean;
}>`
  position: absolute;
  width: 50%;
  height: 70%;
  bottom: ${({ visible }) => (visible ? '0' : '-70%')};
  z-index: 1;
  transition: ease-in ${({ transitionDuration: duration }) => `${duration}ms`};
`;

export default Mole;
