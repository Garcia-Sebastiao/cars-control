import { renderHook, act } from '@testing-library/react';
import { useVehicleMap } from '../use-vehicles-map';
import { useVehiclesStore } from '@/store/vehicles.store';
import type { LocationVehicle } from '@/features/vehicles/types/vehicle.types';

// Mock do store
jest.mock('@/store/vehicles.store', () => ({
  useVehiclesStore: jest.fn(),
}));

describe('useVehicleMap', () => {
  const mockLocationVehicles = [
    {
      equipmentId: '123',
      id: '1',
      lat: -23.550520,
      lng: -46.633308,
    },
    {
      equipmentId: '456',
      id: '2',
      lat: -23.550520,
      lng: -46.633308,
    },
  ];

  beforeEach(() => {
    (useVehiclesStore as unknown as jest.Mock).mockReturnValue({
      locationVehicles: mockLocationVehicles,
      setLocationVehicleDetails: jest.fn(),
      locationVehicleDetails: null,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return location vehicles from store', () => {
    const { result } = renderHook(() => useVehicleMap());
    
    expect(result.current.locationVehicles).toEqual(mockLocationVehicles);
  });

  it('should handle vehicle selection on map', () => {
    const mockSetLocationVehicleDetails = jest.fn();
    (useVehiclesStore as unknown as jest.Mock).mockReturnValue({
      locationVehicles: mockLocationVehicles,
      setLocationVehicleDetails: mockSetLocationVehicleDetails,
      locationVehicleDetails: null,
    });

    const { result } = renderHook(() => useVehicleMap());
    
    act(() => {
      result.current.handleSelectVehicle(mockLocationVehicles[0] as LocationVehicle);
    });

    expect(mockSetLocationVehicleDetails).toHaveBeenCalledWith(mockLocationVehicles[0]);
  });

  it('should handle API loading state', () => {
    const { result } = renderHook(() => useVehicleMap());
    
    expect(result.current.isApiLoaded).toBeDefined();
    expect(typeof result.current.setIsApiLoaded).toBe('function');
  });

  it('should calculate center based on vehicles', () => {
    const { result } = renderHook(() => useVehicleMap());
    
    expect(result.current.center).toBeDefined();
    expect(result.current.center).toHaveProperty('lat');
    expect(result.current.center).toHaveProperty('lng');
  });

  it('should handle selected vehicle details', () => {
    const selectedVehicle = mockLocationVehicles[0];
    (useVehiclesStore as unknown as jest.Mock).mockReturnValue({
      locationVehicles: mockLocationVehicles,
      setLocationVehicleDetails: jest.fn(),
      locationVehicleDetails: selectedVehicle,
    });

    const { result } = renderHook(() => useVehicleMap());
    
    expect(result.current.locationVehicleDetails).toEqual(selectedVehicle);
  });

  it('should handle empty vehicles list', () => {
    (useVehiclesStore as unknown as jest.Mock).mockReturnValue({
      locationVehicles: [],
      setLocationVehicleDetails: jest.fn(),
      locationVehicleDetails: null,
    });

    const { result } = renderHook(() => useVehicleMap());
    
    expect(result.current.locationVehicles).toEqual([]);
    expect(result.current.center).toBeDefined();
  });
}); 