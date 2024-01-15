import styled from "styled-components";
import SideBarItem from "./SideBarItem";
import MyMovieData from "./MyMovieData";

const SideBar = () => {
  return (
    <Container>
      <SideBarItem />
      <MyMovieData />
    </Container>
  );
};

export default SideBar;

const Container = styled.div`
  width: 300px;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  background: #fff;
  box-shadow: 1px 0 3px #ffe382;
  z-index: 1000;
  @media screen and (max-width: 650px) {
    width: 150px;
  }
`;
