import { axiosInstance } from "./axios";

export const createGroup = async ({ name, location }) => {
  const response = await axiosInstance.post("/group/create", {
    name,
    location,
  });
  return response.data;
};
export const getNearbyGroups = async ({ lng, lat }) => {
  const response = await axiosInstance.get("/group/nearby", {
    params: {
      lng,
      lat,
    },
  });
  return response.data;
};
