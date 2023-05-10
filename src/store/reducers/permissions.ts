import { Permission } from "@/components/Dashboard/Permissions";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface PermissionState {
  permissions: Permission[];
  loading: boolean;
}

const initialState: PermissionState = {
  permissions: [],
  loading: true,
};

const permissionSlice = createSlice({
  name: "permissions",
  initialState: initialState,
  reducers: {
    setPermissions: (
      state,
      action: PayloadAction<{ permissions: Permission[] }>
    ) => {
      state.permissions = [...action.payload.permissions];
      state.loading = false;
    },
    updatePermission: (
      state,
      action: PayloadAction<{ updated: Permission }>
    ) => {
      const index = state.permissions.findIndex(
        (x) => x.id === action.payload.updated.id
      );
      state.permissions[index] = { ...action.payload.updated };
    },
    removePermission: (state, action: PayloadAction<{ id: string }>) => {
      const index = state.permissions.findIndex(
        (x) => x.id === action.payload.id
      );
      state.permissions.splice(index, 1);
      state.loading = false;
    },
    addPermission: (
      state,
      action: PayloadAction<{ permission: Permission }>
    ) => {
      state.permissions.push(action.payload.permission);
    },
    setLoading: (state, action: PayloadAction<{ loading: boolean }>) => {
      state.loading = action.payload.loading;
    },
  },
});

export const {
  setPermissions,
  updatePermission,
  removePermission,
  addPermission,
  setLoading,
} = permissionSlice.actions;
export const permissionsReducer = permissionSlice.reducer;
