import { Permission } from "@/components/Dashboard/Permissions";
import axios from "@/utils/axios";

export const fetchPermissions = async () => {
  const result = await axios.get("/permissions");
  return result;
};

export const editPermission = async (id: string, updated: Permission) => {
  const result = await axios.put(`/permissions/${id}`, updated);
  return result;
};

export const addNewPermission = async (newPermission: Permission) => {
  const result = await axios.post("/permissions", { ...newPermission });
  return result;
};

export const deletePermission = async (id: string) => {
  const result = await axios.delete(`/permissions/${id}`);
  return result;
};
