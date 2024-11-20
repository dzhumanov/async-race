import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from 'axiosApi';
import { CarMutation } from 'types';

const fetchModalCar = createAsyncThunk<CarMutation, string>(
  'garage/fetchOne',
  async (id) => {
    const response = await axiosApi.get<CarMutation>(`/garage/${id}`);
    return response.data;
  }
);

export default fetchModalCar;
