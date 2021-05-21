import React, { useEffect, useState } from 'react';
import './App.css';
import SquareComponent from './Components/Square';

export interface Square {
  row: number;
  col: number;
  active: boolean;
}

function App() {
  const [createdGrid, setCreatedGrid] = useState<Square[][] | undefined>();
  const [initial, setInitial] = useState<{ row: Number; col: number }>();
  const [dragMode, setDragMode] = useState<boolean>(false);

  useEffect(() => {
    setCreatedGrid(create(5, 5));
  }, []);

  useEffect(() => {
    console.log(initial);
  }, [initial]);

  const create = (x: number, y: number) => {
    const grid: Square[][] = [];
    for (let row = 0; row < x; row++) {
      grid.push([]);
      for (let col = 0; col < y; col++) {
        grid[row].push({ row, col, active: false });
      }
    }
    return grid;
  };

  const handleStarterPoint = (initSquare: { row: number; col: number }) => {
    setDragMode(true);
    setInitial(initSquare);
  };

  return (
    <div className="appContainer">
      {createdGrid ? (
        createdGrid.map((e, eindex) => (
          <div key={eindex}>
            {e.map((f, findex) => (
              <SquareComponent handleStarterPoint={handleStarterPoint} key={findex} data={f} />
            ))}
          </div>
        ))
      ) : (
        <span>Loading</span>
      )}
    </div>
  );
}

export default App;
