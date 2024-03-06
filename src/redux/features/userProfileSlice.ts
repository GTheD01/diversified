import { createSlice } from "@reduxjs/toolkit";

export type modeTheme = "dark" | "light";
const theme = localStorage.getItem("modeTheme") || "light";

interface ModalProps {
  userModalState: boolean;
  modeTheme: modeTheme;
}

const initialState = {
  userModalState: false,
  modeTheme: theme,
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
    darkMode: (state) => {
      state.modeTheme = "dark";
      localStorage.setItem("modeTheme", "dark");
    },
    lightMode: (state) => {
      state.modeTheme = "light";
      localStorage.setItem("modeTheme", "light");
    },
  },
});

export const { toggleUserModal, closeModal, darkMode, lightMode } =
  userProfileSlice.actions;
export default userProfileSlice.reducer;
