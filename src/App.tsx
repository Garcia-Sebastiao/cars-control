import { Header } from "./components/header/header";
import { VehiclesMap } from "./features/map/vehicles-map";
import { VehicleTable } from "./features/vehicles/vehicles";
import { Helmet } from "react-helmet";
export function App() {
  return (
    <>
      <Helmet>
        <title>Cars Control 631</title>
      </Helmet>
      <div className="w-full min-h-screen overflow-x-hidden pb-10 bg-[#000F17]">
        <div className="w-full px-4 lg:px-10 max-w-[84.25rem] space-y-6 mx-auto">
          <Header />
          <VehiclesMap />
          <VehicleTable />
        </div>
      </div>
    </>
  );
}
