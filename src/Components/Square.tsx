import React, { useCallback, useEffect, useState } from 'react';
import styles from './square.module.scss';
import { Square } from '../App';
import { useLongPress } from 'react-use';
import { debounce } from '../Hooks/debounce';
import ApiCall from '../Api/Postman';

export interface SquareDataState {
  clickTimeout?: number;
  firePostmanAction: boolean;
  row: number;
  col: number;
  active: boolean;
  softActive: boolean;
}

interface SquareProps {
  data: Square;
  handleStarterPoint: (initial: { row: number; col: number; active: boolean }) => void;
  handleOngoingPoint: (point: { row: number; col: number }) => void;
  handleOnClick: (point: { row: number; col: number }) => void;
  handleFinalPoint: (point: { row: number; col: number }) => void;
  handleDoubleClick: (point: { row: number; col: number; active: boolean }) => void;
  dragMode: boolean;
  handleSquareDataState: (squareDataState: SquareDataState) => void;
}

const SquareComponent: React.FC<SquareProps> = ({
  data,
  handleStarterPoint,
  handleOngoingPoint,
  handleOnClick,
  handleFinalPoint,
  handleDoubleClick,
  handleSquareDataState,
  dragMode,
}) => {
  const { row, col, active, softActive } = data;
  const [clickTimeout, setClickTimeOut] = useState<any>(null);
  const [firePostmanAction, setFirePostmanAction] = useState(false);
  const [stateData, setStateData] = useState({});

  const defaultOptions = {
    isPreventDefault: true,
    delay: 1000,
  };

  const starterPoint = () => {
    handleStarterPoint({ row, col, active });
  };

  const handleClicks = () => {
    if (clickTimeout !== null) {
      handleDoubleClick({ row, col, active });
      clearTimeout(clickTimeout);
      setClickTimeOut(null);
      setFirePostmanAction(!firePostmanAction);
    } else {
      setClickTimeOut(
        setTimeout(() => {
          handleOnClick({ row, col });
          clearTimeout(clickTimeout);
          setClickTimeOut(null);
          setFirePostmanAction(!firePostmanAction);
        }, 200)
      );
    }
  };

  const longPressEvent = useLongPress(starterPoint, defaultOptions);

  useEffect(() => {
    verify();
  }, [firePostmanAction]);

  const verify = useCallback(
    debounce(() => {
      ApiCall({
        clickTimeout: clickTimeout,
        firePostmanAction: firePostmanAction,
        row: row,
        col: col,
        active: active,
        softActive: softActive,
      }).then((res) => handleSquareDataState(res.json));
    }, 500),
    []
  );

  console.log(dragMode);

  return (
    <div
      onClick={handleClicks}
      onMouseOver={() => handleOngoingPoint({ row, col })}
      onMouseUp={() => {
        handleFinalPoint({ row, col });
        setFirePostmanAction(!firePostmanAction);
      }}
      className={`${styles.squareContainer} ${softActive ? styles.softActive : ''} ${
        active ? styles.active : styles.inactive
      }`}
      {...(!dragMode ? { ...longPressEvent } : {})}
    />
  );
};

export default SquareComponent;
