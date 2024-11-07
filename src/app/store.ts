import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { garageReducer } from './garageSlice.ts';

const rootReducer = combineReducers({
  garage: garageReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
