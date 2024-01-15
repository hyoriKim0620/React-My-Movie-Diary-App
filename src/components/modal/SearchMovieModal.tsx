import styled from "styled-components";
import { ModalButton, ModalContainer } from "./modal.styles";
import { useAppDispatch } from "../../hooks/redux";
import {
  Movie,
  toggleShowSearchMovieModal,
} from "../../store/modal/modalSlice";
import { useEffect, useState } from "react";
import axiosCustom from "../../api/movie/axios";
import { setWriteReviewMovie } from "../../store/movie/movieSlice";
import EmptyState from "../EmptyState";

interface SearchMovieModalProps {
  searchMovieTitle: string;
}

const SearchMovieModal = ({ searchMovieTitle }: SearchMovieModalProps) => {
  const dispatch = useAppDispatch();
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchSearchMovie();
  }, [searchMovieTitle]);

  const fetchSearchMovie = async () => {
    try {
      // 성인영화 포함
      const response = await axiosCustom.get(
        `/search/multi?include_adult=false&query=${searchMovieTitle}`
      );
      setMovies(response.data.results);
    } catch (error) {
      console.log("오류 : ", error);
    }
  };

  const handleClick = (movie: Movie) => {
    dispatch(setWriteReviewMovie(movie));
    dispatch(toggleShowSearchMovieModal(false));
  };

  const cancelSearchMovieModal = () => {
    dispatch(setWriteReviewMovie({}));
    dispatch(toggleShowSearchMovieModal(false));
  };

  return (
    <ModalContainer id="searchMovieModal">
      <Box>
        {movies.length > 0 ? (
          <ItemBox>
            {movies.map((movie: Movie) => (
              <Items key={movie.id} onClick={() => handleClick(movie)}>
                <div>{movie.title || movie.name}</div>
                <img
                  src={`https://images.tmdb.org/t/p/w500/${
                    movie.backdrop_path || movie.poster_path
                  }`}
                />
              </Items>
            ))}
          </ItemBox>
        ) : (
          <EmptyState
            title="일치하는 영화가 없습니다."
            sub_title="취소 후 다시 검색해주세요."
          />
        )}

        <ModalButton onClick={() => cancelSearchMovieModal()}>취소</ModalButton>
      </Box>
    </ModalContainer>
  );
};

export default SearchMovieModal;

const Box = styled.div`
  width: clamp(250px, 90%, 580px);
  background-color: #fff;
  border: 2px solid #ffcc70;
  color: black;
  border-radius: 10px;
`;

const ItemBox = styled.div`
  padding: 0.6rem;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-auto-rows: 150px;
  gap: 0.6rem;
  overflow-y: scroll;
  height: 90vh;

  // 스크롤
  &::-webkit-scrollbar-thumb {
    background: lightgray;
    border-radius: 7px;
    height: 10px;
  }
  &::-webkit-scrollbar-track {
    background-color: #fcfcfc;
  }
  @media screen and (min-width: 950px) {
    &:hover {
      &::-webkit-scrollbar {
        width: 7px;
      }
    }
    &::-webkit-scrollbar {
      width: 0;
      background-color: white;
    }
  }
`;

const Items = styled.div`
  border: 1px solid #8ecddd;
  border-radius: 5px;
  overflow: hidden;
  background: rgba(142, 205, 221, 0.4);

  div {
    font-size: 13px;
    width: 100%;
    padding: 5px;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
