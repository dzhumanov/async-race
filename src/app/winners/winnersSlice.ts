import { createSlice } from '@reduxjs/toolkit';
import { Winner } from '../../types.ts';
import { fetchWinners } from './winnersThunks.ts';

export interface WinnersState {
  winners: Winner[];
  loadingStatus: boolean;
}

export const initialState: WinnersState = {
  winners: [],
  loadingStatus: false,
};

export const winnersSlice = createSlice({
  name: 'winners',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchWinners.pending, (state) => {
      state.loadingStatus = true;
    });
    builder.addCase(fetchWinners.fulfilled, (state, { payload: cars }) => {
      state.loadingStatus = false;
      state.winners = cars;
    });
    builder.addCase(fetchWinners.rejected, (state) => {
      state.loadingStatus = false;
    });
  },
  selectors: {
    selectWinners: (state) => state.winners,

    selectWinnersLoadingStatus: (state) => state.loadingStatus,
  },
});

export const winnersReducer = winnersSlice.reducer;
export const { selectWinners, selectWinnersLoadingStatus } =
  winnersSlice.selectors;
