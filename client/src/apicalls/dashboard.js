import { axiosInstance } from ".";

const URL = "http://localhost:5000";

export const GetAllBloodGroupsInInventory = () => {
  return axiosInstance("get", `${URL}/dashboard/blood-groups-data`);
};
