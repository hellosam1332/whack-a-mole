import GameStartUtils from './GameStartUtils';

describe('GameStartUtils', () => {
  it('최대 두더지 수는 전체 굴 개수에 절반 미만으로 입력 가능.', () => {
    const correctGivenExpectedPairs = [
      { given: { col: 2, row: 2 }, expected: 1 },
      { given: { col: 2, row: 3 }, expected: 2 },
      { given: { col: 2, row: 4 }, expected: 3 },
      { given: { col: 2, row: 5 }, expected: 4 },
      { given: { col: 2, row: 6 }, expected: 5 },
      { given: { col: 3, row: 3 }, expected: 4 },
      { given: { col: 3, row: 4 }, expected: 5 },
      { given: { col: 3, row: 5 }, expected: 7 },
      { given: { col: 3, row: 6 }, expected: 8 },
      { given: { col: 4, row: 4 }, expected: 7 },
      { given: { col: 4, row: 5 }, expected: 9 },
      { given: { col: 4, row: 6 }, expected: 11 },
      { given: { col: 5, row: 5 }, expected: 12 },
      { given: { col: 5, row: 6 }, expected: 14 },
      { given: { col: 6, row: 6 }, expected: 17 },
    ];

    correctGivenExpectedPairs.forEach(({ given: { col, row }, expected }) =>
      expect(GameStartUtils.calculateMaxNumberOfMoles(col, row)).toEqual(
        expected
      )
    );
  });

  it('최대 column 사이즈는 2 이상 6 이하', () => {
    const truthyGivens = [2, 3, 4, 5, 6];
    truthyGivens.forEach((given) =>
      expect(GameStartUtils.validateColSize(given)).toBeTruthy()
    );

    const falsyGivens = [1, 7, 8, 9];
    falsyGivens.forEach((given) =>
      expect(GameStartUtils.validateColSize(given)).toBeFalsy()
    );
  });

  it('최대 row 사이즈는 2 이상 6 이하', () => {
    const truthyGivens = [2, 3, 4, 5, 6];
    truthyGivens.forEach((given) =>
      expect(GameStartUtils.validateColSize(given)).toBeTruthy()
    );

    const falsyGivens = [1, 7, 8, 9];
    falsyGivens.forEach((given) =>
      expect(GameStartUtils.validateColSize(given)).toBeFalsy()
    );
  });

  it('두더지 수는 최소 1마리에서 전체 굴 개수에 절반', () => {
    expect(GameStartUtils.validateNumberOfMoles(1, 2, 2)).toBeTruthy();
    expect(GameStartUtils.validateNumberOfMoles(0, 2, 2)).toBeFalsy();
    expect(GameStartUtils.validateNumberOfMoles(2, 2, 2)).toBeFalsy();
  });
});
