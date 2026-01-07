import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createGroup } from "../lib/api";

const useCreateGroup = (name, location) => {
  const queryClient = useQueryClient();
  const { mutate: createGroupMutation, isPending: isCreatingGroup } =
    useMutation({
      mutationFn:()=> createGroup({name,location}),
      onSuccess: (data) => {
        toast.success("Group created successfully");
        queryClient.invalidateQueries("nearbyGroups");
      },
      onError: (error) => {
        toast.error(error.response.data.message);
      },
    });
  return { createGroupMutation, isCreatingGroup };
};

export default useCreateGroup;
