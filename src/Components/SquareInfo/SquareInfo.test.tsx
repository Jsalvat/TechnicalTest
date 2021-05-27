import React from 'react';
import { fireEvent, getAllByTestId, getByText, render, screen } from '@testing-library/react';
import SquareInfo from './SquareInfo';
import { Square } from '../../Pages/App';
import './squareInfo.module.scss';

const squareInfoDataTest: Square = {
  row: 1,
  col: 2,
  active: true,
  softActive: false,
};

describe(`Test SquareInfoComponent`, () => {
  it(`It should render main div on first render`, () => {
    const { getByTestId } = render(<SquareInfo squareInfo={squareInfoDataTest} />);
    const generalContainer = getByTestId('squareInfo');
    expect(generalContainer).toBeInTheDocument();
  });
  it(`It should render row info`, () => {
    const { getByText } = render(<SquareInfo squareInfo={squareInfoDataTest} />);
    const rowText = getByText(`Row: ${squareInfoDataTest.row}`);
    expect(rowText).toBeInTheDocument();
  });
  it(`It should render column info`, () => {
    const { getByText } = render(<SquareInfo squareInfo={squareInfoDataTest} />);
    const columnText = getByText(`Column: ${squareInfoDataTest.col}`);
    expect(columnText).toBeInTheDocument();
  });
  it('should render child component, SquareInfoColor', () => {
    const { getByTestId } = render(<SquareInfo squareInfo={squareInfoDataTest} />);
    const childrenColor = getByTestId('testColorContainer');
    expect(childrenColor).toBeInTheDocument();
  });
});
