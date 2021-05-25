import React, { useCallback, useEffect, useState } from 'react';
import ApiCall from '../Api/Postman';
import './App.css';
import { debounce } from '../Hooks/debounce';
import styles from './App.module.scss';
import SquareInfo from '../Components/SquareInfo/SquareInfo';
import SquareComponent from '../Components/Square/Square';
import { createGrid, inRange } from '../Utils/Utils';

export interface Square {
  row: number;
  col: number;
  active: boolean;
  softActive: boolean;
}

function App() {
  const [createdGrid, setCreatedGrid] = useState<Square[][] | undefined>();
  const [initialSquare, setInitialSquare] = useState<{ row: number; col: number }>();
  const [onGoingSquare, setOngoingSquare] = useState<{ row: number; col: number }>();
  const [dragMode, setDragMode] = useState<boolean>(false);
  const [initialActive, setInitialActive] = useState<boolean>(false);
  const [fireApiCall, setFireApiCall] = useState(false);
  const [apiData, setApiData] = useState<Square[][] | undefined>();
  const [show, setShow] = useState<boolean>(true);

  useEffect(() => {
    setCreatedGrid(createGrid(5, 5));
  }, []);

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
    updateApiData(createdGrid);
  }, [fireApiCall]);

  const updateApiData = useCallback(
    debounce(() => {
      ApiCall(createdGrid).then((res) => setApiData(res.json));
    }, 500),
    [fireApiCall]
  );

  return (
    <>
      {!show && (
        <div className={styles.buttonShowContainer}>
          <button className={styles.button} onClick={() => setShow(!show)}>
            Show API Response
          </button>
        </div>
      )}
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
              <button className={styles.button} onClick={() => setShow(!show)}>
                Hide API Response
              </button>
            </div>

            {apiData.map((e) => e.map((f, i) => <SquareInfo key={i} squareInfo={f} />))}
          </div>
        )}
      </div>
    </>
  );
}

export default App;
