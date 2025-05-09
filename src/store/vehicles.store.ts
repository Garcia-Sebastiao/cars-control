import type {
  LocationVehicle,
  Vehicle,
} from "@/features/vehicles/types/vehicle.types";
import { create } from "zustand";

type VehicleStore = {
  selectedVehicle: Vehicle | null;
  setSelectedVehicle: (vehicle: Vehicle) => void;
  type?: "tracked" | "others";
  setType: (type: "tracked" | "others") => void;
  filter: string;
  setFilter: (filter: string) => void;
  locationVehicles: LocationVehicle[];
  setLocationVehicles: (locationVehicles: LocationVehicle[]) => void;
};

export const useVehiclesStore = create<VehicleStore>((set) => ({
  selectedVehicle: null,
  setSelectedVehicle: (vehicle) => set({ selectedVehicle: vehicle }),
  type: "tracked",
  setType: (type) => set({ type }),
  filter: "",
  setFilter: (filter) => set({ filter }),
  locationVehicles: [],
  setLocationVehicles: (locationVehicles) => set({ locationVehicles }),
}));
