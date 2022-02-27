import { createSlice } from "@reduxjs/toolkit";

export interface CounterState {
  colorScheme: "light" | "dark";
}

const initialState: CounterState = {
  colorScheme: "light",
};

export const generalSlice = createSlice({
  name: "general",
  initialState,
  reducers: {
    toggleColorSheme: (state) => {
      state.colorScheme = state.colorScheme === "light" ? "dark" : "light";
    },
  },
});

// Action creators are generated for each case reducer function
export const { toggleColorSheme } = generalSlice.actions;

export const generalReducer = generalSlice.reducer;
