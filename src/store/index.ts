import { counterReducer } from './reducers/counter';
import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import authReducer from './reducers/authSlice'
export const store = configureStore({
    reducer: {
        counter: counterReducer,
        auth: authReducer
    }
});

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;
