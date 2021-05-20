import React from 'react';
import styles from './square.module.scss';
import { Square } from '../App';

interface SquareProps {
  data: Square;
}

const SquareComponent: React.FC<SquareProps> = ({ data }) => {
  const { row, col, active } = data;
  return (
    <div className={`${styles.squareContainer} ${active ? styles.active : styles.inactive}`}>
      Square
    </div>
  );
};

export default SquareComponent;
