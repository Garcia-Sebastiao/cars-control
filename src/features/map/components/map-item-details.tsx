import { formatDateTime } from "@/utils/date";

type MapItemDetailsProps = {
  plate: string;
  fleet: string;
  date: string;
  lat: number;
  lng: number;
  onClose: () => void;
};

export function MapItemDetails({
  onClose,
  plate,
  fleet,
  date,
  lat,

  lng,
}: MapItemDetailsProps) {
  return (
    <div className="absolute -top-44 -left-[84px]">
      <div className="bg-[#001622] text-white w-[166px] rounded-lg p-3 relative">
        <div className="flex flex-col gap-1 items-center">
          <span className="text-[10px] text-white font-medium">
            Placa {plate}
          </span>
          <span className="text-[10px] text-white font-medium">
            Frota {fleet}
          </span>
          <span className="text-[10px] text-white font-medium">
            {date ? formatDateTime(date) : "N/A"}
          </span>
          <span className="text-[10px] text-white font-medium">
            {lat} , {lng}
          </span>
        </div>

        <button
          className="absolute top-2 text-blue-500 right-2"
          onClick={onClose}
        >
          X
        </button>
        <div className="w-4 h-4 absolute rotate-45 bg-[#001622] left-1/2 -translate-x-1/2" />
      </div>
    </div>
  );
}
