import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedStop: null,
};

const transportSlice = createSlice({
  name: "transport",
  initialState,
  reducers: {
    setSelectedStop: (state, action) => {
      state.selectedStop = action.payload;
    },
  },
});

export const { setSelectedStop } = transportSlice.actions;
export default transportSlice.reducer;
