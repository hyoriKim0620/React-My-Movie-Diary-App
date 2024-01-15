import React, { ChangeEvent, useEffect, useState } from "react";
import styled from "styled-components";
import {
  Movie,
  toggleHoneyReviewModal,
  toggleShowSearchMovieModal,
} from "../../store/modal/modalSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { IoSearch } from "react-icons/io5";
import { ModalContainer } from "./modal.styles";
import { Input } from "../../pages/loginRegister.styles";
import ConfirmModal from "./ConfirmModal";
import SearchMovieModal from "./SearchMovieModal";
import { setWriteReviewMovie } from "../../store/movie/movieSlice";
import { EmptyObject } from "../../utils/EmptyObject";
import ScoreImage from "../ScoreImage";
import {
  EditMyReview,
  GetMyReview,
  PushMyReview,
} from "../../utils/LocalStorageApi";
import { setMyReview } from "../../store/user/userSlice";
import dayjs from "dayjs";

const HoneyReviewModal = () => {
  const modalRef = React.useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const { reviewModalType, showSearchMovieModal } = useAppSelector(
    (state) => state.modal
  );
  const { writeReviewMovie } = useAppSelector((state) => state.movie);
  const [alertModal, setAlertModal] = useState(false);
  const [searchMovieTitle, setSearchMovieTitle] = useState("");
  const [selectValue, setSelectValue] = useState({
    reviewId: "",
    title: "",
    name: "",
    release_date: "",
    first_air_date: "",
    watch_date: "",
    backdrop_path: "",
    poster_path: "",
    review: "",
    score: 5,
  });
  const {
    title,
    name,
    release_date,
    first_air_date,
    watch_date,
    backdrop_path,
    poster_path,
    review,
    score,
  } = selectValue;

  useEffect(() => {
    document.addEventListener("mousedown", () => {
      if (!showSearchMovieModal) checkModalRef;
    });
    return () => {
      document.removeEventListener("mousedown", () => {
        if (!showSearchMovieModal) checkModalRef;
      });
    };
  }, []);

  useEffect(() => {
    if (!EmptyObject(writeReviewMovie)) {
      const data = { ...writeReviewMovie } as Movie;

      setSelectValue({
        ...selectValue,
        reviewId: data.reviewId || "",
        title: data.title || "",
        name: data.name || "",
        release_date: data.release_date || "",
        watch_date: data.watch_date || "",
        first_air_date: data.first_air_date || "",
        backdrop_path: data.backdrop_path,
        poster_path: data.poster_path || "",
        score: data.score || 5,
        review: data.review || "",
      });
    }
  }, [writeReviewMovie]);

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setSelectValue({
      ...selectValue,
      [name]: value,
    });
  };

  const handleTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setSelectValue({
      ...selectValue,
      review: e.target.value,
    });
  };

  const checkModalRef = (event: MouseEvent) => {
    const target = event.target as HTMLDivElement;

    if (modalRef.current && !modalRef.current.contains(target)) {
      closeHoneyReviewModal();
    }
  };

  const handleMovieSearch = () => {
    if (searchMovieTitle !== "") {
      dispatch(toggleShowSearchMovieModal(true));
    } else {
      setAlertModal(true);
    }
  };

  const handleEnterKeyPress = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      handleMovieSearch();
    }
  };

  const saveMyReview = async () => {
    if (selectValue.name === "" && selectValue.title === "") {
      return;
    }

    if (selectValue.watch_date == "") {
      setSelectValue({
        ...selectValue,
        watch_date: dayjs(new Date()).format("YYYY-MM-DD"),
      });
    }

    let request;
    if (reviewModalType === "add") {
      request = await PushMyReview(selectValue);
    } else {
      request = await EditMyReview(selectValue);
    }

    if (request) {
      dispatch(setMyReview(GetMyReview()));
    }
    handleModalCancel();
  };

  const handleModalCancel = () => {
    dispatch(setWriteReviewMovie({}));
    closeHoneyReviewModal();
  };

  const closeHoneyReviewModal = () => {
    dispatch(toggleHoneyReviewModal(false));
  };

  return (
    <ModalContainer>
      {showSearchMovieModal && (
        <SearchMovieModal searchMovieTitle={searchMovieTitle} />
      )}
      {alertModal && (
        <ConfirmModal
          confirm={false}
          text="영화명을 입력 후 검색해주세요."
          setAlertModal={setAlertModal}
        />
      )}
      <Box ref={modalRef}>
        <ModalTitle>
          {reviewModalType === "add" ? "My 리뷰 등록" : "My 리뷰 수정"}
        </ModalTitle>
        <div className="px-2 pt-4">
          {title !== "" || name !== "" ? (
            <TitleDiv>{title || name}</TitleDiv>
          ) : (
            <div className="search_header">
              <MovieInput
                type="text"
                placeholder="영화명을 입력해주세요."
                onKeyDown={handleEnterKeyPress}
                onChange={(e) => setSearchMovieTitle(e.target.value)}
                value={searchMovieTitle}
              />
              <IoSearch size={32} onClick={() => handleMovieSearch()} />
            </div>
          )}

          <div className="flex items-center">
            <span className="inline-block w-[100px]">개봉일 : </span>
            <Input
              type="date"
              value={release_date || first_air_date}
              disabled
            />
          </div>
          <div className="flex items-center">
            <span className="inline-block w-[100px]">시청일 : </span>
            <Input
              type="date"
              name="watch_date"
              value={watch_date}
              onChange={(e) => handleInput(e)}
            />
          </div>
        </div>
        <div className="mt-3" style={{ borderTop: "1px solid #ddd" }}>
          <textarea
            value={review}
            onChange={(e) => handleTextareaChange(e)}
            className="w-full h-full min-h-[200px] text-left py-3 px-2"
          />
        </div>
        <div
          className="flex justify-center items-center overflow-hidden"
          style={{ borderTop: "1px solid #ddd" }}
        >
          {backdrop_path ? (
            <img
              src={`https://images.tmdb.org/t/p/w500/${
                backdrop_path || poster_path
              }`}
              width={"100%"}
              height={"100%"}
              style={{ objectFit: "cover" }}
            />
          ) : (
            <img
              src="/love_bee.png"
              width={100}
              height={"auto"}
              style={{ padding: "10px" }}
            />
          )}
        </div>
        <div
          className="pt-1 flex flex-wrap justify-around"
          style={{ borderTop: "1px solid #ddd" }}
        >
          <div className="w-full text-left pl-3">
            별점 :{" "}
            <Select
              value={score}
              onChange={(e) =>
                setSelectValue({
                  ...selectValue,
                  score: Number(e.target.value),
                })
              }
            >
              <option value={5}>5점</option>
              <option value={4}>4점</option>
              <option value={3}>3점</option>
              <option value={2}>2점</option>
              <option value={1}>1점</option>
            </Select>
          </div>
          <ScoreImage score={score} />
        </div>

        <div className="pt-3 flex text-sm font-bold">
          {reviewModalType === "add" ? (
            <>
              {" "}
              <button
                onClick={() => saveMyReview()}
                className="w-[50%] py-2"
                style={{ background: "#FFE382" }}
              >
                저장
              </button>
              <button
                onClick={() => handleModalCancel()}
                className="w-[50%] py-2"
                style={{ borderTop: "1px solid #ffcc70" }}
              >
                취소
              </button>
            </>
          ) : (
            <button
              onClick={() => saveMyReview()}
              className="w-[100%] py-2"
              style={{ background: "#FFE382" }}
            >
              저장
            </button>
          )}
        </div>
      </Box>
    </ModalContainer>
  );
};

export default HoneyReviewModal;

const Box = styled.div`
  width: clamp(250px, 97%, 580px);
  background-color: #fff;
  border: 2px solid #ffcc70;
  color: black;
  border-radius: 10px;
  padding: 15px 0 0 0;

  .search_header {
    height: 40px;
    margin-bottom: 0.4rem;
    display: flex;
    justify-content: space-between;
    border: 2px solid #ffe382;
    border-radius: 4px;
    svg {
      cursor: pointer;
      padding: 0 4px;
    }
  }
`;

const MovieInput = styled.input`
  width: 100%;
  padding-left: 10px;
  border-radius: 5px;
  text-align: left;
  font-size: 15px;
`;

const ModalTitle = styled.div`
  font-weight: bold;
`;

const TitleDiv = styled.div`
  width: 100%;
  height: 40px;
  margin-bottom: 0.4rem;
  padding-left: 10px;
  border: 2px solid #ffe382;
  border-radius: 5px;
  text-align: left;
  font-size: 15px;
  display: flex;
  align-items: center;
`;

const Select = styled.select`
  width: clamp(100px, 3%, 200px);
`;
