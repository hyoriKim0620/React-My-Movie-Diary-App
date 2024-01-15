import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../hooks/honeyMovie";

export interface ReviewProps {
  reviewId: string;
  title?: string | "";
  name?: string | "";
  // originalTitle?: string;
  release_date?: string | ""; // 개봉일시
  watch_date?: string | ""; // 시청일시
  backdrop_path?: string | "";
  poster_path?: string | "";
  review?: string | "";
  score: number | 0;
}

interface UserState {
  currentUser: User;
  myReview: ReviewProps[];
}

const initialState: UserState = {
  currentUser: {
    id: "1",
    name: "test",
    hashedPassword: "1111",
    email: "test@naver.com",
    image: "",
    honeyMovieIds: "[]",
    myReview: "[]",
    runtime: 0,
  },
  myReview: [],
};

const userSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    setMyReview: (state, action) => {
      state.myReview = action.payload;
    },
  },
});

export const { setCurrentUser, setMyReview } = userSlice.actions;
export default userSlice.reducer;
