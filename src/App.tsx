import React, { useCallback, useEffect, useState } from 'react';
import ApiCall from './Api/Postman';
import './App.css';
import SquareComponent, { SquareDataState } from './Components/Square';
import { debounce } from './Hooks/debounce';
import styles from './App.module.scss';

export interface Square {
  row: number;
  col: number;
  active: boolean;
  softActive: boolean;
}

function App() {
  const [createdGrid, setCreatedGrid] = useState<Square[][] | undefined>();
  const [initialSquare, setInitialSquare] = useState<{ row: number; col: number }>();
  const [dragMode, setDragMode] = useState<boolean>(false);
  const [initialActive, setInitialActive] = useState<boolean>(false);
  const [fireApiCall, setFireApiCall] = useState(false);
  const [apiData, setApiData] = useState<Square[][] | undefined>();
  const [show, setShow] = useState<boolean>(true);

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
      setFireApiCall(!fireApiCall);
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
      setFireApiCall(!fireApiCall);
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
      setFireApiCall(!fireApiCall);
    }
  };

  useEffect(() => {
    verify(createdGrid);
  }, [fireApiCall]);

  const verify = useCallback(
    debounce(() => {
      ApiCall(createdGrid).then((res) => setApiData(res.json));
    }, 500),
    [fireApiCall]
  );

  return (
    <>
      {!show && <button onClick={() => setShow(!show)}>Si</button>}
      <div className={styles.appContainer}>
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
                  key={findex}
                  data={f}
                  dragMode={dragMode}
                />
              ))}
            </div>
          ))}
        {apiData && show && (
          <div className={styles.resultContainer}>
            <div className={styles.apiTitle}>
              <span>Result Api Call</span>
              <button onClick={() => setShow(!show)}>No</button>
            </div>

            {apiData.map((e) =>
              e.map((f, i) => (
                <div key={i} className={styles.resultSquare}>
                  <div className={styles.infoContainer}>
                    Info:
                    <span>Row: {f.row}</span>
                    <span>Column: {f.col}</span>
                    <span>Color: {f.active === true ? 'Red' : 'Green'}</span>
                    <span>IsNowSelected: {f.softActive === true ? 'yes' : 'no'}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default App;
