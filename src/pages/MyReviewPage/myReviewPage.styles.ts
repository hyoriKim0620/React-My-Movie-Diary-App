import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100%;
`;

export const Header = styled.div`
  width: 100%;
  height: 40px;
  padding: 0 10px;
  background: #fff;
  border-bottom: 1px solid #ddd;
  display: flex;
  align-items: center;

  .search_header {
    width: 100%;
    height: 80%;
    display: flex;
    justify-content: space-between;
    border: 2px solid #ffcc70;
    border-radius: 4px;
    svg {
      cursor: pointer;
      padding: 0 4px;
    }
  }
`;

export const Input = styled.input`
  width: 100%;
  font-size: 13px;
`;

export const Box = styled.div`
  width: 100%;
  height: calc(100% - 40px);
  padding: 10px 10px 0 10px;
  overflow: scroll;

  // 스크롤
  &::-webkit-scrollbar-thumb {
    background: lightgray;
    border-radius: 7px;
    height: 10px;
  }
  &::-webkit-scrollbar-track {
    background-color: #fcfcfc;
  }
  @media screen and (min-width: 950px) {
    &:hover {
      &::-webkit-scrollbar {
        width: 7px;
      }
    }
    &::-webkit-scrollbar {
      width: 0;
      background-color: white;
    }
  }
`;

export const ItemBox = styled.div`
  width: 100%;
  min-height: 130px;
  height: auto;
  border-radius: 15px;
  border: 2px solid #8ecddd;
  margin-bottom: 10px;
  padding: 15px;
  font-size: 14px;
`;

export const ReviewButton = styled.button`
  width: 80px;
  height: 30px;
  border-radius: 5px;
  font-size: 14px;

  &.review_edit {
    background: #fffadd;
    border: 2px solid #ffad84;
    margin-right: 5px;
  }
  &.review_del {
    background: #fff;
    border: 2px solid #ffad84;
  }
`;
