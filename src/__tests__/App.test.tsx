import { render, screen } from '@testing-library/react';
import { App } from '../App';

jest.mock('../components/header/header', () => ({
  Header: () => <div data-testid="header">Header</div>,
}));

jest.mock('../features/map/vehicles-map', () => ({
  VehiclesMap: () => <div data-testid="vehicles-map">VehiclesMap</div>,
}));

jest.mock('../features/vehicles/vehicles', () => ({
  VehicleTable: () => <div data-testid="vehicle-table">VehicleTable</div>,
}));

describe('App', () => {
  it('should render all main components', () => {
    render(<App />);

    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('vehicles-map')).toBeInTheDocument();
    expect(screen.getByTestId('vehicle-table')).toBeInTheDocument();
  });

  it('should set correct page title', () => {
    render(<App />);

    expect(document.title).toBe('Cars Control 631');
  });

  it('should have correct layout structure', () => {
    render(<App />);

    const mainContainer = screen.getByTestId('header').parentElement;
    expect(mainContainer).toHaveClass('w-full');
    expect(mainContainer).toHaveClass('min-h-screen');
    expect(mainContainer).toHaveClass('overflow-x-hidden');
    expect(mainContainer).toHaveClass('pb-10');
    expect(mainContainer).toHaveClass('bg-[#000F17]');
  });

  it('should have correct content container structure', () => {
    render(<App />);

    const contentContainer = screen.getByTestId('header').parentElement?.children[1];
    expect(contentContainer).toHaveClass('w-full');
    expect(contentContainer).toHaveClass('px-4');
    expect(contentContainer).toHaveClass('lg:px-10');
    expect(contentContainer).toHaveClass('max-w-[84.25rem]');
    expect(contentContainer).toHaveClass('space-y-6');
    expect(contentContainer).toHaveClass('mx-auto');
  });
}); 