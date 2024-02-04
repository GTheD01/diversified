import { createSlice } from "@reduxjs/toolkit";

interface ModalProps {
  modalState: boolean;
}

const initialState = {
  modalState: false,
} as ModalProps;

const modalSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    modalOpen: (state) => {
      state.modalState = true;
    },
    modalClose: (state) => {
      state.modalState = false;
    },
  },
});

export const { modalOpen, modalClose } = modalSlice.actions;
export default modalSlice.reducer;
