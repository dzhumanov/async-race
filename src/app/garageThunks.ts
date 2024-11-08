import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  Car,
  CarMutation,
  EngineMutation,
  EngineResponseMutation,
} from '../types.ts';
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

export const switchEngine = createAsyncThunk<
  EngineResponseMutation,
  EngineMutation,
  { rejectValue: { message: string } }
>('garage/engine', async (engineMutation, { rejectWithValue }) => {
  try {
    const response = await axiosApi.patch(
      `/engine?id=${engineMutation.id}&status=${engineMutation.status}`
    );
    return {
      responseData: response.data,
      id: engineMutation.id,
    };
  } catch (e) {
    return rejectWithValue({ message: 'error!' });
  }
});

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
