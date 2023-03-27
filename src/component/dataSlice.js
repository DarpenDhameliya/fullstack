import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
};

export const Dataslice = createSlice({
  name: "Dataslice",
  initialState,

  reducers: {
    addnumbers: (state) => {
      state.value += 1 ;
    },
    removenumbers: (state) => {
      state.value -= 1 ;
    }
  },
});

export const { addnumbers ,removenumbers} = Dataslice.actions;

export const datastate = (state) => state.data;

export default Dataslice.reducer;