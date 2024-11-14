import { createAsyncThunk } from '@reduxjs/toolkit';
import { Winner } from '../../types.ts';
import axiosApi from '../../axiosApi.ts';

export const fetchWinners = createAsyncThunk<Winner[]>(
  'winners/fetchAll',
  async () => {
    const response = await axiosApi.get<Winner[]>('/winners');
    return response.data;
  }
);

export const createWinner = createAsyncThunk<void, Winner>(
  'winners/create',
  async (winnerMutation) => {
    try {
      const response = await axiosApi.post('/winners', winnerMutation);
      return response.data;
    } catch (e) {
      return console.error({ message: 'error!', error: e });
    }
  }
);

export const updateWinner = createAsyncThunk<void, Winner>(
  'winners/update',
  async (winnerMutation) => {
    try {
      const response = await axiosApi.put(
        `/winners/${winnerMutation.id}`,
        winnerMutation
      );
      return response.data;
    } catch (e) {
      return console.error({ message: 'error!', error: e });
    }
  }
);
