import { createSlice } from "@reduxjs/toolkit";

interface ModalProps {
  userModalState: boolean;
}

const initialState = {
  userModalState: false,
} as ModalProps;

const userProfileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    toggleUserModal: (state) => {
      state.userModalState = !state.userModalState;
    },
    closeModal: (state) => {
      state.userModalState = false;
    },
  },
});

export const { toggleUserModal, closeModal } = userProfileSlice.actions;
export default userProfileSlice.reducer;
