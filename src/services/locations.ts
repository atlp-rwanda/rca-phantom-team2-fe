import { NewLocation } from "./../components/Dashboard/Locations";
import axios from "@/utils/axios";

export const fetchLocations = async () => {
  const result = await axios.get("/locations");
  return result;
};

export const editLocation = async (id: string, updated: NewLocation) => {
  const result = await axios.put(`/locations/${id}`, updated);
  return result;
};

export const addNewLocation = async (location: NewLocation) => {
  const result = await axios.post("/locations", { ...location });
  return result;
};

export const deleteLocation = async (id: string) => {
  const result = await axios.delete(`/locations/${id}`);
  return result;
};
