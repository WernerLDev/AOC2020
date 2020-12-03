export type Position = {
  row: number;
  col: number;
};

export const Grid = <T>(items: T[], width: number) => (position: Position) => {
  const col = position.col >= width ? position.col % width : position.col;
  return items[position.row * width + col];
};
