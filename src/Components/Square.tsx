import React, { useEffect, useState } from 'react';
import styles from './square.module.scss';
import { Square } from '../App';
import { useLongPress } from 'react-use';

interface SquareProps {
  data: Square;
  handleStarterPoint: (initial: { row: number; col: number }) => void;
}

const SquareComponent: React.FC<SquareProps> = ({ data, handleStarterPoint }) => {
  const [isActive, setIsActive] = useState(false);
  const { row, col, active } = data;

  useEffect(() => {
    active ? setIsActive(true) : setIsActive(false);
  }, [active]);

  const defaultOptions = {
    isPreventDefault: true,
    delay: 2000,
  };

  const starterPoint = () => {
    handleStarterPoint({ row, col });
  };

  const longPressEvent = useLongPress(starterPoint, defaultOptions);

  return (
    <div
      {...longPressEvent}
      onClick={() => {
        setIsActive(!isActive);
      }}
      onMouseOver={() => console.log(row, 'hovering')}
      className={`${styles.squareContainer} ${isActive ? styles.active : styles.inactive}`}
    />
  );
};

export default SquareComponent;
