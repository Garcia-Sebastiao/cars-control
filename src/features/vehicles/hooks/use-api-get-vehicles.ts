import { useInfiniteQuery } from "@tanstack/react-query";
import type { GetVehiclesParams } from "../api/get-vehicles";
import { getVehicles } from "../api/get-vehicles";
import { useVehiclesStore } from "@/store/vehicles.store";
import { useEffect } from "react";

export function useApiGetVehicles(
  filters?: Omit<GetVehiclesParams, "page" | "perPage">
) {
  const { setLocationVehicles } = useVehiclesStore();
  const {
    data: vehicles,
    isLoading: isGettingVehicles,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["vehicles", filters],
    initialPageParam: 1,
    queryFn: ({ pageParam = 1 }) =>
      getVehicles({ ...filters, page: pageParam, perPage: 10 }),
    getNextPageParam: (lastPage) => {
      const { currentPage, perPage, total } = lastPage.meta;
      const hasMore = currentPage * perPage < total;
      return hasMore ? currentPage + 1 : undefined;
    },
    refetchInterval: 2 * 60 * 1000,
  });

  useEffect(() => {
    setLocationVehicles(
      vehicles?.pages.flatMap((page) => page.locationVehicles) ?? []
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vehicles]);

  return {
    vehicles: vehicles?.pages.flatMap((page) => page.data),
    locationVehicles: vehicles?.pages.flatMap((page) => page.locationVehicles),
    totalElements: vehicles?.pages.flatMap((page) => page.meta.total),
    isGettingVehicles,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
    refetch,
  };
}
