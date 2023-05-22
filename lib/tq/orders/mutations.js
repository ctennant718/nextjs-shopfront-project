import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteOrder, updateOrder, addOrder } from "./api";
import { STORAGE_KEY } from "./settings";

export const useAdd = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
};

export const useUpdate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
};

export const useDelete = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteOrder,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: [STORAGE_KEY] });
    },
  });
};