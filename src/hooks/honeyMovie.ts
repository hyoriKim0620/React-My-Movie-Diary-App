// import axios from "axios";
import axiosCustom from "../api/movie/axios";
import { useMemo } from "react";
import {
  DeleteHoneyMovie,
  GetHoneyMovie,
  PushHoneyMovie,
} from "../utils/LocalStorageApi";
import { Movie } from "../store/modal/modalSlice";
import { useAppDispatch } from "./redux";
import { setHoneyMovie } from "../store/movie/movieSlice";

export interface User {
  id: string;
  name: string;
  hashedPassword: string;
  email: string;
  image: string;
  honeyMovieIds: string;
  myReview: string;
  runtime?: number;
}

interface useHoneyMovieProps {
  movieId: number;
  currentUser?: User | null;
}

const useHoneyMovie = ({ movieId, currentUser }: useHoneyMovieProps) => {
  const dispatch = useAppDispatch();

  const hasHoneyMovie = useMemo(() => {
    const list = JSON.stringify(GetHoneyMovie());
    return list.includes(String(movieId));
  }, [currentUser, movieId]);

  const toggleHoneyHeart = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    if (!currentUser) {
      return;
    }

    const response = await axiosCustom.get(`/movie/${movieId}`);
    const res = response.data;
    const movie = {
      title: res.title,
      original_title: res.original_title,
      backdrop_path: res.backdrop_path,
      id: res.id,
      overview: res.overview,
      release_date: res.release_date,
      vote_average: res.vote_average,
      vote_count: res.vote_count,
      runtime: res.runtime,
    } as Movie;

    try {
      if (hasHoneyMovie) {
        const runtime = movie.runtime as number;
        await DeleteHoneyMovie(movieId, runtime);
      } else {
        await PushHoneyMovie(movie);
      }

      dispatch(setHoneyMovie(GetHoneyMovie()));
    } catch (error) {
      console.log("error : ", error);
    }
  };

  return {
    hasHoneyMovie,
    toggleHoneyHeart,
  };
};

export default useHoneyMovie;
