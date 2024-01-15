import styled from "styled-components";

export const ModalContainer = styled.div`
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0px;
  right: 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.4) !important;
  z-index: 500;
`;

export const ModalButton = styled.button`
  width: 100%;
  background-color: #ffcc70;
  font-size: 14px;
  font-weight: bold;
  padding: 5px 0;
`;
