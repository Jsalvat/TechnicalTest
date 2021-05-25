import { Square } from '../Pages/App';

export const createGrid = (x: number, y: number) => {
  const grid: Square[][] = [];
  for (let row = 0; row < x; row++) {
    grid.push([]);
    for (let col = 0; col < y; col++) {
      grid[row].push({ row, col, active: false, softActive: false });
    }
  }
  return grid;
};

export const inRange = (x: number, min: number, max: number) => {
  return (x - min) * (x - max) <= 0;
};
