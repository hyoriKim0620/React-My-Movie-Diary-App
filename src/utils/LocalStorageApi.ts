import { Movie } from "../store/modal/modalSlice";
import { ReviewProps } from "../store/user/userSlice";
import { EmptyObject } from "./EmptyObject";
import { v4 } from "uuid";

export const GetHoneyMovie = () => {
  const honeyMovies = localStorage.getItem("honeyMovie")
    ? JSON.parse(localStorage.getItem("honeyMovie") as string)
    : [];
  return honeyMovies;
};

export const PushHoneyMovie = (movieData: Movie) => {
  return new Promise((resolve, reject) => {
    try {
      // honeyMovie
      const honeyMovies = GetHoneyMovie();
      honeyMovies.push(movieData);

      localStorage.setItem("honeyMovie", JSON.stringify(honeyMovies));

      // runtime, movieCnt
      const runtime = movieData.runtime as number;
      SetMyMovieData("push", runtime);

      resolve(true);
    } catch (error) {
      reject(error);
    }
  });
};

export const DeleteHoneyMovie = (movieId: number, runtime: number) => {
  // honeyMovie
  let honeyMovies = GetHoneyMovie();
  honeyMovies = honeyMovies.filter((movie: Movie) => movie.id !== movieId);

  localStorage.setItem("honeyMovie", JSON.stringify(honeyMovies));

  // runtime, movieCnt
  SetMyMovieData("delete", runtime);
};

export const getMyMovieData = () => {
  const myMovieData = localStorage.getItem("myMovieData")
    ? JSON.parse(localStorage.getItem("myMovieData") as string)
    : {};

  return myMovieData;
};

const SetMyMovieData = (cmd: string, runtime: number) => {
  const myMovieData = getMyMovieData();

  if (cmd == "push") {
    let newObject = {};
    if (EmptyObject(myMovieData)) {
      newObject = {
        runtime: runtime,
        watchMovieCnt: 1,
      };
    } else {
      newObject = {
        runtime: myMovieData.runtime + runtime,
        watchMovieCnt: GetHoneyMovie().length,
      };
    }
    localStorage.setItem("myMovieData", JSON.stringify(newObject));
  } else if (cmd == "delete") {
    let newObject = {};

    if (EmptyObject(myMovieData)) {
      return; // 오류일 가능성이 높음
    } else {
      newObject = {
        runtime: myMovieData.runtime - runtime,
        watchMovieCnt: GetHoneyMovie().length,
      };
    }
    localStorage.setItem("myMovieData", JSON.stringify(newObject));
  }
};

export const GetMyReview = () => {
  const myReview = localStorage.getItem("myReview")
    ? JSON.parse(localStorage.getItem("myReview") as string)
    : [];
  return myReview;
};

export const PushMyReview = (review: ReviewProps) => {
  return new Promise((resolve, reject) => {
    try {
      // MyReview
      const MyReviews = GetMyReview();
      MyReviews.push({
        ...review,
        reviewId: v4(),
      });

      localStorage.setItem("myReview", JSON.stringify(MyReviews));
      resolve(true);
    } catch (error) {
      reject(error);
    }
  });
};

export const EditMyReview = (review: ReviewProps) => {
  return new Promise((resolve, reject) => {
    try {
      // MyReview
      let MyReviews = GetMyReview();

      const matchReview = MyReviews.find(
        (item: ReviewProps) => item.reviewId === review.reviewId
      );

      MyReviews = MyReviews.filter(
        (item: ReviewProps) => item.reviewId !== review.reviewId
      );
      MyReviews.push({
        ...review,
        reviewId: matchReview.reviewId,
      });

      localStorage.setItem("myReview", JSON.stringify(MyReviews));
      resolve(true);
    } catch (error) {
      reject(error);
    }
  });
};

export const DeleteMyReview = (reviewId: string) => {
  return new Promise((resolve, reject) => {
    try {
      let MyReviews = GetMyReview();
      MyReviews = MyReviews.filter((item: ReviewProps) => {
        return item.reviewId !== reviewId;
      });

      localStorage.setItem("myReview", JSON.stringify(MyReviews));
      resolve(true);
    } catch (error) {
      reject(error);
    }
  });
};
