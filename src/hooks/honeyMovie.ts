import axios from "axios";
import { useMemo } from "react";
// import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import axiosCustom from "../api/movie/axios";

export interface User {
  id: string;
  name: string;
  hashedPassword: string;
  email: string;
  image: string;
  honeyMovieIds: string; // '[]';
  myReview: string; // '[]';
  runtime?: number;
}

interface useHoneyMovieProps {
  movieId: string;
  currentUser?: User | null;
}

const useHoneyMovie = ({ movieId, currentUser }: useHoneyMovieProps) => {
  // const navigate = useNavigate();
  const hasHoneyMovie = useMemo(() => {
    const list = (currentUser?.honeyMovieIds as string) || "";
    return list.includes(movieId);
  }, [currentUser, movieId]);

  // const refresh = () => {
  //   navigate("/", { replace: true });
  // };

  const toggleHoneyHeart = async (e: React.MouseEvent<HTMLDivElement>) => {
    console.log("toggleHoneyHeart 실행!");
    e.stopPropagation();

    if (!currentUser) {
      toast.warn("먼저 로그인을 해주세요.");
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
    };

    try {
      if (hasHoneyMovie) {
        const movieData = { email: currentUser.email, movieId: movieId };
        await axios.delete(`/api/honeyMovies/${JSON.stringify(movieData)}`);
      } else {
        const email = currentUser.email;

        await axios
          .post(`/api/honeyMovies/${email}`, {
            data: movie,
          })
          .then((response) => {
            console.log(response.data);
          })
          .catch((error) => {
            console.error(error);
          });
      }
      // refresh();
      toast.success("성공했습니다.");
    } catch (error) {
      toast.error("실패했습니다.");
    }
  };

  return {
    hasHoneyMovie,
    toggleHoneyHeart,
  };
};

export default useHoneyMovie;
