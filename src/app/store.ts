import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { garageReducer } from './garage/garageSlice.ts';
import { winnersReducer } from './winners/winnersSlice.ts';

const rootReducer = combineReducers({
  garage: garageReducer,
  winners: winnersReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
