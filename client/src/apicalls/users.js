import { axiosInstance } from ".";

const URL = "http://localhost:5000";

export const LoginUser = async (payload) => {
  const response = await axiosInstance("post", `${URL}/login`, payload);
  return response;
};

export const RegisterUser = async (payload) => {
  const response = await axiosInstance("post", `${URL}/register`, payload);
  return response;
};

export const GetCurrentUser = async () => {
  const response = await axiosInstance("get", `${URL}/get-current-user`);
  return response;
};

export const GetAllDonarsOfAnOrganization = () => {
  return axiosInstance("get", `${URL}/get-all-donars`);
};

export const GetAllHospitalsOfAnOrganization = () => {
  return axiosInstance("get", `${URL}/get-all-hospitals`);
};

export const GetAllOrganizationsOfADonar = () => {
  return axiosInstance("get", `${URL}/get-all-organizations-of-a-donar`);
};

export const GetAllOrganizationsOfAHospital = () => {
  return axiosInstance("get", `${URL}/get-all-organizations-of-a-hospital`);
};
