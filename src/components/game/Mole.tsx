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
      <Bush />
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
  overflow: hidden;
  display: grid;
  place-items: center;
`;

const Bush = styled.div`
  position: absolute;
  bottom: -15%;
  background: url('/bush.png') no-repeat;
  background-size: contain;
  background-position-y: bottom;
  z-index: 2;
  width: 100%;
  aspect-ratio: 363/147;
`;

const Button = styled.button<{
  transitionDuration: number;
  visible: boolean;
}>`
  position: absolute;
  width: 50%;
  bottom: ${({ visible }) => (visible ? '0' : '-70%')};
  z-index: 1;
  transition: ease-in ${({ transitionDuration: duration }) => `${duration}ms`};

  background: url('/teemo.png') no-repeat;
  background-size: contain;
  aspect-ratio: 598/885;
`;

export default Mole;
