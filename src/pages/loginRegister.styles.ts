import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: calc(100vh - 45px);
  background: #fff78a;
  padding: 2.2rem 1rem;
  font-weight: bold;
`;

export const ImageBox = styled.div`
  margin-bottom: 1.5rem;
  display: flex;
  justify-content: center;

  img {
    width: 100px;
    height: 100px;
  }

  &.move_ani img {
    animation: moveAni 0.6s linear 0s infinite alternate;

    @keyframes moveAni {
      0% {
        transform: translateY(0);
      }
      100% {
        transform: translateY(10px);
      }
    }
  }
`;

export const Input = styled.input`
  width: 100%;
  height: 40px;
  margin-bottom: 0.4rem;
  padding-left: 10px;
  border: 2px solid #ffe382;
  border-radius: 5px;
  text-align: left;
  font-size: 15px;
`;

export const Button = styled.button`
  width: 100%;
  height: 40px;
  border-radius: 15px;
  font-weight: bold;
  font-size: 15px;
  background: #8ecddd;
  border: 2px solid #6da4aa;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  color: #22668d;
`;
