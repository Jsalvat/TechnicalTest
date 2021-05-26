import React from 'react';
import { fireEvent, getAllByTestId, getByText, render, screen } from '@testing-library/react';
import App from './App';

test(`It should render main div container on the first render`, () => {
  const { getByTestId } = render(<App />);
  const generalContainer = getByTestId('generalContainer');
  expect(generalContainer).toBeInTheDocument();
});

test('In the first render and by default it should render a 5x5 grid', () => {
  const { getAllByTestId } = render(<App />);
  const allSquares = getAllByTestId('squareComponent');
  console.log(allSquares.length);
  expect(allSquares).toHaveLength(25);
});
