import { Location } from "@/components/Dashboard/Locations";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface LocationsState {
    locations: Location[];
    loading: boolean;
}

const initialState: LocationsState = {
    locations: [],
    loading: true,
};

const locationsSlice = createSlice({
    name: "locations",
    initialState: initialState,
    reducers: {
        setLocations: (state, action: PayloadAction<{ locations: Location[] }>) => {
            state.locations = [...action.payload.locations];
            state.loading = false;
        },
        updateLocation: (state, action: PayloadAction<{ updated: Location }>) => {
            const index = state.locations.findIndex(
                (x) => x.id === action.payload.updated.id
            );
            state.locations[index] = { ...action.payload.updated };
        },
        removeLocation: (state, action: PayloadAction<{ id: string }>) => {
            const index = state.locations.findIndex((x) => x.id === action.payload.id);
            state.locations.splice(index, 1);
            state.loading = false;
        },
        addLocation: (state, action: PayloadAction<{ location: Location }>) => {
            state.locations.push(action.payload.location);
        },
        setLoading: (state) => {
            state.loading = true;
        },
    },
});

export const { setLocations, updateLocation, addLocation, removeLocation, setLoading } =
    locationsSlice.actions;
export const locationsReducer = locationsSlice.reducer;
