import { describe, it, vitest } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import App from './App';

describe('Verify App router', () => {
  window.alert = vitest.fn();

  const renderApp = (path: string) => {
    render(
      <MemoryRouter initialEntries={[path]}>
        <App />
      </MemoryRouter>
    );
  };

  it('홈 경로는 준비화면으로 이동.', () => {
    renderApp('/2/2/1');

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      '준비화면'
    );
  });

  it('게임화면 경로는 경우 게임화면으로 이동.', () => {
    renderApp('/game/2/2/1');

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      '게임화면'
    );
  });

  it('결과화면 경로일 경우 결과화면으로 이동', () => {
    renderApp('/result/2/2/1');

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      '결과화면'
    );
  });

  it('순위화면 경로일 경우 순위화면으로 이동', () => {
    renderApp('/ranking');

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      '순위화면'
    );
  });
});
