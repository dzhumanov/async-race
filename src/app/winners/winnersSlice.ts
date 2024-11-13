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
  reducers: {
    // updateWinners: (state, { payload: id }) => {
    //   const carIndex = state.winners.findIndex((winner) => winner.id === id);
    //   if (carIndex !== -1) {
    //     state.winners[carIndex].wins += 1;
    //   } else {
    //     state.winners.push({ id, wins: 1 });
    //   }
    // },
  },
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
// export const { updateWinners } = winnersSlice.actions;
export const { selectWinners, selectWinnersLoadingStatus } =
  winnersSlice.selectors;
