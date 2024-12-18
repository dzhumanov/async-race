import { createSlice } from '@reduxjs/toolkit';
import { Car, CarMutation } from '../../types.ts';
import {
  createCar,
  fetchCars,
  fetchSomeCars,
  switchEngine,
} from './garageThunks.ts';

export interface GarageState {
  cars: Car[];
  displayedCars: Car[];
  currentPage: number;
  updateCar: CarMutation | null;
  raceStatus: boolean;
  loadingStatus: boolean;
}

export const initialState: GarageState = {
  cars: [],
  displayedCars: [],
  currentPage: 1,
  updateCar: null,
  raceStatus: false,
  loadingStatus: false,
};

export const garageSlice = createSlice({
  name: 'garage',
  initialState,
  reducers: {
    setGaragePage: (state, { payload: page }) => {
      state.currentPage = page;
    },
    setPrevPage: (state) => {
      if (state.currentPage > 1) {
        state.currentPage -= 1;
      }
    },
    turnOnEngine: (state, { payload: id }) => {
      const car = state.displayedCars.find((c) => c.id === id);
      if (car) {
        car.status = true;
        car.engine = true;
      }
    },
    turnOffEngine: (state, { payload: id }) => {
      const car = state.displayedCars.find((c) => c.id === id);
      if (car) {
        car.status = false;
      }
    },
    resetCarPosition: (state, { payload: id }) => {
      const car = state.displayedCars.find((c) => c.id === id);
      if (car) {
        car.status = false;
        car.velocity = 0;
        car.engine = true;
      }
    },
    brokeEngine: (state, { payload: id }) => {
      const car = state.displayedCars.find((c) => c.id === id);
      if (car) {
        car.engine = false;
      }
    },
    updateCarState: (state, { payload: car }) => {
      state.updateCar = car;
    },
    clearUpdateCarState: (state) => {
      state.updateCar = null;
    },
    startRace: (state) => {
      state.raceStatus = true;
    },
    stopRace: (state) => {
      state.raceStatus = false;
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
    builder.addCase(fetchSomeCars.pending, (state) => {
      state.loadingStatus = true;
    });
    builder.addCase(fetchSomeCars.fulfilled, (state, { payload: cars }) => {
      state.loadingStatus = false;
      state.displayedCars = cars;
    });
    builder.addCase(fetchSomeCars.rejected, (state) => {
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
      const car = state.displayedCars.find((c) => c.id === response.id);
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
    selectDisplayedCars: (state) => state.displayedCars,
    selectGaragePage: (state) => state.currentPage,
    selectUpdateCar: (state) => state.updateCar,
    selectRaceStatus: (state) => state.raceStatus,
    selectLoadingStatus: (state) => state.loadingStatus,
  },
});

export const garageReducer = garageSlice.reducer;
export const {
  setGaragePage,
  setPrevPage,
  turnOnEngine,
  turnOffEngine,
  resetCarPosition,
  brokeEngine,
  updateCarState,
  clearUpdateCarState,
  startRace,
  stopRace,
} = garageSlice.actions;
export const {
  selectCars,
  selectDisplayedCars,
  selectGaragePage,
  selectUpdateCar,
  selectRaceStatus,
  selectLoadingStatus,
} = garageSlice.selectors;
