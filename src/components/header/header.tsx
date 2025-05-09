"use client";

import { InputRadio } from "../shared/input-radio/input-radio";
import { Button } from "../shared/button/button";
import { useVehiclesStore } from "@/store/vehicles.store";
export function Header() {
  const { setFilter, setType, type } = useVehiclesStore();

  return (
    <header className="flex flex-col gap-y-8 lg:flex-row border-b border-b-[#002D44] py-5 w-full justify-between items-center">
      <div className="flex items-center  gap-x-4 lg:gap-x-[8.5rem]">
        <h2 className="text-lg text-white font-medium">Lista</h2>
        <div className="flex items-center gap-6">
          <InputRadio
            isChecked={type === "tracked"}
            onChange={() => setType("tracked")}
            label="Rastreados"
          />
          <InputRadio
            isChecked={type === "others"}
            onChange={() => setType("others")}
            label="Outros"
          />
        </div>
      </div>
      <div className="flex w-full md:w-auto gap-2">
        <input
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Buscar por placa ou frota"
          className="bg-transparent rounded-lg border border-[#89919B] py-[11px] px-[10px] text-xs text-white w-[17.125rem] placeholder:text-[#8A939D]"
        />
        <Button className="px-14">Novo</Button>
      </div>
    </header>
  );
}
