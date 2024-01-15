import React from "react";
import styled from "styled-components";
import { SIDEBAR_ITEMS } from "../../constants";
import { useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { toggleSideBar, setSelectMenu } from "../../store/sideBar/sideBarSlice";

const SideBarItem = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { selectMenu } = useAppSelector((state) => state.sideBar);

  const handleClick = (path: string) => {
    dispatch(setSelectMenu(path));

    setTimeout(() => {
      dispatch(toggleSideBar(false));
    }, 200);

    if (path === "home") navigate("/");
    else navigate(`${path}`);
  };

  return (
    <ItemBox>
      {SIDEBAR_ITEMS.map((item, i) => (
        <li
          key={i}
          onClick={() => handleClick(item.path)}
          className={`${selectMenu === item.path ? "active" : "inactive"}`}
        >
          {React.createElement(item.icon, { size: 20 })}
          <span>{item.title}</span>
        </li>
      ))}
    </ItemBox>
  );
};

export default SideBarItem;

const ItemBox = styled.ul`
  margin-top: 0;

  li {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 1rem;
    padding: 10px 15px;
    font-weight: bold;
    cursor: pointer;
    font-size: 1.3rem;

    &:hover {
      background: #fff78a;
    }

    &.active {
      background: #fff78a;
    }
    &.inactive {
      background: #fff;
    }

    @media screen and (max-width: 650px) {
      font-size: 16px;
    }
  }
`;
