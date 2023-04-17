import { createSlice } from "@reduxjs/toolkit";

export interface CounterState {
    count: number;
}

const initialState: CounterState = {
    count: 0,
};

const counterSlice = createSlice({
    name: 'counter',
    initialState: initialState,
    reducers: {
        increment: (state) => {
            state.count += 1;
        },
        decrement: (state) => {
            if(state.count > 0) state.count -= 1;
        }
    }
});

export const {increment, decrement} = counterSlice.actions
export const counterReducer = counterSlice.reducer