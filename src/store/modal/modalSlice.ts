import { createSlice } from "@reduxjs/toolkit";

export interface Movie {
  reviewId?: string;
  title?: string;
  name?: string;
  original_title: string;
  backdrop_path: string;
  poster_path?: string;
  id: number;
  overview: string;
  popularity?: number;
  release_date?: string;
  watch_date?: string;
  first_air_date?: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  runtime?: number;
  score?: number;
  review?: string;
}

interface ModalState {
  detailModal: boolean;
  selectMovie: Movie;
  honeyReviewModal: boolean;
  reviewModalType: string;
  showSearchMovieModal: boolean;
}

const initialState: ModalState = {
  detailModal: false,
  selectMovie: {
    backdrop_path: "",
    poster_path: "",
    id: 0,
    title: "",
    original_title: "",
    name: "",
    overview: "",
    popularity: 0,
    release_date: "",
    video: false,
    vote_average: 0,
    vote_count: 0,
  },
  honeyReviewModal: false,
  reviewModalType: "add",
  showSearchMovieModal: false,
};

const modalSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    toggleDetailModal: (state, action) => {
      state.detailModal = action.payload;
    },
    setSelectMovie: (state, action) => {
      state.selectMovie = action.payload;
    },
    toggleHoneyReviewModal: (state, action) => {
      state.honeyReviewModal = action.payload;
    },
    setReviewModalType: (state, action) => {
      state.reviewModalType = action.payload;
    },
    toggleShowSearchMovieModal: (state, action) => {
      state.showSearchMovieModal = action.payload;
    },
  },
});

export const {
  toggleDetailModal,
  setSelectMovie,
  toggleHoneyReviewModal,
  setReviewModalType,
  toggleShowSearchMovieModal,
} = modalSlice.actions;
export default modalSlice.reducer;
