import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import {
  Car,
  CarMutation,
  EngineMutation,
  EngineResponseMutation,
} from '../types.ts';
import axiosApi from '../axiosApi.ts';
import { turnOffEngine, turnOnEngine } from './garageSlice.ts';

export const fetchCars = createAsyncThunk<Car[]>(
  'garage/fetchAll',
  async () => {
    const response = await axiosApi.get<Car[]>('/garage');
    const mutatedResponse = response.data.map((car) => {
      return {
        ...car,
        velocity: 0,
        status: false,
      };
    });
    return mutatedResponse;
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
  async (id, { dispatch, signal }) => {
    try {
      dispatch(turnOnEngine(id));
      const response = await axiosApi.patch(
        `/engine?id=${id}&status=drive`,
        {},
        { signal }
      );
      return response.data;
    } catch (e) {
      if (axios.isCancel(e)) {
        console.log('Cancelled');
      }
      if (e instanceof AxiosError && e.response?.status === 500) {
        dispatch(turnOffEngine(id));
      }
      return console.error({ message: 'error!', error: e });
    }
  }
);
