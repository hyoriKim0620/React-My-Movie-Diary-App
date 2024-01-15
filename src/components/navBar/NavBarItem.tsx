import React, { ElementType } from "react";
import { AddMyReviewIcon, ItemBox } from "./navBar.styles";
import { useAppDispatch } from "../../hooks/redux";
import { toggleHoneyReviewModal } from "../../store/modal/modalSlice";

interface NavBarItemProps {
  item: {
    title: string;
    path: string;
    icon: ElementType;
  };
}

const NavBarItem: React.FC<NavBarItemProps> = ({ item }) => {
  const dispatch = useAppDispatch();

  return (
    <ItemBox>
      {item.title !== "" ? (
        <>
          {React.createElement(item.icon, { size: 24 })}
          <span>{item.title}</span>
        </>
      ) : (
        <AddMyReviewIcon onClick={() => dispatch(toggleHoneyReviewModal(true))}>
          <img src="/bg_honey.png" />
          <div>+</div>
        </AddMyReviewIcon>
      )}
    </ItemBox>
  );
};

export default NavBarItem;
