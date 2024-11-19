import { fetchOneCar } from '@garage/garageThunks';
import { createSlice } from '@reduxjs/toolkit';
import { CarMutation } from 'types';

export interface ModalState {
  isOpen: boolean;
  winner: {
    id: string;
    wins: number;
    time: number;
  };
  winnerInfo: CarMutation | null;
}

const initialState: ModalState = {
  isOpen: false,
  winner: { id: '', wins: 0, time: 0 },
  winnerInfo: null,
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state) => {
      state.isOpen = true;
    },
    closeModal: (state) => {
      state.isOpen = false;
    },
    setWinner: (state, action) => {
      state.winner = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchOneCar.fulfilled, (state, { payload: car }) => {
      state.winnerInfo = car;
    });
  },
  selectors: {
    selectIsOpen: (state) => state.isOpen,
    selectWinnerInfo: (state) => state.winnerInfo,
    selectWinner: (state) => state.winner,
  },
});

export const modalReducer = modalSlice.reducer;
export const { openModal, closeModal, setWinner } = modalSlice.actions;
export const { selectIsOpen, selectWinnerInfo, selectWinner } =
  modalSlice.selectors;
