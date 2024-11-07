import { createAsyncThunk } from '@reduxjs/toolkit';
import { Car, CarMutation, EngineMutation, EngineResponse } from '../types.ts';
import axiosApi from '../axiosApi.ts';

export const fetchCars = createAsyncThunk<Car[]>(
  'garage/fetchAll',
  async () => {
    const response = await axiosApi.get<Car[]>('/garage');
    return response.data;
  }
);

export const createCar = createAsyncThunk<void, CarMutation>(
  'garage/create',
  async (carMutation) => {
    try {
      const response = await axiosApi.post('/garage', carMutation);
      return response.data;
    } catch (e) {
      return console.error({ message: 'error!', error: e });
    }
  }
);

export const switchEngine = createAsyncThunk<EngineResponse, EngineMutation>(
  'garage/engine',
  async (engineMutation) => {
    try {
      const response = await axiosApi.patch(
        `/engine?id=${engineMutation.id}&status=${engineMutation.status}`
      );
      return response.data;
    } catch (e) {
      return console.error({ message: 'error!', error: e });
    }
  }
);

export const driveCar = createAsyncThunk<void, string>(
  'garage/drive',
  async (id) => {
    try {
      const response = await axiosApi.patch(`/engine?id=${id}&status=drive`);
      return response.data;
    } catch (e) {
      return console.error({ message: 'error!', error: e });
    }
  }
);
