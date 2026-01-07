import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createGroup } from "../lib/api";
import { useNavigate } from "react-router";
import { toast } from "react-hot-toast";

const useCreateGroup = (name, location) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: createGroupMutation, isPending: isCreatingGroup } =
    useMutation({
      mutationFn: () => createGroup({ name, location }),
      onSuccess: (data) => {
        navigate(`/group/${data?._id}`);
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
