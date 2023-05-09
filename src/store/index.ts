import { configureStore } from '@reduxjs/toolkit'
import { counterReducer } from './reducers/counter';
import { busesReducer } from './reducers/buses';

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        bus: busesReducer
    }
});

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch