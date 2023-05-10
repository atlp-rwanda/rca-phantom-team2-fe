import { User } from "@/components/Dashboard/Users";
import { NewRole } from "./../components/Dashboard/Roles";
import axios from "@/utils/axios";

export const fetchRoles = async () => {
  const result = await axios.get("/roles");
  return result;
};

export const editRole = async (id: string, updated: NewRole) => {
  const result = await axios.put(`/roles/${id}`, updated);
  return result;
};

export const addNewRole = async (newRole: NewRole) => {
  const result = await axios.post("/roles", { ...newRole });
  return result;
};

export const deleteRole = async (id: string) => {
  const result = await axios.delete(`/roles/${id}`);
  return result;
};

export const grantPermission = async (roleId: string, permissionId: string) => {
  const result = await axios.post("/roles/grant-permission", {
    roleId: roleId as string,
    permissionId,
  });
  return result;
};

export const fetchUsers = async () => {
  const result = await axios.get("/users");
  return result;
};

export const newUser = async (newUser: User) => {
  const result = await axios.post("/users/register", { ...newUser });
  return result;
};
