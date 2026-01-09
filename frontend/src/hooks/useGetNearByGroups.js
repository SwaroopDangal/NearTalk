import { useQuery } from "@tanstack/react-query";
import { getNearbyGroups } from "../lib/api";
import { toast } from "react-hot-toast";

const useNearbyGroups = (lng, lat) => {
  const { data: nearbyGroupsData, isLoading: isNearbyGroupsLoading } = useQuery(
    {
      queryKey: ["nearbyGroups", lng, lat],
      queryFn: () => getNearbyGroups({ lng, lat }),
      enabled: !!lng && !!lat,
      onError: (error) => {
        toast.error(error.response?.data?.message || "Failed to load groups");
      },
      retry: false,
    }
  );

  return { nearbyGroupsData, isNearbyGroupsLoading };
};

export default useNearbyGroups;
