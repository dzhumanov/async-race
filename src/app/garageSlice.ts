import { createSlice } from '@reduxjs/toolkit';
import { Car } from '../types.ts';
import { createCar, fetchCars } from './garageThunks.ts';

export interface GarageState {
  cars: Car[];
  loadingStatus: boolean;
}

export const initialState: GarageState = {
  cars: [],
  loadingStatus: false,
};

export const garageSlice = createSlice({
  name: 'garage',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCars.pending, (state) => {
      state.loadingStatus = true;
    });
    builder.addCase(fetchCars.fulfilled, (state, { payload: cars }) => {
      state.loadingStatus = false;
      state.cars = cars;
    });
    builder.addCase(fetchCars.rejected, (state) => {
      state.loadingStatus = false;
    });
    builder.addCase(createCar.pending, (state) => {
      state.loadingStatus = true;
    });
    builder.addCase(createCar.fulfilled, (state) => {
      state.loadingStatus = false;
    });
    builder.addCase(createCar.rejected, (state) => {
      state.loadingStatus = false;
    });
  },
  selectors: {
    selectCars: (state) => state.cars,
    loadingStatus: (state) => state.loadingStatus,
  },
});

export const garageReducer = garageSlice.reducer;
export const { selectCars, loadingStatus } = garageSlice.selectors;
