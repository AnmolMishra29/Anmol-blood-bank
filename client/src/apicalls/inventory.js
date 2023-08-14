import { axiosInstance } from ".";

const URL = "http://localhost:5000";

export const AddInventory = (data) => {
  return axiosInstance("post", `${URL}/inventory/add`, data);
};

export const GetInventory = () => {
  return axiosInstance("get", `${URL}/inventory/get`);
};

export const GetInventoryWithFilters = (filters, limit) => {
  return axiosInstance("post", `${URL}/inventory/filter`, { filters, limit });
};
