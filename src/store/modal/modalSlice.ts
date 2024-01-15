import { createSlice } from "@reduxjs/toolkit";

export interface Movie {
  title: string;
  original_title: string;
  backdrop_path: string;
  id: number;
  overview: string;
  popularity: number;
  release_date: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  runtime?: number;
}

interface ModalState {
  detailModal: boolean;
  selectMovie: Movie;
  honeyReviewModal: boolean;
}

const initialState: ModalState = {
  detailModal: false,
  selectMovie: {
    backdrop_path: "/mSDsSDwaP3E7dEfUPWy4J0djt4O.jpg",
    id: 129,
    original_title: "千と千尋の神隠し",
    overview:
      "평범한 열 살 짜리 소녀 치히로 식구는 이사 가던 중 길을 잘못 들어 낡은 터널을 지나가게 된다. 터널 저편엔 폐허가 된 놀이공원이 있었고 그곳엔 이상한 기운이 흘렀다. 인기척 하나 없는 이 마을의 낯선 분위기에 불길한 기운을 느낀 치히로는 부모님에게 돌아가자고 조르지만 부모님은 호기심에 들떠 마을 곳곳을 돌아다니기 시작한다. 어느 음식점에 도착한 치히로의 부모님은 그 곳에 차려진 음식들을 보고 즐거워하며 허겁지겁 먹어대다가 돼지로 변해버린다. 겁에 질려 당황하는 치히로에게 낯선 소년 하쿠가 나타나 빨리 이곳을 나가라고 소리치는데...",
    popularity: 98.487,
    release_date: "2001-07-20",
    title: "센과 치히로의 행방불명",
    video: false,
    vote_average: 8.538,
    vote_count: 15360,
  },
  honeyReviewModal: false,
};

const modalSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    toggleDetailModal: (state, action) => {
      state.detailModal = action.payload;
    },
    setSelectMovie: (state, action) => {
      state.selectMovie = action.payload;
    },
    toggleHoneyReviewModal: (state, action) => {
      state.honeyReviewModal = action.payload;
    },
  },
});

export const { toggleDetailModal, setSelectMovie, toggleHoneyReviewModal } =
  modalSlice.actions;
export default modalSlice.reducer;
