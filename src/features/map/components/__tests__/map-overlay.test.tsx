import { render, screen, fireEvent } from '@testing-library/react';
import { MapOverlay } from '../map-overlay';

describe('MapOverlay', () => {
  const mockVehicle = {
    equipmentId: '123',
    id: '1',
    lat: -23.550520,
    lng: -46.633308,
    fleet: 'Frota 1',
    name: 'Veículo 1',
    plate: 'ABC1234',
    ignition: 'on',
    createdAt: new Date().toISOString(),
  };

  const mockLocationVehicleDetails = {
    equipmentId: '123',
    id: '1',
    lat: -23.550520,
    lng: -46.633308,
    fleet: 'Frota 1',
    name: 'Veículo 1',
    plate: 'ABC1234',
    ignition: 'on',
    createdAt: new Date().toISOString(),
  };

  const mockSetLocationVehicleDetails = jest.fn();

  beforeEach(() => {
    mockSetLocationVehicleDetails.mockClear();
  });

  it('should render vehicle information', () => {
    render(
      <MapOverlay
        vehicle={mockVehicle}
        locationVehicleDetails={mockLocationVehicleDetails}
        setLocationVehicleDetails={mockSetLocationVehicleDetails}
      />
    );

    expect(screen.getByText(mockVehicle.name)).toBeInTheDocument();
    expect(screen.getByText(mockVehicle.plate)).toBeInTheDocument();
    expect(screen.getByText(mockVehicle.fleet)).toBeInTheDocument();
  });

  it('should show ignition status', () => {
    render(
      <MapOverlay
        vehicle={mockVehicle}
        locationVehicleDetails={mockLocationVehicleDetails}
        setLocationVehicleDetails={mockSetLocationVehicleDetails}
      />
    );

    const ignitionStatus = screen.getByText('Ignição');
    expect(ignitionStatus).toBeInTheDocument();
    expect(ignitionStatus.nextSibling).toHaveTextContent('Ligada');
  });

  it('should show last update time', () => {
    render(
      <MapOverlay
        vehicle={mockVehicle}
        locationVehicleDetails={mockLocationVehicleDetails}
        setLocationVehicleDetails={mockSetLocationVehicleDetails}
      />
    );

    expect(screen.getByText('Última atualização')).toBeInTheDocument();
  });

  it('should call setLocationVehicleDetails when close button is clicked', () => {
    render(
      <MapOverlay
        vehicle={mockVehicle}
        locationVehicleDetails={mockLocationVehicleDetails}
        setLocationVehicleDetails={mockSetLocationVehicleDetails}
      />
    );

    const closeButton = screen.getByRole('button');
    fireEvent.click(closeButton);

    expect(mockSetLocationVehicleDetails).toHaveBeenCalledWith(null);
  });

  it('should show correct ignition status text', () => {
    const vehicleWithIgnitionOff = {
      ...mockVehicle,
      ignition: 'off',
    };

    const { rerender } = render(
      <MapOverlay
        vehicle={mockVehicle}
        locationVehicleDetails={mockLocationVehicleDetails}
        setLocationVehicleDetails={mockSetLocationVehicleDetails}
      />
    );

    expect(screen.getByText('Ligada')).toBeInTheDocument();

    rerender(
      <MapOverlay
        vehicle={vehicleWithIgnitionOff}
        locationVehicleDetails={mockLocationVehicleDetails}
        setLocationVehicleDetails={mockSetLocationVehicleDetails}
      />
    );

    expect(screen.getByText('Desligada')).toBeInTheDocument();
  });

  it('should format date correctly', () => {
    const date = new Date('2024-01-01T12:00:00Z');
    const vehicleWithDate = {
      ...mockVehicle,
      createdAt: date.toISOString(),
    };

    render(
      <MapOverlay
        vehicle={vehicleWithDate}
        locationVehicleDetails={mockLocationVehicleDetails}
        setLocationVehicleDetails={mockSetLocationVehicleDetails}
      />
    );

    // Verifica se a data está formatada corretamente
    expect(screen.getByText(/01\/01\/2024/)).toBeInTheDocument();
  });
}); 