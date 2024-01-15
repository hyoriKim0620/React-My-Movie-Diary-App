import { createSlice } from "@reduxjs/toolkit";

interface searchCinemaProps {
  si: string;
  gu: string;
  brand: string;
  cinema_name: string;
  latlng: {
    lat: number;
    lng: number;
  };
}

interface CinemaState {
  searchCinema: searchCinemaProps[];
}

const initialState: CinemaState = {
  searchCinema: [],
};

const cinemaSlice = createSlice({
  name: "cinema",
  initialState,
  reducers: {
    setSearchCinema: (state, action) => {
      state.searchCinema = action.payload;
    },
  },
});

export const { setSearchCinema } = cinemaSlice.actions;
export default cinemaSlice.reducer;
