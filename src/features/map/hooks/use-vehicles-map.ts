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
      setIsApiLoaded(false);
      setCenter({
        lat: locationVehicles[2].lat,
        lng: locationVehicles[2].lng,
      });
      setMapKey((prev) => prev + 1);
    }
  }, [locationVehicles]);

  const handleSelectVehicle = (vehicle: LocationVehicle) => {
    setLocationVehicleDetails(vehicle);
    setCenter({ lat: vehicle.lat, lng: vehicle.lng });
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
