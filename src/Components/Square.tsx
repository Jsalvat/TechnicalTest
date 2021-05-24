import React, { useEffect, useState } from 'react';
import styles from './square.module.scss';
import { Square } from '../App';
import { useLongPress } from 'react-use';

interface SquareProps {
  data: Square;
  handleStarterPoint: (initial: { row: number; col: number; active: boolean }) => void;
  handleOngoingPoint: (point: { row: number; col: number }) => void;
  handleOnClick: (point: { row: number; col: number }) => void;
  handleFinalPoint: (point: { row: number; col: number }) => void;
  handleDoubleClick: (point: { row: number; col: number; active: boolean }) => void;
  dragMode: boolean;
}

const SquareComponent: React.FC<SquareProps> = ({
  data,
  handleStarterPoint,
  handleOngoingPoint,
  handleOnClick,
  handleFinalPoint,
  handleDoubleClick,
  dragMode,
}) => {
  const { row, col, active, softActive } = data;
  const [clickTimeout, setClickTimeOut] = useState<any>(null);

  const defaultOptions = {
    isPreventDefault: false,
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
    } else {
      setClickTimeOut(
        setTimeout(() => {
          handleOnClick({ row, col });
          clearTimeout(clickTimeout);
          setClickTimeOut(null);
        }, 200)
      );
    }
  };

  const longPressEvent = !dragMode && useLongPress(starterPoint, defaultOptions);

  return (
    <div
      onClick={handleClicks}
      onMouseOver={() => handleOngoingPoint({ row, col })}
      onMouseUp={() => handleFinalPoint({ row, col })}
      className={`${styles.squareContainer} ${softActive ? styles.softActive : ''} ${
        active ? styles.active : styles.inactive
      }`}
      {...longPressEvent}
    />
  );
};

export default SquareComponent;
