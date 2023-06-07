
import { useQuery } from "@tanstack/react-query";
import { fetchOrders, fetchUserOrders } from "./api";
import { USER_ORDERS_STORAGE_KEY, STORAGE_KEY } from "./settings";

export const useOrders = ({
  onSuccess = () => {},
  onError = (err) => {
    console.log(err);
  },
} = {}) =>
  useQuery({
    suspense: true,
    queryKey: [STORAGE_KEY],
    queryFn: fetchOrders,
    onSuccess,
    onError,
  });


  export const useUserOrders = ({
    onSuccess = () => {},
    onError = (err) => {
      console.log(err);
    },
  } = {}) =>
    useQuery({
      suspense: true,
      queryKey: [USER_ORDERS_STORAGE_KEY],
      queryFn: fetchUserOrders,
      onSuccess,
      onError,
    });