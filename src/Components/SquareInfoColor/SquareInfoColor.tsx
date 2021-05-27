import React from 'react';
import styles from './squareInfoColor.module.scss';

interface SquareInfoColorProps {
  color: 'red' | 'green';
}

const SquareInfoColor: React.FC<SquareInfoColorProps> = ({ color }) => {
  return <div data-testid="testColorContainer" className={styles[`${color}Container`]} />;
};

export default SquareInfoColor;
