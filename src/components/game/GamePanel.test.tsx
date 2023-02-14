import { render, screen } from '@testing-library/react';
import GamePanel from './GamePanel';

describe('GamePanel', () => {
  it('render', () => {
    render(<GamePanel currentScore={100} remainingTime={100} />);

    expect(
      screen.getByRole('heading', { level: 3, name: /남은시간 100초/ })
    ).toBeInTheDocument();

    expect(
      screen.getByRole('heading', { level: 3, name: /100점/ })
    ).toBeInTheDocument();
  });
});
