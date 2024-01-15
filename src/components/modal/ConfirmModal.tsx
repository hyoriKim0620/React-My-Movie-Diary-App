import styled from "styled-components";
import { ModalButton, ModalContainer } from "./modal.styles";
import { useEffect } from "react";
import { DeleteMyReview, GetMyReview } from "../../utils/LocalStorageApi";
import { useAppDispatch } from "../../hooks/redux";
import { setMyReview } from "../../store/user/userSlice";

interface ConfirmModalProps {
  confirm: boolean;
  text: string;
  setAlertModal: (value: boolean) => void;
  reviewId?: string | "";
}

const ConfirmModal = ({
  confirm,
  text,
  setAlertModal,
  reviewId,
}: ConfirmModalProps) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!confirm) {
      setTimeout(() => {
        setAlertModal(false);
      }, 2000);
    }
  }, []);

  const deleteReview = async () => {
    const request = await DeleteMyReview(reviewId as string);

    if (request) {
      dispatch(setMyReview(GetMyReview()));
    }
    setAlertModal(false);
  };

  if (confirm) {
    return (
      <ModalContainer>
        <Box>
          <div className="p-4">{text}</div>
          <div className="flex">
            <ModalButton onClick={() => deleteReview()}>확인</ModalButton>
            <ModalButton
              className="confirm_cancel"
              onClick={() => setAlertModal(false)}
            >
              취소
            </ModalButton>
          </div>
        </Box>
      </ModalContainer>
    );
  } else {
    return (
      <ModalContainer>
        <Box>
          <div className="p-4">{text}</div>
          <ModalButton onClick={() => setAlertModal(false)}>확인</ModalButton>
        </Box>
      </ModalContainer>
    );
  }
};

export default ConfirmModal;

const Box = styled.div`
  width: clamp(250px, 85%, 580px);
  background-color: #fff;
  border: 2px solid #ffcc70;
  color: black;
  border-radius: 10px;

  .confirm_cancel {
    background-color: #fff;
    border-top: 1px solid #ffcc70;
  }
`;
