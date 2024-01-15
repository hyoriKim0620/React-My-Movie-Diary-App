import styled from "styled-components";

export const Container = styled.div`
  height: 100%;
  background: #fff;
  display: flex;
  flex-direction: column;
`;

export const Input = styled.input`
  width: 100%;
  font-size: 13px;
`;

export const Header = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 15px 0 10px;
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;

  span {
    font-weight: bold;
  }
  .main_search {
    width: 90px;
    display: flex;
    justify-content: flex-end;
    svg {
      cursor: pointer;
    }
  }
  .search_header {
    width: calc(100vw-130px);
    display: flex;
    justify-content: space-between;
    border: 1px solid lightgray;
    border-radius: 4px;
    svg {
      cursor: pointer;
      padding: 0 4px;
    }
  }
`;

export const MovieBox = styled.div`
  display: grid;
  width: 100%;
  flex-grow: 1;
  padding: 10px 10px;
  overflow: hidden auto;
  box-sizing: border-box;

  &.oneRowTwoColumn {
    grid-template-columns: repeat(2, 1fr);
    grid-auto-rows: 250px;
  }
  &.oneRowOneColumn {
    grid-template-columns: repeat(1, 1fr);
    grid-auto-rows: 200px;
  }

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
