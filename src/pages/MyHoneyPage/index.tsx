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
import axios from "axios";
import { EmptyObject } from "../../utils/EmptyObject";
import styled from "styled-components";

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

  useEffect(() => {
    if (EmptyObject(currentUser)) getCurrentUser();

    if (selectMenu !== "myHoney") {
      dispatch(setSelectMenu("myHoney"));
    }

    setHoneyMovies();
  }, [currentUser]);

  const getCurrentUser = () => {
    const testUserEmail = "test@naver.com";

    axios
      .get(`/api/userInfo/${testUserEmail}`)
      .then((res) => {
        const data = res.data.data[0];
        dispatch(setCurrentUser(data));
      })
      .catch();
  };

  const setHoneyMovies = () => {
    console.log("currentUser : ", currentUser);
    if (!EmptyObject(currentUser)) {
      const movieIds = JSON.parse(currentUser.honeyMovieIds);
      const honeyMovies = [...movieIds];

      setMovies(honeyMovies);
      setSearchMovies(honeyMovies);
    }
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
      {searchMovies.length > 0 ? (
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
      ) : (
        <EmptyContent>
          <img src="/base_bee.png" alt="empty-myHoney-image" width={"120px"} />
          <div className="pt-3">My 꿀 영화가 없습니다.</div>
          <div>하트를 클릭하여 추가해주세요.</div>
        </EmptyContent>
      )}
    </Container>
  );
};

export default MyHoneyPage;

const EmptyContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  background: #fff78a;
`;
