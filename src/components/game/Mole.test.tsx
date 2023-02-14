import { vitest } from 'vitest';
import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';

import Mole from './Mole';

const whack = vitest.fn();

describe('Mole', () => {
  it('whack should NOT be called when active is false or whacked is true ', async () => {
    render(<Mole onWhack={whack} active={false} whacked />);

    const moleButton = screen.getByTestId('mole-button');
    expect(moleButton).toBeInTheDocument();

    await user.click(moleButton);
    expect(whack).not.toHaveBeenCalled();
  });

  it('whack should be called when active is true and whacked is false ', async () => {
    render(<Mole onWhack={whack} active whacked={false} />);

    const moleButton = screen.getByTestId('mole-button');
    expect(moleButton).toBeInTheDocument();

    await user.click(moleButton);
    expect(whack).toHaveBeenCalledTimes(1);
  });
});
