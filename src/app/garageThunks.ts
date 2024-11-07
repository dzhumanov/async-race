import { createAsyncThunk } from '@reduxjs/toolkit';
import { Car, CarMutation } from '../types.ts';
import axiosApi from '../axiosApi.ts';

export const fetchCars = createAsyncThunk<Car[]>(
  'photos/fetchAll',
  async () => {
    const response = await axiosApi.get<Car[]>('/garage');
    return response.data;
  }
);

export const createCar = createAsyncThunk<void, CarMutation>(
  'photos/create',
  async (carMutation) => {
    try {
      await axiosApi.post('/garage', carMutation);
    } catch (e) {
      console.error({ message: 'error!', error: e });
    }
  }
);
