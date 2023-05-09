import { NewBusRoute } from "./../components/Dashboard/BusRoutes";
import axios from "@/utils/axios";

export const fetchBusesRoutes = async () => {
  const result = await axios.get("/routes");
  return result;
};

export const editBusRoutes = async (id: string, updated: NewBusRoute) => {
  const result = await axios.put(`/routes/${id}`, updated);
  return result;
};

export const addNewBusRoutes = async (newBusRoutes: NewBusRoute) => {
  const result = await axios.post("/routes", { ...newBusRoutes });
  return result;
};

export const deleteBusRoutes = async (id: string) => {
  const result = await axios.delete(`/routes/${id}`);
  return result;
};
