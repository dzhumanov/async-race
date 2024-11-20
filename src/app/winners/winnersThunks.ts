import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from 'app/store.ts';
import { Winner } from '../../types.ts';
import axiosApi from '../../axiosApi.ts';

export const fetchWinners = createAsyncThunk<Winner[]>(
  'winners/fetchAll',
  async () => {
    const response = await axiosApi.get<Winner[]>(`/winners`);
    return response.data;
  }
);

export const fetchDisplayedWinners = createAsyncThunk<
  Winner[],
  { page?: number; sort?: string; order?: string }
>('winners/fetchDisplayed', async ({ page, sort, order }) => {
  const params = new URLSearchParams();

  if (page !== undefined) params.append('_page', page.toString());
  params.append('_limit', '7');
  if (sort) params.append('_sort', sort);
  if (order) params.append('_order', order);

  const response = await axiosApi.get<Winner[]>(
    `/winners?${params.toString()}`
  );
  return response.data;
});

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

export const deleteWinner = createAsyncThunk<
  void,
  string,
  { state: RootState }
>('winners/delete', async (id, { getState }) => {
  const state = getState();

  const isWinnerExist = state.winners.winners.find(
    (winner) => winner.id === id
  );

  if (isWinnerExist) {
    const response = await axiosApi.delete(`/winners/${id}`);
    return response.data;
  }

  throw new Error('Winner not found');
});
