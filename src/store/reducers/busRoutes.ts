import { BusRoute } from '@/components/Dashboard/BusRoutes';
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface RoutesState {
    routes: BusRoute[];
    loading: boolean;
}

const initialState: RoutesState = {
    routes: [],
    loading: true,
};

const routesSlice = createSlice({
    name: "busRoute",
    initialState: initialState,
    reducers: {
        setBusRoutes: (state, action: PayloadAction<{ routes: BusRoute[] }>) => {
            state.routes = [...action.payload.routes];
            state.loading = false;
            console.log("These are the routes")
            console.log(state.routes)
        },
        updateBusRoute: (state, action: PayloadAction<{ updated: BusRoute }>) => {
            const index = state.routes.findIndex(
                (x) => x.id === action.payload.updated.id
            );
            state.routes[index] = { ...action.payload.updated };
        },
        removeBusRoute: (state, action: PayloadAction<{ id: string }>) => {
            const index = state.routes.findIndex((x) => x.id === action.payload.id);
            state.routes.splice(index, 1);
            state.loading = false;
        },
        addBusRoute: (state, action: PayloadAction<{ route: BusRoute }>) => {
            state.routes.push(action.payload.route);
        },
        setLoading: (state) => {
            state.loading = true;
        },
    },
});

export const { setBusRoutes, updateBusRoute, addBusRoute, removeBusRoute, setLoading } =
    routesSlice.actions;
export const busesRoutesReducer = routesSlice.reducer;