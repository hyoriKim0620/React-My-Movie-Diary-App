import { useEffect } from "react";
import styled from "styled-components";
import NavBarItem from "./NavBarItem";
import { pushNavMenu, setSelectMenu } from "../../store/sideBar/sideBarSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { useNavigate } from "react-router";

const NavBar = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { selectMenu } = useAppSelector((state) => state.sideBar);
  const { navMenu } = useAppSelector((state) => state.sideBar);

  useEffect(() => {
    dispatch(pushNavMenu());
  }, []);

  const handleClick = (path: string) => {
    if (path === "") return;

    dispatch(setSelectMenu(path));
    if (path === "home") navigate("/");
    else navigate(path);
  };

  return (
    <Container>
      {navMenu.map((item, i) => (
        <li
          key={i}
          onClick={() => handleClick(item.path)}
          className={`${selectMenu === item.path ? "active" : "inactive"}`}
        >
          <NavBarItem item={item} />
        </li>
      ))}
    </Container>
  );
};

export default NavBar;

const Container = styled.div`
  max-width: 1280px;
  height: 60px;
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 0;
  background: #fff;
  border-bottom: 1px solid #ddd;
  display: flex;
  align-items: center;
  justify-content: space-around;

  li {
    width: calc(100vw / 5);
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    &.active {
      background: #fff78a;
    }
    &.inactive {
      background: #fff;
    }
  }
`;
