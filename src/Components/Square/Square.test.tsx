import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { Square } from '../../Pages/App';
import SquareComponent from './Square';

const squareInfoDataTest: Square = {
  row: 1,
  col: 2,
  active: true,
  softActive: false,
};
const mockHandler = jest.fn();

let component: any;

beforeEach(() => {
  component = render(
    <SquareComponent
      handleStarterPoint={() => {}}
      handleFinalPoint={mockHandler()}
      handleDoubleClick={() => {}}
      handleOnClick={() => {}}
      handleOngoingPoint={() => {}}
      dragMode={false}
      data={squareInfoDataTest}
    />
  );
});

describe('<Square />', () => {
  it('should render', () => {
    const el = component.getByTestId('squareComponent');
    expect(el).toBeInTheDocument();
  });
  it('In should fire once the event', () => {
    const button = component.getByTestId('squareComponent');
    fireEvent.click(button);

    expect(mockHandler).toHaveBeenCalledTimes(1);
  });

  it('In should have background green by default', () => {
    const el = component.getByTestId('squareComponent');
    expect(el).toHaveClass('squareContainer  active');
  });
});
