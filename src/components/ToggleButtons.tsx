import { ToggleContainer } from "./styles";
import { PiSquareSplitHorizontal } from "react-icons/pi";
import { PiSquareSplitVertical } from "react-icons/pi";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { toggleMovieOrdering } from "../store/movie/movieSlice";
import styled from "styled-components";

type ToggleButtonProps = {
  $checked: boolean;
};

type LeftToggleButtonProps = ToggleButtonProps & {
  $left: boolean;
};

type RightToggleButtonProps = ToggleButtonProps & {
  $right: boolean;
};

const ToggleButtons = () => {
  const dispatch = useAppDispatch();
  const { isSmall } = useAppSelector((state) => state.movie);

  return (
    <>
      <ToggleContainer>
        <LeftToggleButton
          $left
          $checked={isSmall}
          onClick={() => dispatch(toggleMovieOrdering(true))}
        >
          <PiSquareSplitHorizontal size={24} />
        </LeftToggleButton>
        <RightToggleButton
          $right
          $checked={isSmall}
          onClick={() => dispatch(toggleMovieOrdering(false))}
        >
          <PiSquareSplitVertical size={24} />
        </RightToggleButton>
      </ToggleContainer>
    </>
  );
};

export default ToggleButtons;

const ToggleButton = styled.button<ToggleButtonProps>`
  flex: 1;
  text-align: center;
  cursor: pointer;
  padding: 2px 10px;
  border: none;
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #fff78a;
`;

const LeftToggleButton = styled(ToggleButton)<LeftToggleButtonProps>`
  border-radius: 5px 0px 0px 5px;
  ${(props) =>
    props.$left &&
    `background-color: ${props.$checked ? "#FFCC70" : "#fff"}; color: ${
      props.$checked ? "#fff" : "#FFCC70"
    };`}
`;

const RightToggleButton = styled(ToggleButton)<RightToggleButtonProps>`
  border-radius: 0px 5px 5px 0px;
  ${(props) =>
    props.$right &&
    `background-color: ${props.$checked ? "#fff" : "#FFCC70"};color: ${
      props.$checked ? "#FFCC70" : "#fff"
    };`}
`;
