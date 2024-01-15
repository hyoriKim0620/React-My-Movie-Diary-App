import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./modal/modalSlice";
import movieReducer from "./movie/movieSlice";
import cinemaReducer from "./cinema/cinemaSlice";
// import tagsReducer from "./tags/tagsSlice";
import sideBarReducer from "./sideBar/sideBarSlice";
import userReducer from "./user/userSlice";

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    movie: movieReducer,
    cinema: cinemaReducer,
    // tags: tagsReducer,
    sideBar: sideBarReducer,
    user: userReducer,
  },
  middleware: (getDefalueMiddleware) =>
    getDefalueMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
