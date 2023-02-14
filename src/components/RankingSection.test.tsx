import { vitest } from 'vitest';
import { screen } from '@testing-library/dom';
import { render } from '@testing-library/react';
import user from '@testing-library/user-event';

import RankingSection from './RankingSection';

const reset = vitest.fn();

describe('RankingSection', () => {
  beforeEach(() => {
    render(<RankingSection results={mockResults} onClickReset={reset} />);
  });

  it('Render table header', () => {
    const headers = screen.getAllByRole('columnheader');
    const headerNames = headers.map((header) => header.textContent);
    expect(headerNames).toEqual(['순위', '일시', '점수']);
  });

  it('Render maxinum 10 rows', () => {
    const rows = screen.getAllByRole('row');
    expect(rows).toHaveLength(10);
  });

  it('when results are emtpy, render nothing text', () => {
    render(<RankingSection results={[]} onClickReset={reset} />);
    const nothingText = screen.getByText(/기록이 없네요!/);
    expect(nothingText).toBeInTheDocument();
  });

  it('Reset should be called when button is clicked', async () => {
    const resetButton = screen.getByRole('button', { name: /초기화/ });
    await user.click(resetButton);
    expect(reset).toHaveBeenCalledTimes(1);
  });
});

const mockResults = [
  { rank: 1, date: 'mock-date', score: 15 },
  { rank: 2, date: 'mock-date', score: 14 },
  { rank: 3, date: 'mock-date', score: 13 },
  { rank: 4, date: 'mock-date', score: 12 },
  { rank: 5, date: 'mock-date', score: 11 },
  { rank: 6, date: 'mock-date', score: 10 },
  { rank: 7, date: 'mock-date', score: 9 },
  { rank: 8, date: 'mock-date', score: 8 },
  { rank: 9, date: 'mock-date', score: 7 },
  { rank: 10, date: 'mock-date', score: 6 },
  { rank: 11, date: 'mock-date', score: 5 },
];
