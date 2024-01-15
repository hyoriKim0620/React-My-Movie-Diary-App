import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ModalContainer } from "./modal.styles";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { ImQuotesLeft, ImQuotesRight } from "react-icons/im";
import { getNumberFormat } from "../../utils/numberFormat";
import { getYMDFormat } from "../../utils/dayjs";
import { FaStar } from "react-icons/fa6";
import {
  setSelectMovie,
  toggleDetailModal,
} from "../../store/modal/modalSlice";

const DetailMovieModal = () => {
  const modalRef = React.useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const { selectMovie } = useAppSelector((state) => state.modal);
  const [textAddDetail, setTextAddDetail] = useState(true);

  useEffect(() => {
    document.addEventListener("mousedown", checkModalRef);
    return () => {
      document.removeEventListener("mousedown", checkModalRef);
    };
  }, []);

  const checkModalRef = (event: MouseEvent) => {
    const target = event.target as HTMLDivElement;

    if (modalRef.current && !modalRef.current.contains(target)) {
      closeDetailModal();
    }
  };

  const closeDetailModal = () => {
    dispatch(setSelectMovie({}));
    dispatch(toggleDetailModal(false));
  };

  return (
    <ModalContainer>
      <Box ref={modalRef}>
        <div className="px-5">
          <div className="text-zinc-500 text-xs">
            {selectMovie.original_title}
          </div>
          <div className="pb-3 flex justify-evenly items-start">
            {/* {selectMovie.title} */}
            <ImQuotesLeft className="quotes" />
            <div className="movie-oneCard-title">{selectMovie.title}</div>
            <ImQuotesRight className="quotes" />
          </div>
          {textAddDetail ? (
            <div className="relative">
              <div className="full_overview">{selectMovie.overview}</div>
              <span
                className="close_text"
                onClick={() => setTextAddDetail(false)}
              >
                닫기
              </span>
            </div>
          ) : (
            <div className="w-full relative flex">
              <div className="little_overview">
                {selectMovie.overview}
                <span
                  className="open_text"
                  onClick={() => setTextAddDetail(true)}
                >
                  더보기
                </span>
              </div>
            </div>
          )}
          <ModalVoteDate>
            <div className="text-xs text-right text-zinc-600">
              {getYMDFormat(selectMovie.release_date || "")}
            </div>
            <div className="text-sm flex items-center justify-end py-1">
              <FaStar color={"#FFCC70"} />
              <span className="pl-1 pt-[2px]">
                {selectMovie.vote_average.toFixed(1)}&nbsp;
                <span className="text-xs">
                  ({getNumberFormat(selectMovie.vote_count)}명)
                </span>
              </span>
            </div>
          </ModalVoteDate>
        </div>
        <ImageBox>
          <img
            src={`https://images.tmdb.org/t/p/w500/${selectMovie.backdrop_path}`}
          />
        </ImageBox>
      </Box>
    </ModalContainer>
  );
};

export default DetailMovieModal;

const Box = styled.div`
  width: clamp(250px, 95%, 580px);
  background-color: #fff;
  border: 2px solid #ffcc70;
  color: black;
  border-radius: 10px;
  padding: 20px 0 0;

  .full_overview {
    text-align: left;
    font-size: 12px;
  }
  .little_overview {
    width: 90%;
    text-align: left;
    font-size: 12px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  .close_text {
    font-weight: bold;
    font-size: 12px;
    position: absolute;
    right: 0;
    bottom: -5px;
  }
  .open_text {
    font-weight: bold;
    font-size: 12px;
    position: absolute;
    right: 0;
  }
  .quotes {
    color: #8ecddd;
    transform: translateY(-5px);
  }
`;

const ModalVoteDate = styled.div`
  padding: 10px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
`;

const ImageBox = styled.div`
  width: 100%;

  img {
    width: 100%;
    height: auto;
    border-radius: 0 0 10px 10px;
  }
`;
