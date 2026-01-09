import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getGroupInfoById } from "../lib/api";

const useGetGroupInfoById = (id) => {
  const { data: groupData, isLoading: groupIsLoading } = useQuery({
    queryKey: ["groupInfo"],
    queryFn: () => getGroupInfoById(id),
    enabled: !!id,
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to load group");
    },
  });
  return { groupData, groupIsLoading };
};

export default useGetGroupInfoById;
