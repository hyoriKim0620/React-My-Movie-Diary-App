import { createSlice } from "@reduxjs/toolkit";

interface SideBarState {
  isSmall: boolean;
  honeyMovie: object;
  writeReviewMovie: object;
}

const initialState: SideBarState = {
  isSmall: true,
  honeyMovie: [],
  writeReviewMovie: {},
};

const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    toggleMovieOrdering: (state, action) => {
      state.isSmall = action.payload;
    },
    setHoneyMovie: (state, action) => {
      state.honeyMovie = action.payload;
    },
    setWriteReviewMovie: (state, action) => {
      state.writeReviewMovie = action.payload;
    },
  },
});

export const { toggleMovieOrdering, setHoneyMovie, setWriteReviewMovie } =
  movieSlice.actions;
export default movieSlice.reducer;
