import React, { useEffect, useRef, useState } from "react";
import { Input, Select, SelectContainer } from "./cinema.styles";
import { IoSearch } from "react-icons/io5";
import { getSearchCinema } from "../../utils/getSearchCinema";
import { useAppDispatch } from "../../hooks/redux";
import { setSearchCinema } from "../../store/cinema/cinemaSlice";

const SelectBox = () => {
  const dispatch = useAppDispatch();
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectSi, setSelectSi] = useState("seoul");
  const [selectGu, setSelectGu] = useState("geumcheongu");
  const [selectBrand, setSelectBrand] = useState("lottecinema");
  const [inputCinemaName, setInputCinemaName] = useState("");

  useEffect(() => {
    searchCinema();
  }, []);

  const searchCinema = async () => {
    const receiveData = {
      si: selectSi,
      gu: selectGu,
      brand: selectBrand,
      cinema_name: inputCinemaName,
    };
    const matchingCinema = await getSearchCinema(receiveData);
    dispatch(setSearchCinema(matchingCinema));
    setInputCinemaName("");
  };

  const handleEnterKeyPress = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      searchCinema();
    }
  };

  return (
    <SelectContainer>
      <div className="select_box">
        <Select
          value={selectSi}
          onChange={(e) => setSelectSi(e.target.value)}
          disabled
        >
          <option value="seoul">서울</option>
        </Select>
        <Select value={selectGu} onChange={(e) => setSelectGu(e.target.value)}>
          <option value="geumcheongu">금천구</option>
          <option value="gwanakgu">관악구</option>
          <option value="gangnamgu">강남구</option>
        </Select>
        <Select
          value={selectBrand}
          onChange={(e) => setSelectBrand(e.target.value)}
        >
          <option value="lottecinema">롯데시네마</option>
          <option value="cgv">CGV</option>
          <option value="megabox">메가박스</option>
        </Select>
      </div>
      <div className="search_box">
        <Input
          ref={inputRef}
          type="text"
          placeholder="영화관 지점명을 입력해주세요."
          onKeyDown={handleEnterKeyPress}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setInputCinemaName(e.target.value)
          }
          value={inputCinemaName}
        />
        <IoSearch size={30} onClick={() => searchCinema()} />
      </div>
    </SelectContainer>
  );
};

export default SelectBox;
