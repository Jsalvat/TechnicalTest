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

  useEffect(() => {
    setCreatedGrid(create(5, 5));
  }, []);

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

  console.log(createdGrid);

  return (
    <div className="appContainer">
      {createdGrid ? (
        createdGrid.map((e, eindex) => (
          <div key={eindex}>
            {e.map((f, findex) => (
              <SquareComponent key={findex} data={f} />
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
