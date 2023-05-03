import { NewBus } from "./../components/Dashboard/Buses";
import axios from "axios";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIyOWU1ZTcyYS0yNjgwLTNlZTMtNzBmMS0xNmQ3YThiNDFiMjIiLCJyb2xlSWQiOiI0OWE5Y2E0My0zZjkwLTQxN2YtOGNmZC03ZjFkZjAzMGE1ZTAiLCJpYXQiOjE2ODMwMzcyNjksImV4cCI6MTY4MzEyMzY2OX0.H6qkDGpTQUm2gXUIa9VTrYI3Pb3XEea4Wd5I7nBJ4Hs";

export const fetchBuses = async () => {
  const result = await axios.get(
    "https://rca-phantom-team2-bn.onrender.com/api/buses",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return result;
};

export const editBus = async (id: string, updated: NewBus) => {
  const result = await axios.put(
    `https://rca-phantom-team2-bn.onrender.com/api/buses/${id}`,
    updated,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return result;
};

export const addNewBus = async (newBus: NewBus) => {
  const result = await axios.post(
    "https://rca-phantom-team2-bn.onrender.com/api/buses",
    { ...newBus },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return result;
};

export const deleteBus = async (id: string) => {
  const result = await axios.delete(
    `https://rca-phantom-team2-bn.onrender.com/api/buses/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return result;
};
