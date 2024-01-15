import styled from "styled-components";

export const ItemBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  padding-top: 9px;
`;

export const AddMyReviewIcon = styled.div`
  width: calc(100vw / 5);
  height: 60px;
  position: absolute;
  bottom: 30px;
  transform: translateX(5px);
  margin: 0 auto;
  z-index: 100;

  img {
    width: auto;
    height: 100%;
    margin: 0 auto;
    border-radius: 50%;
  }
  div {
    width: 100%;
    height: 100%;
    font-size: 2.2rem;
    color: #fff;
    text-align: center;
    position: absolute;
    top: 5px;
    right: 2px;
  }
`;
