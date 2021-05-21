import React, { useEffect, useState } from 'react';
import styles from './square.module.scss';
import { Square } from '../App';
import { useLongPress } from 'react-use';

interface SquareProps {
  data: Square;
  handleStarterPoint: (initial: { row: number; col: number }) => void;
  handleOngoingPoint: (point: { row: number; col: number }) => void;
  handleOnClick: (point: { row: number; col: number }) => void;
  handleFinalPoint: (point: { row: number; col: number }) => void;
}

const SquareComponent: React.FC<SquareProps> = ({
  data,
  handleStarterPoint,
  handleOngoingPoint,
  handleOnClick,
  handleFinalPoint,
}) => {
  const { row, col, active, softActive } = data;

  const defaultOptions = {
    isPreventDefault: true,
    delay: 1000,
  };

  const starterPoint = () => {
    handleStarterPoint({ row, col });
  };

  const longPressEvent = useLongPress(starterPoint, defaultOptions);

  return (
    <div
      {...longPressEvent}
      onClick={() => handleOnClick({ row, col })}
      onMouseOver={() => handleOngoingPoint({ row, col })}
      onMouseUp={() => handleFinalPoint({ row, col })}
      className={`${styles.squareContainer} ${softActive ? styles.softActive : ''} ${
        active ? styles.active : styles.inactive
      }`}
    />
  );
};

export default SquareComponent;
