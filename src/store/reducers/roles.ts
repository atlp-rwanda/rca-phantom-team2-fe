import { Role } from "@/components/Dashboard/Roles";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface RolesState {
  roles: Role[];
  loading: boolean;
}

const initialState: RolesState = {
  roles: [],
  loading: true,
};

const rolesSlice = createSlice({
  name: "roles",
  initialState: initialState,
  reducers: {
    setRoles: (state, action: PayloadAction<{ roles: Role[] }>) => {
      state.roles = [...action.payload.roles];
      state.loading = false;
    },
    updateRole: (state, action: PayloadAction<{ updated: Role }>) => {
      const index = state.roles.findIndex(
        (x) => x.id === action.payload.updated.id
      );
      state.roles[index] = { ...action.payload.updated };
    },
    removeRole: (state, action: PayloadAction<{ id: string }>) => {
      const index = state.roles.findIndex((x) => x.id === action.payload.id);
      state.roles.splice(index, 1);
      state.loading = false;
    },
    addRole: (state, action: PayloadAction<{ role: Role }>) => {
      state.roles.push(action.payload.role);
    },
    setLoading: (state) => {
      state.loading = true;
    },
  },
});

export const {
  setRoles,
  updateRole,
  removeRole,
  addRole,
  setLoading,
} = rolesSlice.actions;
export const rolesReducer = rolesSlice.reducer;
