import { createAsyncThunk } from '@reduxjs/toolkit';
import { Car } from '../types.ts';
import axiosApi from '../axiosApi.ts';

// eslint-disable-next-line import/prefer-default-export
export const fetchCars = createAsyncThunk<Car[]>(
  'photos/fetchAll',
  async () => {
    const response = await axiosApi.get<Car[]>('/garage');
    return response.data;
  }
);
