import { configureStore } from '@reduxjs/toolkit'
import { counterReducer } from './reducers/counter';
import { busesReducer } from './reducers/buses';
import { busesRoutesReducer } from './reducers/busRoutes';
import { locationsReducer } from './reducers/location';

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        bus: busesReducer,
        route: busesRoutesReducer,
        location: locationsReducer
    }
});

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch