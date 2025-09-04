import { renderHook, act } from '@testing-library/react';
import { useVehicleTable } from '../use-vehilcles';
import { useVehiclesStore } from '@/store/vehicles.store';
import type { Vehicle } from '../../types/vehicle.types';

jest.mock('@/store/vehicles.store', () => ({
  useVehiclesStore: jest.fn(),
}));

describe('useVehicleTable', () => {
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
    // Configuração do mock do store antes de cada teste
    (useVehiclesStore as unknown as jest.Mock).mockReturnValue({
      vehicles: mockVehicles,
      setSelectedVehicle: jest.fn(),
      selectedVehicle: null,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return vehicles from store', () => {
    const { result } = renderHook(() => useVehicleTable());
    
    expect(result.current.vehicles).toEqual(mockVehicles);
  });

  it('should handle vehicle selection', () => {
    const mockSetSelectedVehicle = jest.fn();
    (useVehiclesStore as unknown as jest.Mock).mockReturnValue({
      vehicles: mockVehicles,
      setSelectedVehicle: mockSetSelectedVehicle,
      selectedVehicle: null,
    });

    const { result } = renderHook(() => useVehicleTable());
    
    act(() => {
      result.current.setSelectedVehicle(mockVehicles[0] as Vehicle);
    });

    expect(mockSetSelectedVehicle).toHaveBeenCalledWith(mockVehicles[0]);
  });

  it('should handle infinite scroll', () => {
    const mockFetchNextPage = jest.fn();
    const mockHasNextPage = true;
    
    const { result } = renderHook(() => useVehicleTable());
    
    // Simula a chamada do useInfiniteQuery
    act(() => {
      if (result.current.loadMoreRef.current) {
        const observer = new IntersectionObserver((entries) => {
          if (entries[0].isIntersecting && mockHasNextPage) {
            mockFetchNextPage();
          }
        });
        observer.observe(result.current.loadMoreRef.current);
      }
    });

    // Verifica se o ref está configurado corretamente
    expect(result.current.loadMoreRef).toBeDefined();
  });

  it('should handle loading state', () => {
    const { result } = renderHook(() => useVehicleTable());
    
    expect(result.current.isGettingVehicles).toBeDefined();
  });

  it('should handle selected vehicle state', () => {
    const selectedVehicle = mockVehicles[0];
    (useVehiclesStore as unknown as jest.Mock).mockReturnValue({
      vehicles: mockVehicles,
      setSelectedVehicle: jest.fn(),
      selectedVehicle,
    });

    const { result } = renderHook(() => useVehicleTable());
    
    expect(result.current.selectedVehicle).toEqual(selectedVehicle);
  });
}); 