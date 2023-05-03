import { Bus } from "@/components/Dashboard/Buses";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface BusesState {
  buses: Bus[];
  loading: boolean;
}

const initialState: BusesState = {
  buses: [],
  loading: true,
};

const busesSlice = createSlice({
  name: "buses",
  initialState: initialState,
  reducers: {
    setBuses: (state, action: PayloadAction<{ buses: Bus[] }>) => {
      state.buses = [...action.payload.buses];
      state.loading = false;
    },
    updateBus: (state, action: PayloadAction<{ updated: Bus }>) => {
      const index = state.buses.findIndex(
        (x) => x.id === action.payload.updated.id
      );
      state.buses[index] = { ...action.payload.updated };
    },
    removeBus: (state, action: PayloadAction<{ id: string }>) => {
      const index = state.buses.findIndex((x) => x.id === action.payload.id);
      state.buses.splice(index, 1);
      state.loading = false;
    },
    addBus: (state, action: PayloadAction<{ bus: Bus }>) => {
      state.buses.push(action.payload.bus);
    },
    setLoading: (state) => {
      state.loading = true;
    },
  },
});

export const { setBuses, updateBus, addBus, removeBus, setLoading } =
  busesSlice.actions;
export const busesReducer = busesSlice.reducer;
