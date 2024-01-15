import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import requests from "../../api/movie/request";
import axiosCustom from "../../api/movie/axios";
import axios from "axios";
import { IoSearch } from "react-icons/io5";
import {
  Container,
  Header,
  Input,
  MovieBox,
} from "../HomePage/homePage.styles";
import MovieCard from "./../../components/movie/movieCard";
import ToggleButtons from "../../components/ToggleButtons";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { useNavigate } from "react-router";
import { setCurrentUser } from "../../store/user/userSlice";

export interface MovieProps {
  adult: boolean;
  backdrop_path: string;
  genre_ids: object[];
  id: number;
  media_type: string;
  original_language: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  name?: string;
  title?: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

const HomePage = () => {
  const dispatch = useAppDispatch();
  const inputRef = useRef<HTMLInputElement>(null);
  const { isSmall } = useAppSelector((state) => state.movie);
  const storedMovies = localStorage.getItem("movies");
  const initialMovies: MovieProps[] = storedMovies
    ? JSON.parse(storedMovies)
    : [];
  const [movies, setMovies] = useState(initialMovies);
  const [showSearchBox, setShowSearchBox] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const { currentUser } = useAppSelector((state) => state.user);
  const navigate = useNavigate();

  const fetchMovieData = useCallback(async () => {
    if (initialMovies.length > 0) {
      return;
    } else {
      const fetchUrl = requests.fetchTopRated;
      const response = await axiosCustom.get(fetchUrl);

      await setMovies(response.data.results);
      localStorage.setItem("movies", JSON.stringify(response.data.results));
    }

    console.log("movies: ", movies);
  }, []);

  const fetchSearchMovie = async () => {
    try {
      // 성인영화 포함
      const response = await axiosCustom.get(
        `/search/multi?include_adult=false&query=${searchValue}`
      );
      setMovies(response.data.results);
    } catch (error) {
      console.log("오류 : ", error);
    }
  };

  const searchMovies = () => {
    setSearchValue("");
    fetchSearchMovie();
  };

  useEffect(() => {
    fetchMovieData();
  }, [fetchMovieData]);

  useEffect(() => {
    const testUserEmail = "test@naver.com";

    axios
      .get(`/api/userInfo/${testUserEmail}`)
      .then((res) => {
        const data = res.data.data[0];
        dispatch(setCurrentUser(data));
      })
      .catch();
  }, []);

  const handleClick = () => {
    if (showSearchBox) return;
    setShowSearchBox(true);
  };

  const handleEnterKeyPress = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      searchMovies();
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    navigate(`/?q=${e.target.value}`);
  };

  return (
    <Container>
      <Header>
        <div>
          <ToggleButtons />
        </div>
        {!showSearchBox ? (
          <>
            <span>인기 영화</span>
            <div className="main_search">
              <IoSearch size={22} onClick={() => handleClick()} />
            </div>
          </>
        ) : (
          <div className="search_header">
            <Input
              ref={inputRef}
              type="text"
              placeholder="영화 제목을 입력해주세요."
              onKeyDown={handleEnterKeyPress}
              onChange={(e) => handleChange(e)}
              value={searchValue}
            />
            <IoSearch size={22} onClick={() => searchMovies()} />
          </div>
        )}
      </Header>
      <MovieBox
        className={`${isSmall ? "oneRowTwoColumn" : "oneRowOneColumn"}`}
      >
        {movies.map((movie: MovieProps) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            isSmall={isSmall}
            currentUser={currentUser}
          />
        ))}
      </MovieBox>
    </Container>
  );
};

export default HomePage;
