import { render, screen, waitFor } from '@testing-library/react';
import { VehiclesMap } from '../vehicles-map';
import { useVehicleMap } from '../hooks/use-vehicles-map';

// Mock do hook useVehicleMap
jest.mock('../hooks/use-vehicles-map', () => ({
  useVehicleMap: jest.fn(),
}));

// Mock do Google Maps
jest.mock('@react-google-maps/api', () => ({
  GoogleMap: ({ children }: { children: React.ReactNode }) => <div data-testid="google-map">{children}</div>,
  LoadScript: ({ children }: { children: React.ReactNode }) => <div data-testid="load-script">{children}</div>,
  Marker: () => <div data-testid="marker" />,
}));

describe('VehiclesMap', () => {
  const mockVehicles = [
    {
      equipmentId: '123',
      id: '1',
      lat: -23.550520,
      lng: -46.633308,
    },
  ];

  const mockLocationVehicleDetails = {
    equipmentId: '123',
    id: '1',
    lat: -23.550520,
    lng: -46.633308,
  };

  beforeEach(() => {
    // Configuração do mock do hook antes de cada teste
    (useVehicleMap as jest.Mock).mockReturnValue({
      locationVehicles: mockVehicles,
      locationVehicleDetails: mockLocationVehicleDetails,
      setLocationVehicleDetails: jest.fn(),
      isApiLoaded: true,
      setIsApiLoaded: jest.fn(),
      center: { lat: -23.550520, lng: -46.633308 },
      handleSelectVehicle: jest.fn(),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render map container with title', () => {
    render(<VehiclesMap />);
    
    expect(screen.getByText('Mapa rastreador')).toBeInTheDocument();
  });

  it('should render loading state when API is not loaded', () => {
    (useVehicleMap as jest.Mock).mockReturnValue({
      ...useVehicleMap(),
      isApiLoaded: false,
    });

    render(<VehiclesMap />);
    
    expect(screen.getByText('Carregando mapa...')).toBeInTheDocument();
  });

  it('should render "Nenhum veículo encontrado" when no vehicles are available', () => {
    (useVehicleMap as jest.Mock).mockReturnValue({
      ...useVehicleMap(),
      locationVehicles: [],
    });

    render(<VehiclesMap />);
    
    expect(screen.getByText('Nenhum veículo encontrado')).toBeInTheDocument();
  });

  it('should render map with markers when vehicles are available', async () => {
    render(<VehiclesMap />);
    
    await waitFor(() => {
      expect(screen.getByTestId('google-map')).toBeInTheDocument();
      expect(screen.getByTestId('marker')).toBeInTheDocument();
    });
  });

  it('should update map key when vehicles change', async () => {
    const { rerender } = render(<VehiclesMap />);
    
    // Simula mudança nos veículos
    (useVehicleMap as jest.Mock).mockReturnValue({
      ...useVehicleMap(),
      locationVehicles: [...mockVehicles, { ...mockVehicles[0], id: '2' }],
    });

    rerender(<VehiclesMap />);
    
    await waitFor(() => {
      expect(screen.getByTestId('google-map')).toBeInTheDocument();
    });
  });
}); 