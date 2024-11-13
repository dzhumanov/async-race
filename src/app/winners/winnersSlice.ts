import { createSlice } from '@reduxjs/toolkit';
import { Car } from '../../types.ts';

export interface WinnersState {
  winners: Car[];
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
  selectors: {
    selectWinners: (state) => state.winners,
    selectWinnersLoadingStatus: (state) => state.loadingStatus,
  },
});

export const winnersReducer = winnersSlice.reducer;
export const { selectWinners, selectWinnersLoadingStatus } =
  winnersSlice.selectors;
