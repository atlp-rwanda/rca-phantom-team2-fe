import { NewBus } from "./../components/Dashboard/Buses";
import axios from "@/utils/axios";

export const fetchBuses = async () => {
  const result = await axios.get("/buses");
  return result;
};

export const editBus = async (id: string, updated: NewBus) => {
  const result = await axios.put(`/buses/${id}`, updated);
  return result;
};

export const addNewBus = async (newBus: NewBus) => {
  const result = await axios.post("/buses", { ...newBus });
  return result;
};

export const deleteBus = async (id: string) => {
  const result = await axios.delete(`/buses/${id}`);
  return result;
};
