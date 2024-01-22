import styled from "styled-components";

export const MovieCardContainer = styled.div`
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  padding: 0 5px 10px 5px;
`;

export const MovieCardItem = styled.div`
  width: 100%;
  height: 100%;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 15px 15px 15px 15px;
  overflow: hidden;

  .header {
    display: flex;
    justify-content: space-between;
    padding-bottom: 5px;
    div {
      display: flex;
      justify-content: flex-end;
      gap: 8px;
    }
  }
`;

export const AdultBadge = styled.span`
  background: #e74242;
  color: #fff;
  width: 24px;
  height: 24px;
  border-radius: 50%;
`;

export const MovieImg = styled.div`
  flex-grow: 1;
  position: relative;
  background-size: cover;
  z-index: 0;

  .main_image {
    .main_image_w50 {
      width: 50%;
    }
    .main_image_w100 {
      width: 100%;
    }
  }

  .blur_image {
    border-radius: 0 0 15px 15px;
  }

  &.oneRowTwoColumnImage {
    img {
      height: 100%;
      object-fit: contain;
      display: inline-block;
      content: "";
    }
    .blur_image {
      width: 100%;
      z-index: -1;
      object-fit: cover;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      filter: blur(1px);
      pointer-events: none;
      backdrop-filter: blur(2px);
    }
  }
  &.oneRowOneColumnImage {
    img {
      width: 50%;
      height: 100%;
      display: inline-block;
      content: "";
    }
    .blur_image {
      width: 100%;
      height: 100%;
      z-index: -1;
      object-fit: cover;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      filter: blur(1px);
      pointer-events: none;
      backdrop-filter: blur(2px);
    }
  }

  @media screen and (min-width: 651px) {
    img {
      width: 50%;
      border-radius: 0;
    }
    .main_image {
      &:hover {
        scale: 1.1;
      }
    }
    &.oneRowTwoColumnImage {
      .blur_image {
        width: 100%;
      }
    }
  }
`;
