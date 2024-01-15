import React from "react";
import styled from "styled-components";
import { APP_NAME } from "../constants";
import { FaBars } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
import { useAppDispatch } from "../hooks/redux";
import { toggleSideBar } from "../store/sideBar/sideBarSlice";
import { toggleHoneyReviewModal } from "../store/modal/modalSlice";

interface HeaderProps {
  pathname: string;
}

const Header = ({ pathname }: HeaderProps) => {
  const loginRegister =
    pathname === "/login"
      ? "로그인"
      : pathname === "/register"
      ? "회원가입"
      : "";
  const dispatch = useAppDispatch();
  const writeMyReview = () => {
    console.log("Write my review");
  };

  if (loginRegister !== "") {
    return (
      <LoginContainer>
        <div>{loginRegister}</div>
      </LoginContainer>
    );
  } else {
    return (
      <Container>
        <span
          onClick={(e: React.MouseEvent) => {
            e.stopPropagation();
            dispatch(toggleSideBar(true));
          }}
        >
          <FaBars size={19} />
        </span>
        <span className="header_span">
          <img src="/love_bee.png" width={30} height={30} />
          <span>{APP_NAME}</span>
        </span>
        <FaPlus
          size={22}
          onClick={() => dispatch(toggleHoneyReviewModal(true))}
        />
      </Container>
    );
  }
};

export default Header;

const LoginContainer = styled.div`
  height: 45px;
  background: #fff;
  color: #333;
  border-bottom: 1px solid #ddd;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  height: 45px;
  background: #fff;
  color: #333;
  border-bottom: 1px solid #ddd;
  align-items: center;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: space-between !important;
  padding: 5px 15px;

  .header_span {
    display: flex;
    img {
      margin-right: 8px;
    }
    span {
      transform: translateY(2px);
    }
  }

  span {
    font-weight: bold;
    font-size: 1.1rem;

    &:nth-child(1) {
      width: 50px;
      height: 100%;
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }
  }
  svg {
    cursor: pointer;
    color: #777;
  }
`;
