import React from 'react';
import { Square } from '../../Pages/App';
import SquareInfoColor from '../SquareInfoColor/SquareInfoColor';
import styles from './squareInfo.module.scss';

interface SquareInfoProps {
  squareInfo: Square;
}

const SquareInfo: React.FC<SquareInfoProps> = ({ squareInfo }) => {
  const { row, col, active, softActive } = squareInfo;

  return (
    <div className={styles.resultSquare}>
      <div className={styles.infoContainer}>
        <span>Row: {row}</span>
        <span>Column: {col}</span>
        <span>
          Color: <SquareInfoColor color={active === true ? 'red' : 'green'} />
        </span>
      </div>
    </div>
  );
};

export default SquareInfo;
