import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { garageReducer } from './garage/garageSlice.ts';
import { winnersReducer } from './winners/winnersSlice.ts';
import { modalReducer } from './modal/modalSlice.ts';

const rootReducer = combineReducers({
  garage: garageReducer,
  winners: winnersReducer,
  modal: modalReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
