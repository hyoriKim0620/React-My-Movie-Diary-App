import { ElementType } from "react";
import { IoHomeOutline } from "react-icons/io5";
import { TbMap2 } from "react-icons/tb";
import { FaRegHeart } from "react-icons/fa6";
import { TiPencil } from "react-icons/ti";

export const APP_NAME = "My Movie Diary";

interface SideBarItemsProps {
  title: string;
  path: string;
  icon: ElementType;
}
export const SIDEBAR_ITEMS: SideBarItemsProps[] = [
  {
    title: "홈",
    path: "home",
    icon: IoHomeOutline,
  },
  {
    title: "영화관",
    path: "cinemaMap",
    icon: TbMap2,
  },
  {
    title: "My 꿀",
    path: "myHoney",
    icon: FaRegHeart,
  },
  {
    title: "My 리뷰",
    path: "myReview",
    icon: TiPencil,
  },
];

export interface CinemaItemsProps {
  brand: string;
  si: string;
  gu: string;
  address: string;
  cinema_name: string;
  latlng: {
    lat: number;
    lng: number;
  };
}
export const CINEMA_ITEMS: CinemaItemsProps[] = [
  {
    brand: "lottecinema",
    si: "seoul",
    gu: "geumcheongu",
    cinema_name: "롯데시네마 독산",
    address: "서울특별시 금천구 독산동 291-5",
    latlng: { lat: 37.4694074108887, lng: 126.897452586655 },
  },
  {
    brand: "lottecinema",
    si: "seoul",
    gu: "geumcheongu",
    cinema_name: "롯데시네마 가산",
    address: "서울특별시 금천구 가산동 60-8",
    latlng: { lat: 37.4775821021273, lng: 126.889084447295 },
  },
  {
    brand: "lottecinema",
    si: "seoul",
    gu: "gwanakgu",
    cinema_name: "롯데시네마 서울대입구",
    address: "서울특별시 관악구 남부순환로 1820",
    latlng: { lat: 37.4809479979455, lng: 126.952083773717 },
  },
  {
    brand: "lottecinema",
    si: "seoul",
    gu: "gwanakgu",
    cinema_name: "롯데시네마 신림",
    address: "서울특별시 관악구 신림로 330",
    latlng: { lat: 37.4838513393186, lng: 126.930234545397 },
  },
  {
    brand: "megabox",
    si: "seoul",
    gu: "gangnamgu",
    cinema_name: "메가박스 강남대로(씨티)",
    address: "서울특별시 강남구 역삼동 강남대로 422",
    latlng: { lat: 37.5003941401087, lng: 127.026984908497 },
  },
  {
    brand: "megabox",
    si: "seoul",
    gu: "gangnamgu",
    cinema_name: "메가박스 코엑스",
    address: "서울특별시 강남구 봉은사로 524",
    latlng: { lat: 37.5128320848839, lng: 127.057250899584 },
  },
];

export const EMAIL_REGEX = new RegExp(
  "/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$/i"
);
