import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import App from './App';

describe('<App />', () => {
  it(`It should render main div container on the first render`, () => {
    const { getByTestId } = render(<App />);
    const generalContainer = getByTestId('generalContainer');
    expect(generalContainer).toBeInTheDocument();
  });

  it('In the first render and by default it should render a 5x5 grid', () => {
    const { getAllByTestId } = render(<App />);
    const allSquares = getAllByTestId('squareComponent');
    expect(allSquares).toHaveLength(25);
  });
});
