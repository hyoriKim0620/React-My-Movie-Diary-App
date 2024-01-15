import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { useEffect, useState } from "react";
import { EmptyObject } from "../../utils/EmptyObject";
import axios from "axios";
import { setCurrentUser } from "../../store/user/userSlice";

const MyMovieData = () => {
  const dispatch = useAppDispatch();
  const { currentUser, watchMovie, watchMovieRunTime } = useAppSelector(
    (state) => state.user
  );
  const [time, setTime] = useState(0);
  const [minutes, setMinutes] = useState(0);

  useEffect(() => {
    if (EmptyObject(currentUser)) {
      getCurrentUser();
      setTimeMinutes();
      setWatchMovie();
    } else {
      setTimeMinutes();
      // setWatchMovie();
    }
  }, []);

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

  const setWatchMovie = () => {
    if (!EmptyObject(currentUser)) {
      const movies = JSON.parse(currentUser.honeyMovieIds);
      dispatch(setWatchMovie(movies.length));
    }
  };

  const setTimeMinutes = () => {
    console.log("currentUser : ", currentUser, currentUser?.runtime);
    const time = currentUser?.runtime
      ? currentUser.runtime >= 60
        ? Math.floor(currentUser.runtime / 60)
        : 0
      : 0;
    const minutes = currentUser?.runtime ? currentUser?.runtime % 60 : 0;

    setTime(time);
    setMinutes(minutes);
  };

  return (
    <Container>
      <DataBox>
        <div style={{ borderBottom: "1px solid #fff", paddingBottom: "16px" }}>
          <div className="title">시청 영화</div>
          <div>
            <span className="big_text">{watchMovie}</span>
            &nbsp;<span className="small_text">편</span>
          </div>
        </div>
        <div style={{ paddingTop: "16px" }}>
          <div className="title">영화 시청 시간</div>
          <div>
            <span className="big_text">{time}</span>
            <span className="small_text">시간</span>
            &nbsp;<span className="big_text">{minutes}</span>
            <span className="small_text">분</span>
          </div>
        </div>
      </DataBox>
    </Container>
  );
};

export default MyMovieData;

const Container = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: auto;
  padding: 40px 10px 30px 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 17% 17% 0 0;
  background: linear-gradient(to top, #ffcc70, #fff78a);
`;

const DataBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-weight: bold;

  .title {
    color: #22668d;
    font-size: 1.7rem;
    &:nth-child(1) {
      padding-top: 10px;
    }
  }

  .big_text {
    font-size: 2.5rem;
  }
  .small_text {
    font-size: 1.7rem;
  }

  @media screen and (max-width: 650px) {
    .title {
      font-size: 1.2rem;
      padding-bottom: 10px;
    }
    .big_text {
      font-size: 1.5rem;
    }
    .small_text {
      font-size: 1rem;
    }
  }
`;
