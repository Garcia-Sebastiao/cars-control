import { Header } from "./components/header/header";
import { VehiclesMap } from "./features/map/vehicles-map";
import { VehicleTable } from "./features/vehicles/vehicles";

export function App() {
  return (
    <div className="w-full min-h-screen pb-10 bg-[#000F17]">
      <div className="w-full px-10 max-w-[84.25rem] space-y-6 mx-auto">
        <Header />
        <VehiclesMap />
        <VehicleTable />
      </div>
    </div>
  );
}
