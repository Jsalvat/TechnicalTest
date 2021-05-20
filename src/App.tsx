import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [createdGrid, setCreatedGrid] = useState<Square[][] | undefined>();

  interface Square {
    row: number;
    col: number;
    active: boolean;
  }

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
          <span key={eindex}>
            {e.map((f, findex) => (
              <div className="square" key={findex}>
                {f.row}
                {f.col}
              </div>
            ))}
          </span>
        ))
      ) : (
        <span>Loading</span>
      )}
    </div>
  );
}

export default App;
