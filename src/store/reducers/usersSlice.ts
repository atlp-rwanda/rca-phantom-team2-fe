import { User } from "@/components/Dashboard/Users";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface UsersState {
  users: User[];
  loading: boolean;
}

const initialState: UsersState = {
  users: [],
  loading: true,
};

const usersSlice = createSlice({
  name: "users",
  initialState: initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<{ users: User[] }>) => {
      state.users = [...action.payload.users];
      state.loading = false;
    },

    addUser: (state, action: PayloadAction<{ user: User }>) => {
      state.users.push(action.payload.user);
    },
    setLoading: (state, action: PayloadAction<{ loading: boolean }>) => {
      state.loading = action.payload.loading;
    },
  },
});

export const { setUsers, addUser, setLoading } = usersSlice.actions;
export const usersReducer = usersSlice.reducer;
