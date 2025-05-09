"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { vehiclesTableItems } from "./utils/vehicles-table-items";
import { useVehicleTable } from "./hooks/use-vehilcles";
import { VehicleTableItem } from "./components/vehicle-table-item";

export function VehicleTable() {
  const {
    vehicles,
    isGettingVehicles,
    hasNextPage,
    selectedVehicle,
    loadMoreRef,
  } = useVehicleTable();

  return (
    <div className="bg-[#001622] border-[#002D44] border rounded-2xl overflow-hidden max-h-[600px]">
      <div className="overflow-y-auto max-h-[600px]">
        <Table>
          <TableHeader className="sticky top-0 z-10 bg-[#001622] border-b border-b-[#002D44]">
            <TableRow className="divide-x border-none border-b border-b-[#002D44] divide-[#002D44]">
              {vehiclesTableItems?.map((item) => (
                <TableHead
                  key={item?.id}
                  className="text-white text-sm text-center px-[5.625rem] py-4 font-medium bg-[#001622]"
                >
                  {item?.name}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          {isGettingVehicles ? (
            <TableBody>
              <TableRow>
                <TableCell colSpan={5} className="text-center py-4">
                  <div
                    ref={loadMoreRef}
                    className="flex justify-center gap-2 items-center"
                  >
                    <span className="loader" />
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          ) : (
            <TableBody>
              {vehicles?.map((vehicle, index) => (
                <TableRow
                  key={index}
                  className={`border-b border-[#002d44] divide-x divide-[#002d44] hover:bg-[#002d44]/50 cursor-pointer ${
                    selectedVehicle &&
                    selectedVehicle.plate === vehicle.plate &&
                    selectedVehicle.fleet === vehicle.fleet
                      ? "bg-[#002d44]"
                      : ""
                  }`}
                >
                  <VehicleTableItem>
                    {vehicle.plate ?? "-- --"}
                  </VehicleTableItem>
                  <VehicleTableItem>
                    {vehicle.fleet ?? "-- --"}
                  </VehicleTableItem>
                  <VehicleTableItem>{vehicle.type ?? "-- --"}</VehicleTableItem>
                  <VehicleTableItem>
                    {vehicle.model ?? "-- --"}
                  </VehicleTableItem>
                  <VehicleTableItem>
                    {vehicle.status ?? "-- --"}
                  </VehicleTableItem>
                </TableRow>
              ))}

              {hasNextPage && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-4">
                    <div
                      ref={loadMoreRef}
                      className="flex justify-center gap-2 items-center"
                    >
                      <span className="loader" />
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          )}
        </Table>
      </div>
    </div>
  );
}
