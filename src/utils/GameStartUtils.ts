const MIN_NUMBER_OF_MOLES = 1;

const GameStartUtils = {
  calculateMaxNumberOfMoles: (colSize: number, rowSize: number) =>
    Math.ceil((colSize * rowSize) / 2) - 1,

  validateColSize: (size: number) => size >= 2 && size <= 6,
  validateRowSize: (size: number) => size >= 2 && size <= 6,
  validateNumberOfMoles: (
    numOfMoles: number,
    colSize: number,
    rowSize: number
  ) =>
    numOfMoles >= MIN_NUMBER_OF_MOLES &&
    numOfMoles <= GameStartUtils.calculateMaxNumberOfMoles(colSize, rowSize),
};

export default GameStartUtils;
