// hooks/useVehicleMap.ts
import { useEffect, useState } from "react";
import { useVehiclesStore } from "@/store/vehicles.store";
import type { LocationVehicle } from "@/features/vehicles/types/vehicle.types";

export function useVehicleMap() {
  const { locationVehicles } = useVehiclesStore();

  const [locationVehicleDetails, setLocationVehicleDetails] =
    useState<LocationVehicle | null>(null);
  const [isApiLoaded, setIsApiLoaded] = useState(false);
  const [mapKey, setMapKey] = useState(0);
  const [center, setCenter] = useState<{ lat: number; lng: number } | null>(
    null
  );

  useEffect(() => {
    if (locationVehicles.length > 0) {
      // Primeiro desativa a API
      setIsApiLoaded(false);
      
      // Força a reinicialização do mapa
      setMapKey((prev) => prev + 1);
      
      // Atualiza o centro do mapa
      setCenter({
        lat: locationVehicles[0]?.lat,
        lng: locationVehicles[0]?.lng,
      });

      // Pequeno delay para garantir que o mapa seja reiniciado
      const timer = setTimeout(() => {
        setIsApiLoaded(true);
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [locationVehicles]);

  const handleSelectVehicle = (vehicle: LocationVehicle) => {
    setLocationVehicleDetails(vehicle);
    setCenter({ lat: vehicle?.lat, lng: vehicle?.lng });
  };

  return {
    locationVehicles,
    locationVehicleDetails,
    setLocationVehicleDetails,
    isApiLoaded,
    setIsApiLoaded,
    mapKey,
    center,
    handleSelectVehicle,
  };
}
