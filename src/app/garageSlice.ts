import { createSlice } from '@reduxjs/toolkit';
import { Car } from '../types.ts';
import { createCar, fetchCars, switchEngine } from './garageThunks.ts';

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
  reducers: {
    turnOnEngine: (state, { payload: id }) => {
      const car = state.cars.find((c) => c.id === id);
      if (car) {
        car.status = true;
      }
    },
    turnOffEngine: (state, { payload: id }) => {
      const car = state.cars.find((c) => c.id === id);
      if (car) {
        car.status = false;
      }
    },
    resetCarPosition: (state, { payload: id }) => {
      const car = state.cars.find((c) => c.id === id);
      if (car) {
        car.status = false;
        car.velocity = 0;
      }
    },
  },
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
    builder.addCase(switchEngine.pending, (state) => {
      state.loadingStatus = true;
    });
    builder.addCase(switchEngine.fulfilled, (state, { payload: response }) => {
      state.loadingStatus = false;
      const car = state.cars.find((c) => c.id === response.id);
      if (car) {
        car.velocity = response.responseData.velocity;
      }
    });
    builder.addCase(switchEngine.rejected, (state) => {
      state.loadingStatus = false;
    });
  },
  selectors: {
    selectCars: (state) => state.cars,
    loadingStatus: (state) => state.loadingStatus,
  },
});

export const garageReducer = garageSlice.reducer;
export const { turnOnEngine, turnOffEngine, resetCarPosition } =
  garageSlice.actions;
export const { selectCars, loadingStatus } = garageSlice.selectors;
