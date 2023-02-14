import { vitest } from 'vitest';
import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';

import GameController from './GameController';

const start = vitest.fn();
const pause = vitest.fn();
const stop = vitest.fn();

describe('GameController', () => {
  beforeEach(() => {
    start.mockClear();
    pause.mockClear();
    stop.mockClear();
  });

  it('idle 상태에는 시작하기 버튼과 그만하기 버튼을 보여준다', async () => {
    render(
      <GameController
        status="idle"
        onClickStart={start}
        onClickPause={pause}
        onClickStop={stop}
      />
    );

    const startButton = screen.getByRole('button', { name: /시작하기/ });
    expect(startButton).toBeInTheDocument();

    await user.click(startButton);
    expect(start).toHaveBeenCalledTimes(1);

    await verrifyStopButton();
  });

  it('running 상태에는 일시정지 버튼과 그만하기 버튼을 보여준다', async () => {
    render(
      <GameController
        status="running"
        onClickStart={start}
        onClickPause={pause}
        onClickStop={stop}
      />
    );

    const pauseButton = screen.getByRole('button', { name: /일시정지/ });
    expect(pauseButton).toBeInTheDocument();

    await user.click(pauseButton);
    expect(pause).toHaveBeenCalledTimes(1);

    await verrifyStopButton();
  });

  it('paused 상태에는 재개하기 버튼과 그만하기 버튼을 보여준다', async () => {
    render(
      <GameController
        status="paused"
        onClickStart={start}
        onClickPause={pause}
        onClickStop={stop}
      />
    );

    const resumeButton = screen.getByRole('button', { name: /재개하기/ });
    expect(resumeButton).toBeInTheDocument();

    await user.click(resumeButton);
    expect(start).toHaveBeenCalledTimes(1);

    await verrifyStopButton();
  });
});

async function verrifyStopButton() {
  const stopButton = screen.getByRole('button', { name: /그만하기/ });
  expect(stopButton).toBeInTheDocument();

  await user.click(stopButton);
  expect(stop).toHaveBeenCalledTimes(1);
}
