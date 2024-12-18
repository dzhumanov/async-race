/* eslint-disable no-magic-numbers */
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import {
  Car,
  CarMutation,
  EngineMutation,
  EngineResponseMutation,
} from '../../types.ts';
import axiosApi from '../../axiosApi.ts';
import {
  brokeEngine,
  clearUpdateCarState,
  turnOffEngine,
  turnOnEngine,
} from './garageSlice.ts';

export const fetchCars = createAsyncThunk<Car[]>(
  'garage/fetchAll',
  async () => {
    const response = await axiosApi.get<Car[]>(`/garage`);
    const mutatedResponse = response.data.map((car) => {
      return {
        ...car,
        velocity: 0,
        status: false,
        engine: true,
      };
    });
    return mutatedResponse;
  }
);

export const fetchOneCar = createAsyncThunk<CarMutation, string>(
  'garage/fetchOne',
  async (id) => {
    const response = await axiosApi.get<CarMutation>(`/garage/${id}`);
    return response.data;
  }
);

export const fetchSomeCars = createAsyncThunk<Car[], { page: number }>(
  'garage/fetchSome',
  async ({ page }) => {
    const response = await axiosApi.get<Car[]>(
      `/garage/?_page=${page}&_limit=7`
    );
    const mutatedResponse = response.data.map((car) => {
      return {
        ...car,
        velocity: 0,
        status: false,
        engine: true,
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

export const deleteCar = createAsyncThunk<void, string>(
  'garage/delete',
  async (id) => {
    try {
      const response = await axiosApi.delete(`/garage/${id}`);
      return response.data;
    } catch (e) {
      return console.error({ message: 'error!', error: e });
    }
  }
);

export const updateCar = createAsyncThunk<void, CarMutation>(
  'garage/update',
  async (carMutation, { dispatch }) => {
    try {
      const response = await axiosApi.put(
        `/garage/${carMutation.id}`,
        carMutation
      );
      dispatch(clearUpdateCarState());
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

export const driveCar = createAsyncThunk<
  { id: string; success: boolean },
  { id: string; signal?: AbortSignal }
>('garage/drive', async ({ id, signal }, { dispatch }) => {
  try {
    dispatch(turnOnEngine(id));
    const response = await axiosApi.patch(
      `/engine?id=${id}&status=drive`,
      {},
      { signal }
    );
    if (response.data.success) {
      return { id, success: true };
    }
    return { id, success: false };
  } catch (e) {
    if (axios.isCancel(e)) {
      console.log('Cancelled for car ', id);
    }
    if (e instanceof AxiosError && e.response?.status === 500) {
      dispatch(turnOffEngine(id));
      dispatch(brokeEngine(id));
    }
    console.error({ message: 'error!', error: e });
    return { id, success: false };
  }
});
