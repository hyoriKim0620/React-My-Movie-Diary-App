import { createSlice } from "@reduxjs/toolkit";
import { SIDEBAR_ITEMS } from "../../constants";
import { IoHomeOutline } from "react-icons/io5";

interface NavMenuProps {
  title: string;
  path: string;
  icon: React.ElementType; // 아이콘 컴포넌트의 타입
}

interface SideBarState {
  isOpen: boolean;
  selectMenu: string;
  navMenu: NavMenuProps[];
}

const initialState: SideBarState = {
  isOpen: false,
  selectMenu: "home",
  navMenu: [],
};

const sideBarSlice = createSlice({
  name: "sideBar",
  initialState,
  reducers: {
    toggleSideBar: (state, action) => {
      state.isOpen = action.payload;
    },
    setSelectMenu: (state, action) => {
      state.selectMenu = action.payload;
    },
    pushNavMenu: (state) => {
      const navBarMenu = [...SIDEBAR_ITEMS];
      const meddleItem = { title: "", path: "", icon: IoHomeOutline };
      const arrMiddleIndex = Math.floor(SIDEBAR_ITEMS.length / 2);

      navBarMenu.splice(arrMiddleIndex, 0, meddleItem);

      state.navMenu = navBarMenu;
    },
  },
});

export const { toggleSideBar, setSelectMenu, pushNavMenu } =
  sideBarSlice.actions;
export default sideBarSlice.reducer;
