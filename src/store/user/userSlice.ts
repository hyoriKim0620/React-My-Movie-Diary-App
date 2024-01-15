import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../hooks/honeyMovie";

interface UserState {
  currentUser: User;
  watchMovie: number;
  watchMovieRunTime: number;
}

const initialState: UserState = {
  currentUser: {
    id: "",
    name: "",
    hashedPassword: "",
    email: "",
    image: "",
    honeyMovieIds: "[]",
    myReview: "[]",
    runtime: 0,
  },
  watchMovie: 0,
  watchMovieRunTime: 0,
};

const userSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    setWatchMovie: (state, action) => {
      state.watchMovie = action.payload;
    },
    setWatchMovieRunTime: (state, action) => {
      state.watchMovieRunTime = action.payload;
    },
  },
});

export const { setCurrentUser, setWatchMovie, setWatchMovieRunTime } =
  userSlice.actions;
export default userSlice.reducer;
