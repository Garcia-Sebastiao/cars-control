// hooks/use-vehicle-table.ts
import { useEffect, useRef } from "react";
import { useApiGetVehicles } from "./use-api-get-vehicles";
import { useVehiclesStore } from "@/store/vehicles.store";

export function useVehicleTable() {
  const { selectedVehicle, type, filter, setSelectedVehicle } =
    useVehiclesStore();

  const {
    vehicles,
    isGettingVehicles,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useApiGetVehicles({ type, filter });

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!hasNextPage || isFetchingNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      },
      {
        root: null,
        rootMargin: "100px",
        threshold: 0,
      }
    );

    const el = loadMoreRef.current;
    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return {
    vehicles,
    isGettingVehicles,
    isFetchingNextPage,
    hasNextPage,
    selectedVehicle,
    setSelectedVehicle,
    loadMoreRef,
  };
}
