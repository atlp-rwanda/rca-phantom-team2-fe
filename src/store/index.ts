import { configureStore } from "@reduxjs/toolkit";
import { counterReducer } from "./reducers/counter";
import { busesReducer } from "./reducers/buses";
import { rolesReducer } from "./reducers/roles";
import { permissionsReducer } from "./reducers/permissions";
import { usersReducer } from "./reducers/usersSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    bus: busesReducer,
    role: rolesReducer,
    permission: permissionsReducer,
    user: usersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
