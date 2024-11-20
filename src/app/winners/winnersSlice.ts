import { createSlice } from '@reduxjs/toolkit';
import { Winner } from '../../types.ts';
import { fetchDisplayedWinners, fetchWinners } from './winnersThunks.ts';

export interface WinnersState {
  winners: Winner[];
  displayedWinners: Winner[];
  currentPage: number;
  loadingStatus: boolean;
}

export const initialState: WinnersState = {
  winners: [],
  displayedWinners: [],
  currentPage: 1,
  loadingStatus: false,
};

export const winnersSlice = createSlice({
  name: 'winners',
  initialState,
  reducers: {
    setWinnersPage: (state, { payload: page }) => {
      state.currentPage = page;
    },
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
    builder.addCase(fetchDisplayedWinners.pending, (state) => {
      state.loadingStatus = true;
    });
    builder.addCase(
      fetchDisplayedWinners.fulfilled,
      (state, { payload: cars }) => {
        state.loadingStatus = false;
        state.displayedWinners = cars;
      }
    );
    builder.addCase(fetchDisplayedWinners.rejected, (state) => {
      state.loadingStatus = false;
    });
  },
  selectors: {
    selectWinners: (state) => state.winners,
    selectDisplayedWinners: (state) => state.displayedWinners,
    selectWinnersLoadingStatus: (state) => state.loadingStatus,
    selectWinnersPage: (state) => state.currentPage,
  },
});

export const winnersReducer = winnersSlice.reducer;
export const {
  selectWinners,
  selectDisplayedWinners,
  selectWinnersLoadingStatus,
  selectWinnersPage,
} = winnersSlice.selectors;
export const { setWinnersPage } = winnersSlice.actions;
