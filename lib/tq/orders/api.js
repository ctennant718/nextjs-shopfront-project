import axios from "axios";

export const ORDERS_ENDPOINT = "/api/v1/orders/";

export const fetchOrders = async () => {
  const {data} = await axios(ORDERS_ENDPOINT);
  console.log(data);
  return data;
};

export const fetchUserOrders = async () => {
  const {data} = await axios(`${ORDERS_ENDPOINT}own`);
  console.log(data);
  return data;
};

export const addOrder = async (data) => {
  console.log("about to add", data);
  const response = await axios({
    method: "POST",
    url: ORDERS_ENDPOINT,
    data,
  });
  return response.data;
};

export const updateOrder = async ({ id, data }) => {
  console.log("in api", id, data);
  const response = await axios({
    url: `${ORDERS_ENDPOINT}${id}`,
    method: "PUT",
    data,
  });
  return response.data;
};

export const deleteOrder = async (id) => {
  return await axios({
    method: "DELETE",
    url: `${ORDERS_ENDPOINT}${id}`,
  });
};