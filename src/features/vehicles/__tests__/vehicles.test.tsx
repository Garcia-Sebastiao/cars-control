import { render, screen } from '@testing-library/react';
import { VehicleTable } from '../vehicles';
import { useVehicleTable } from '../hooks/use-vehilcles';
import { vehiclesTableItems } from '../utils/vehicles-table-items';

jest.mock('../hooks/use-vehilcles', () => ({
  useVehicleTable: jest.fn(),
}));

describe('VehicleTable', () => {
  const mockVehicles = [
    {
      plate: 'ABC1234',
      fleet: 'Frota 1',
      type: 'Caminhão',
      model: 'Volvo',
      status: 'Ativo',
    },
    {
      plate: 'XYZ5678',
      fleet: 'Frota 2',
      type: 'Van',
      model: 'Mercedes',
      status: 'Inativo',
    },
  ];

  beforeEach(() => {
    (useVehicleTable as jest.Mock).mockReturnValue({
      vehicles: mockVehicles,
      isGettingVehicles: false,
      hasNextPage: false,
      selectedVehicle: null,
      loadMoreRef: { current: null },
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render table headers correctly', () => {
    render(<VehicleTable />);
    
    vehiclesTableItems.forEach((item) => {
      expect(screen.getByText(item.name)).toBeInTheDocument();
    });
  });

  it('should render vehicles data correctly', () => {
    render(<VehicleTable />);
    
    mockVehicles.forEach((vehicle) => {
      expect(screen.getByText(vehicle.plate)).toBeInTheDocument();
      expect(screen.getByText(vehicle.fleet)).toBeInTheDocument();
      expect(screen.getByText(vehicle.type)).toBeInTheDocument();
      expect(screen.getByText(vehicle.model)).toBeInTheDocument();
      expect(screen.getByText(vehicle.status)).toBeInTheDocument();
    });
  });

  it('should show loading state when fetching vehicles', () => {
    (useVehicleTable as jest.Mock).mockReturnValue({
      vehicles: [],
      isGettingVehicles: true,
      hasNextPage: false,
      selectedVehicle: null,
      loadMoreRef: { current: null },
    });

    render(<VehicleTable />);
    
    expect(screen.getByText('loader')).toBeInTheDocument();
  });

  it('should show load more indicator when hasNextPage is true', () => {
    (useVehicleTable as jest.Mock).mockReturnValue({
      vehicles: mockVehicles,
      isGettingVehicles: false,
      hasNextPage: true,
      selectedVehicle: null,
      loadMoreRef: { current: null },
    });

    render(<VehicleTable />);
    
    expect(screen.getAllByText('loader')).toHaveLength(1);
  });

  it('should highlight selected vehicle row', () => {
    const selectedVehicle = mockVehicles[0];
    
    (useVehicleTable as jest.Mock).mockReturnValue({
      vehicles: mockVehicles,
      isGettingVehicles: false,
      hasNextPage: false,
      selectedVehicle,
      loadMoreRef: { current: null },
    });

    render(<VehicleTable />);
    
    const selectedRow = screen.getByText(selectedVehicle.plate).closest('tr');
    expect(selectedRow).toHaveClass('bg-[#002d44]');
  });

  it('should show placeholder for empty values', () => {
    const vehiclesWithEmptyValues = [
      {
        plate: null,
        fleet: null,
        type: null,
        model: null,
        status: null,
      },
    ];

    (useVehicleTable as jest.Mock).mockReturnValue({
      vehicles: vehiclesWithEmptyValues,
      isGettingVehicles: false,
      hasNextPage: false,
      selectedVehicle: null,
      loadMoreRef: { current: null },
    });

    render(<VehicleTable />);
    
    const placeholders = screen.getAllByText('-- --');
    expect(placeholders).toHaveLength(5); 
  });
}); 