export interface Vehicle {
  id: string;
  plate: string;
  fleet: string | null;
  model: string;
  status: string;
  type: string;
  nameOwner: string;
  createdAt: string;
}

export interface LocationVehicle {
  id: string;
  fleet: string;
  equipmentId: string;
  name: string;
  plate: string;
  ignition: string;
  lat: number;
  lng: number;
  createdAt: string;
}
