import { configureStore } from "@reduxjs/toolkit";
import { counterReducer } from "./reducers/counter";
import { busesReducer } from "./reducers/buses";
import { rolesReducer } from "./reducers/roles";
import { permissionsReducer } from "./reducers/permissions";
import { usersReducer } from "./reducers/usersSlice";
import { busesRoutesReducer } from "./reducers/busRoutes";
import { locationsReducer } from "./reducers/location";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    bus: busesReducer,
    role: rolesReducer,
    permission: permissionsReducer,
    user: usersReducer,
    route: busesRoutesReducer,
    location: locationsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
