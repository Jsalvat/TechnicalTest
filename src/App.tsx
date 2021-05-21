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
  const [initialSquare, setInitialSquare] = useState<{ row: Number; col: number }>();
  const [ongoingSquare, setOngoingSquare] = useState<{ row: Number; col: number }>();
  const [dragMode, setDragMode] = useState<boolean>(false);

  useEffect(() => {
    setCreatedGrid(create(5, 5));
  }, []);

  useEffect(() => {
    console.log(initialSquare);
  }, [initialSquare]);

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
    console.log(initSquare, 'initSquare');
    setInitialSquare(initSquare);
  };

  const handleOngoingPoint = (ongoingSquare: { row: number; col: number }) => {
    if (dragMode === true) {
      console.log(ongoingSquare, 'ongoingSquare');
      setOngoingSquare(ongoingSquare);
      if (initialSquare && initialSquare.col <= 2) {
        console.log('petita');
      } else {
        console.log('gran');
      }
    }
  };
  const handleFinalPoint = (finalSquare: { row: number; col: number }) => {
    console.log(finalSquare);
    setDragMode(false);
  };

  const handleOnClick = (clickedSquare: { row: number; col: number }) => {
    if (createdGrid) {
      let foundIndex: number | undefined = createdGrid[clickedSquare.row].findIndex(
        (x) => x.row == clickedSquare.row && x.col === clickedSquare.col
      );
      let tempCreatedGrid = createdGrid.slice();
      tempCreatedGrid[clickedSquare.row][foundIndex!].active =
        !tempCreatedGrid[clickedSquare.row][foundIndex!].active;
      setCreatedGrid(tempCreatedGrid);
    }
  };

  console.log(createdGrid);

  return (
    <div className="appContainer">
      {createdGrid &&
        createdGrid.map((e, eindex) => (
          <div key={eindex}>
            {e.map((f, findex) => (
              <SquareComponent
                handleOnClick={handleOnClick}
                handleOngoingPoint={handleOngoingPoint}
                handleStarterPoint={handleStarterPoint}
                handleFinalPoint={handleFinalPoint}
                key={findex}
                data={f}
              />
            ))}
          </div>
        ))}
    </div>
  );
}

export default App;
