import type { LocationVehicle } from "@/features/vehicles/types/vehicle.types";
import { OverlayView } from "@react-google-maps/api";
import { MapItemDetails } from "./map-item-details";

export function MapOverlay({
  vehicle,
  locationVehicleDetails,
  setLocationVehicleDetails,
}: {
  vehicle: LocationVehicle;
  locationVehicleDetails: LocationVehicle;
  setLocationVehicleDetails: (vehicle: LocationVehicle | null) => void;
}) {
  return (
    <OverlayView
      position={{ lat: vehicle?.lat, lng: vehicle?.lng }}
      mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
      getPixelPositionOffset={(width, height) => ({
        x: -(width / 2),
        y: -height,
      })}
    >
      <MapItemDetails
        plate={locationVehicleDetails?.plate}
        fleet={locationVehicleDetails?.fleet}
        date={locationVehicleDetails?.createdAt}
        lat={locationVehicleDetails?.lat}
        lng={locationVehicleDetails?.lng}
        onClose={() => setLocationVehicleDetails(null)}
      />
    </OverlayView>
  );
}
