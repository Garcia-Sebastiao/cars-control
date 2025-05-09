import {
  GoogleMap,
  LoadScript,
  Marker,
  OverlayView,
} from "@react-google-maps/api";
import { useVehicleMap } from "./hooks/use-vehicles-map";
import { MapItemDetails } from "./components/map-item-details";

const containerStyle = {
  width: "100%",
  height: "600px",
};

export function VehiclesMap() {
  const {
    locationVehicles,
    locationVehicleDetails,
    setLocationVehicleDetails,
    isApiLoaded,
    setIsApiLoaded,
    mapKey,
    center,
    handleSelectVehicle,
  } = useVehicleMap();

  if (locationVehicles.length === 0 || !center) {
    return <div>Nenhum veículo encontrado</div>;
  }

  return (
    <div className="bg-[#001622] p-4 space-y-4 rounded-2xl border border-[#002D44]">
      <h4 className="font-semibold text-white text-base">Mapa rastreador</h4>

      <div className="w-full h-full rounded-2xl overflow-hidden">
        <LoadScript
          googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY!}
          onLoad={() => setIsApiLoaded(true)}
        >
          {isApiLoaded && (
            <GoogleMap
              key={mapKey}
              mapContainerStyle={containerStyle}
              center={center}
              zoom={8}
            >
              {locationVehicles.map((vehicle) => {
                const randIndex = Math.floor(Math.random() * 4) + 1;

                return (
                  <div key={vehicle?.equipmentId}>
                    <Marker
                      onClick={() => handleSelectVehicle(vehicle)}
                      position={{ lat: vehicle.lat, lng: vehicle.lng }}
                      title={`Veículo ${vehicle.id}`}
                      icon={{
                        url: `/icons/vahicle-${randIndex}.png`,
                        scaledSize: new window.google.maps.Size(40, 63),
                      }}
                    />

                    {locationVehicleDetails?.equipmentId ===
                      vehicle.equipmentId && (
                      <OverlayView
                        position={{ lat: vehicle.lat, lng: vehicle.lng }}
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
                    )}
                  </div>
                );
              })}
            </GoogleMap>
          )}
        </LoadScript>
      </div>
    </div>
  );
}
