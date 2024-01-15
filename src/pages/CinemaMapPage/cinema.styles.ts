import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  border-top: 1px solid #ddd;
`;

export const SelectContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 13px;

  .select_box {
    display: flex;
    gap: 0.5em;
    padding-bottom: 5px;
  }
  .search_box {
    display: flex;
    justify-content: space-between;
    border: 2px solid #ffcc70;
    border-radius: 4px;
    svg {
      cursor: pointer;
      padding: 0 4px;
    }
  }
`;

export const Select = styled.select`
  width: 100%;
  border-radius: 4px;
  border: 2px solid #ffcc70;

  option {
    width: 100% !important;
  }

  option:checked {
    background-color: #fff78a;
  }
`;

export const Input = styled.input`
  width: 100%;
`;

export const MapContainer = styled.div`
  width: 100%;
  height: 100%;
  background: #fff78a;
  display: flex;
  flex-direction: column;
  justify-content: center;

  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 14px;
    gap: 0.5rem;
  }
`;
