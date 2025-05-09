import { vehiclesApi } from "@/services/api";
import type { Vehicle, LocationVehicle } from "../types/vehicle.types";

export interface GetVehiclesParams {
  type?: string;
  plate?: string;
  fleet?: string;
  filter?: string;
  page?: number;
  perPage?: number;
}

interface VehiclesApiResponse {
  content: {
    vehicles: Vehicle[];
    locationVehicles: LocationVehicle[];
    totalPages: number;
    page: number;
    perPage: string;
  };
}

export async function getVehicles(params: GetVehiclesParams = {}) {
  const { page = 1, perPage = 20, ...filters } = params;

  const response = await vehiclesApi.get<VehiclesApiResponse>(
    "/vehicles/list-with-paginate",
    {
      params: { page, perPage, ...filters },
    }
  );

  return {
    data: response.data.content.vehicles,
    locationVehicles: response.data.content.locationVehicles,
    meta: {
      total:
        Number(response.data.content.totalPages) *
        Number(response.data.content.perPage),
      currentPage: response.data.content.page,
      perPage: Number(response.data.content.perPage),
    },
  };
}
