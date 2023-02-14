import { vitest } from 'vitest';
import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';

import ResultSection from './ResultSection';

const retry = vitest.fn();
const move = vitest.fn();

describe('ResultSection', () => {
  it('render', async () => {
    render(
      <ResultSection
        score={3}
        onClickRetry={retry}
        onClickMoveToFirstPage={move}
      />
    );

    expect(
      screen.getByRole('heading', { level: 2, name: /최종 점수/ })
    ).toBeInTheDocument();

    const retryButton = screen.getByRole('button', { name: /다시하기/ });
    await user.click(retryButton);
    expect(retry).toHaveBeenCalledTimes(1);

    const moveButton = screen.getByRole('button', { name: /처음으로/ });
    await user.click(moveButton);
    expect(move).toHaveBeenCalledTimes(1);
  });
});
