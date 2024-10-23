import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
  name: "gpt",
  initialState: {
    showGtpSearch: false,
  },
  reducers: {
    toggleGptSearchView: (state) => {
      state.showGtpSearch = !state.showGtpSearch;
    },
  },
});
export const { toggleGptSearchView } = gptSlice.actions;

export default gptSlice.reducer;
