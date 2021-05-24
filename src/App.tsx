import React, { useEffect, useState } from 'react';
import './App.css';
import SquareComponent, { SquareDataState } from './Components/Square';

export interface Square {
  row: number;
  col: number;
  active: boolean;
  softActive: boolean;
}

function App() {
  const [createdGrid, setCreatedGrid] = useState<Square[][] | undefined>();
  const [initialSquare, setInitialSquare] = useState<{ row: number; col: number }>();
  const [ongoingSquare, setOngoingSquare] = useState<{ row: number; col: number }>();
  const [dragMode, setDragMode] = useState<boolean>(false);
  const [initialActive, setInitialActive] = useState<boolean>(false);

  useEffect(() => {
    setCreatedGrid(create(5, 5));
  }, []);

  const create = (x: number, y: number) => {
    const grid: Square[][] = [];
    for (let row = 0; row < x; row++) {
      grid.push([]);
      for (let col = 0; col < y; col++) {
        grid[row].push({ row, col, active: false, softActive: false });
      }
    }
    return grid;
  };

  const handleStarterPoint = (initSquare: { row: number; col: number; active: boolean }) => {
    setInitialSquare(initSquare);
    setInitialActive(initSquare.active);
    createdGrid?.map((e) =>
      e.map((f) => {
        if (f.col === initSquare?.col && f.row === initSquare?.row) {
          f.softActive = true;
        }
      })
    );
    setDragMode(true);
  };

  const inRange = (x: number, min: number, max: number) => {
    return (x - min) * (x - max) <= 0;
  };

  const handleOngoingPoint = (ongoingSquare: { row: number; col: number }) => {
    if (dragMode === true && initialSquare) {
      setOngoingSquare(ongoingSquare);
      createdGrid?.map((e) =>
        e.map((f) => {
          if (
            inRange(f.col, ongoingSquare.col, initialSquare?.col) &&
            inRange(f.row, ongoingSquare.row, initialSquare?.row)
          ) {
            f.softActive = true;
          } else {
            f.softActive = false;
          }
        })
      );
      setCreatedGrid(createdGrid);
    }
  };
  const handleFinalPoint = () => {
    if (dragMode == true) {
      createdGrid?.map((e) =>
        e.map((f) => {
          if (f.softActive === true) {
            f.softActive = false;
            f.active = initialActive;
          }
        })
      );
      setDragMode(false);
    }
  };

  const handleOnClick = (clickedSquare: { row: number; col: number }) => {
    if (createdGrid && !dragMode) {
      let foundIndex: number | undefined = createdGrid[clickedSquare.row].findIndex(
        (x) => x.row == clickedSquare.row && x.col === clickedSquare.col
      );
      let tempCreatedGrid = createdGrid.slice();
      tempCreatedGrid[clickedSquare.row][foundIndex!].active =
        !tempCreatedGrid[clickedSquare.row][foundIndex!].active;
      setCreatedGrid(tempCreatedGrid);
    }
  };

  const handleDoubleClick = (clickedSquare: { row: number; col: number; active: boolean }) => {
    if (dragMode == false && createdGrid) {
      createdGrid?.map((e) =>
        e.map((f) => {
          if (f.row === clickedSquare.row) {
            f.active = clickedSquare.active;
          }
        })
      );
      let tempCreatedGrid = createdGrid.slice();
      setCreatedGrid(tempCreatedGrid);
    }
  };

  const handleSquareDataState = (squareDataState: SquareDataState) => {
    console.log(squareDataState);
  };

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
                handleDoubleClick={handleDoubleClick}
                handleSquareDataState={handleSquareDataState}
                key={findex}
                data={f}
                dragMode={dragMode}
              />
            ))}
          </div>
        ))}
    </div>
  );
}

export default App;
