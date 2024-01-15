import React, { useEffect } from "react";
import { ModalContainer } from "./modal.styles";
import styled from "styled-components";
import { Input } from "../../pages/loginRegister.styles";
import {
  // setSelectMovie,
  toggleHoneyReviewModal,
} from "../../store/modal/modalSlice";
import { useAppDispatch } from "../../hooks/redux";

const HoneyReviewModal = () => {
  const modalRef = React.useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    document.addEventListener("mousedown", checkModalRef);
    return () => {
      document.removeEventListener("mousedown", checkModalRef);
    };
  }, []);

  const checkModalRef = (event: MouseEvent) => {
    const target = event.target as HTMLDivElement;

    if (modalRef.current && !modalRef.current.contains(target)) {
      closeHoneyReviewModal();
    }
  };

  const closeHoneyReviewModal = () => {
    dispatch(toggleHoneyReviewModal(false));
  };

  return (
    <ModalContainer>
      <Box ref={modalRef}>
        <ModalTitle>My 리뷰 등록</ModalTitle>
        <div className="px-2 pt-4">
          <Input placeholder="영화명을 입력해주세요." />
          <div className="flex items-center">
            <span className="inline-block w-[100px]">개봉일 : </span>
            <Input type="date" />
          </div>
          <div className="flex items-center">
            <span className="inline-block w-[100px]">시청일 : </span>
            <Input type="date" />
          </div>
        </div>
        <div className="mt-3" style={{ borderTop: "1px solid #ddd" }}>
          <textarea className="w-full h-full min-h-[300px] py-3" />
        </div>
        <div className="py-3" style={{ borderTop: "1px solid #ddd" }}>
          <button style={{ border: "1px solid #ffcc70" }}>이미지 업로드</button>
        </div>
        <div
          className="pt-3 flex justify-around"
          style={{ borderTop: "1px solid #ddd" }}
        >
          <img
            src="/honey.png"
            width={60}
            height={70}
            style={{ border: "1px solid #FFCC70", borderRadius: "50%" }}
          />
          <img
            src="/honey.png"
            width={60}
            height={70}
            style={{ border: "1px solid #FFCC70", borderRadius: "50%" }}
          />
          <img
            src="/honey.png"
            width={60}
            height={70}
            style={{ border: "1px solid #FFCC70", borderRadius: "50%" }}
          />
          <img
            src="/honey.png"
            width={60}
            height={70}
            style={{ border: "1px solid #FFCC70", borderRadius: "50%" }}
          />
          <img
            src="/honey.png"
            width={60}
            height={70}
            style={{ border: "1px solid #FFCC70", borderRadius: "50%" }}
          />
        </div>
        <div className="pt-3 flex text-sm font-bold">
          <button className="w-[50%] py-2" style={{ background: "#FFE382" }}>
            저장
          </button>
          <button
            className="w-[50%] py-2"
            style={{ border: "1px solid #ffcc70" }}
          >
            삭제
          </button>
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
`;

const ModalTitle = styled.div`
  font-weight: bold;
`;
