import { MovieProps } from "../../pages/HomePage";
import {
  AdultBadge,
  MovieCardContainer,
  MovieCardItem,
  MovieImg,
} from "./movie.styles";
import OneColumnCard from "./oneColumnCard";
import TwoColumnCard from "./twoColumnCard";
import { User } from "../../hooks/honeyMovie";
import { TiPencil } from "react-icons/ti";
import HoneyHeartButton from "../HoneyHeartButton";
import { useAppDispatch } from "../../hooks/redux";
import {
  setSelectMovie,
  toggleDetailModal,
} from "../../store/modal/modalSlice";

interface MovieCardProps {
  movie: MovieProps;
  isSmall: boolean;
  currentUser: User;
}

export interface ColumnCardProps {
  movie_title?: string;
  vote_average: number;
  vote_count: number;
  release_date: string;
}

const MovieCard = ({ movie, isSmall, currentUser }: MovieCardProps) => {
  const dispatch = useAppDispatch();
  const movieTitle = movie.name || movie.title;
  const movieImg = movie.backdrop_path || movie.poster_path;

  const handleClick = async () => {
    dispatch(setSelectMovie(movie));
    dispatch(toggleDetailModal(true));
  };

  return (
    <MovieCardContainer onClick={() => handleClick()}>
      <MovieCardItem>
        <div
          className={`${isSmall ? "h-[44%]" : "h-[40%]"} px-[10px] py-[5px]`}
        >
          <div className="header">
            {movie.adult ? <AdultBadge>19</AdultBadge> : <span></span>}
            <div>
              <TiPencil size={20} />
              <HoneyHeartButton movieId={movie.id} currentUser={currentUser} />
            </div>
          </div>
          {isSmall ? (
            <TwoColumnCard
              movie_title={movieTitle}
              vote_average={movie.vote_average}
              vote_count={movie.vote_count}
              release_date={movie.release_date}
            />
          ) : (
            <OneColumnCard
              movie_title={movieTitle}
              vote_average={movie.vote_average}
              vote_count={movie.vote_count}
              release_date={movie.release_date}
            />
          )}
        </div>

        <MovieImg
          className={`${
            isSmall ? "oneRowTwoColumnImage" : "oneRowOneColumnImage"
          }`}
        >
          <img
            alt="movie-img"
            className="blur_image"
            src={`https://images.tmdb.org/t/p/w500/${movieImg}`}
          />
          <img
            alt="movie-img"
            className={`${
              movieImg !== movie.backdrop_path
                ? "main_image_w50"
                : "main_image_w100"
            } main_image`}
            src={`https://images.tmdb.org/t/p/w500/${movieImg}`}
          />
        </MovieImg>
      </MovieCardItem>
    </MovieCardContainer>
  );
};

export default MovieCard;
