import { useEffect } from "react";
import { Container } from "./cinema.styles";
import SelectBox from "./selectBox";
import KakaoMap from "./KakaoMap";
import { setSelectMenu } from "../../store/sideBar/sideBarSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";

const CinemaMapPage = () => {
  const { selectMenu } = useAppSelector((state) => state.sideBar);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (selectMenu !== "cinemaMap") {
      dispatch(setSelectMenu("cinemaMap"));
    }
  }, []);

  return (
    <Container>
      <div className="h-[10%] p-2">
        <SelectBox />
      </div>
      <div style={{ flexGrow: 1 }}>
        <KakaoMap />
      </div>
    </Container>
  );
};

export default CinemaMapPage;
