import { createSlice } from "@reduxjs/toolkit";

interface SideBarState {
  isSmall: boolean;
}

const initialState: SideBarState = {
  isSmall: true,
};

const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    toggleMovieOrdering: (state, action) => {
      state.isSmall = action.payload;
    },
  },
});

export const { toggleMovieOrdering } = movieSlice.actions;
export default movieSlice.reducer;
