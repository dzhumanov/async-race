import { createSlice } from '@reduxjs/toolkit';

export interface ModalState {
  isOpen: boolean;
  winner: {
    id: string;
    wins: number;
    time: number;
  };
}

const initialState: ModalState = {
  isOpen: false,
  winner: { id: '', wins: 0, time: 0 },
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
  selectors: {
    selectIsOpen: (state) => state.isOpen,
    selectWinner: (state) => state.winner,
  },
});

export const modalReducer = modalSlice.reducer;
export const { openModal, closeModal, setWinner } = modalSlice.actions;
export const { selectIsOpen, selectWinner } = modalSlice.selectors;
