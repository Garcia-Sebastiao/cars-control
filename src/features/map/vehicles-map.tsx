import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useEffect, useState } from "react";
import { useVehicleMap } from "./hooks/use-vehicles-map";
import { MapOverlay } from "./components/map-overlay";

const containerStyle = {
  width: "100%",
  height: "600px",
};

type CenterProps = {
  lat: number;
  lng: number;
};

export function VehiclesMap() {
  const {
    locationVehicles,
    locationVehicleDetails,
    setLocationVehicleDetails,
    isApiLoaded,
    setIsApiLoaded,
    center,
    handleSelectVehicle,
  } = useVehicleMap();

  const [internalMapKey, setInternalMapKey] = useState(0);

  useEffect(() => {
    if (locationVehicles.length > 0) {
      setInternalMapKey((prev) => prev + 1);
    }
  }, [locationVehicles]);

  return (
    <div className="bg-[#001622] p-4 space-y-4 rounded-2xl border border-[#002D44]">
      <h4 className="font-semibold text-white text-base">Mapa rastreador</h4>

      <div className="w-full h-full rounded-2xl overflow-hidden">
        <LoadScript
          googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY!}
          onLoad={() => setIsApiLoaded(true)}
        >
          {isApiLoaded && center ? (
            <>
              {locationVehicles[0]?.equipmentId ? (
                <GoogleMap
                  key={internalMapKey}
                  mapContainerStyle={containerStyle}
                  center={center as CenterProps}
                  zoom={8}
                >
                  {locationVehicles.map((vehicle, index) => (
                    <div key={vehicle?.equipmentId}>
                      <Marker
                        onClick={() => handleSelectVehicle(vehicle)}
                        position={{ lat: vehicle?.lat, lng: vehicle?.lng }}
                        title={`Veículo ${vehicle?.id}`}
                        icon={{
                          url: `/icons/vahicle-${index > 4 ? 4 : index}.png`,
                          scaledSize: new google.maps.Size(40, 63),
                        }}
                      />
                      {locationVehicleDetails?.equipmentId ===
                        vehicle?.equipmentId && (
                        <MapOverlay
                          vehicle={vehicle}
                          locationVehicleDetails={locationVehicleDetails}
                          setLocationVehicleDetails={setLocationVehicleDetails}
                        />
                      )}
                    </div>
                  ))}
                </GoogleMap>
              ) : (
                <div className="flex items-center justify-center h-[600px]">
                  <div className="text-white">Nenhum veículo encontrado</div>
                </div>
              )}
            </>
          ) : (
            <div className="w-full h-[600px] flex items-center justify-center">
              <div className="text-white">Carregando mapa...</div>
            </div>
          )}
        </LoadScript>
      </div>
    </div>
  );
}
