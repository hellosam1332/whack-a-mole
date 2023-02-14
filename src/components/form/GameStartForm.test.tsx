import { vitest } from 'vitest';
import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';

import GameStartForm from './GameStartForm';

describe('GameStartForm', () => {
  const submit = vitest.fn();

  it('모든 form 입력이 유효하면 submit 버튼 클릭 시 payload 와 함께 sumbit 호출', async () => {
    render(
      <GameStartForm
        initialValue={{
          column: 0,
          row: 0,
          numberOfMoles: 0,
        }}
        onSubmit={submit}
      />
    );

    const column = screen.getByRole('spinbutton', { name: /열/ });
    await user.type(column, '3');
    expect(column).not.toHaveErrorMessage();

    const row = screen.getByRole('spinbutton', { name: /행/ });
    await user.type(row, '3');
    expect(row).not.toHaveErrorMessage();

    const numberOfMoles = screen.getByRole('spinbutton', { name: /두더지/ });
    await user.type(numberOfMoles, '4');
    expect(numberOfMoles).not.toHaveErrorMessage();

    const submitButton = screen.getByRole('button', { name: /시작/ });
    await user.click(submitButton);

    expect(submit).toHaveBeenCalledTimes(1);
    expect(submit).toHaveBeenCalledWith({
      column: 3,
      row: 3,
      numberOfMoles: 4,
    });
  });
});
