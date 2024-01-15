import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { setSelectMenu } from "../../store/sideBar/sideBarSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
  Container,
  Header,
  Input,
  MovieBox,
} from "../HomePage/homePage.styles";
import ToggleButtons from "../../components/ToggleButtons";
import { IoSearch } from "react-icons/io5";
import { MovieProps } from "../HomePage";
import MovieCard from "./../../components/movie/movieCard";
import { setCurrentUser } from "../../store/user/userSlice";
import { EmptyObject } from "../../utils/EmptyObject";
import { GetHoneyMovie } from "../../utils/LocalStorageApi";
import EmptyState from "../../components/EmptyState";

const MyHoneyPage = () => {
  const dispatch = useAppDispatch();
  const inputRef = useRef<HTMLInputElement>(null);
  const [showSearchBox, setShowSearchBox] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const { isSmall } = useAppSelector((state) => state.movie);
  const { selectMenu } = useAppSelector((state) => state.sideBar);
  const { currentUser } = useAppSelector((state) => state.user);
  const storedMovies = localStorage.getItem("movies");
  const initialMovies: MovieProps[] = storedMovies
    ? JSON.parse(storedMovies)
    : [];
  const [movies, setMovies] = useState(initialMovies);
  const [searchMovies, setSearchMovies] = useState(initialMovies);
  const { honeyMovie } = useAppSelector((state) => state.movie);

  useEffect(() => {
    if (EmptyObject(currentUser)) getCurrentUser();

    if (selectMenu !== "myHoney") {
      dispatch(setSelectMenu("myHoney"));
    }

    setHoneyMovies();
  }, [currentUser, honeyMovie]);

  const getCurrentUser = () => {
    const testUser = {
      id: "1",
      name: "test",
      hashedPassword: "1111",
      email: "test@naver.com",
      image: "",
      honeyMovieIds: "[]",
      myReview: "[]",
      runtime: 0,
    };

    const user = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user") as string)
      : testUser;

    dispatch(setCurrentUser(user));
  };

  const setHoneyMovies = () => {
    const honeyMovies = GetHoneyMovie();
    setMovies(honeyMovies);
    setSearchMovies(honeyMovies);
  };

  const handleClick = () => {
    if (showSearchBox) return;
    setShowSearchBox(true);
  };

  const handleEnterKeyPress = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      filterMovies();
    }
  };

  const filterMovies = () => {
    let newArray = [...movies];
    newArray = newArray.filter((movie) => movie.title?.includes(searchValue));
    setSearchMovies(newArray);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <Container>
      {searchMovies.length > 0 ? (
        <>
          <Header>
            <div>
              <ToggleButtons />
            </div>
            {!showSearchBox ? (
              <>
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
                <IoSearch size={22} onClick={() => filterMovies()} />
              </div>
            )}
          </Header>
          <MovieBox
            className={`${isSmall ? "oneRowTwoColumn" : "oneRowOneColumn"}`}
          >
            {searchMovies.map((movie: MovieProps) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                isSmall={isSmall}
                currentUser={currentUser}
              />
            ))}
          </MovieBox>
        </>
      ) : (
        <EmptyState
          title="My 꿀 영화가 없습니다."
          sub_title="하트를 클릭하여 추가해주세요."
        />
      )}
    </Container>
  );
};

export default MyHoneyPage;
