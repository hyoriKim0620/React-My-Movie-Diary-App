import styled from "styled-components";
import { ImQuotesLeft, ImQuotesRight } from "react-icons/im";
import { getNumberFormat } from "../../utils/numberFormat";
import { ColumnCardProps } from "./movieCard";
import { FaStar } from "react-icons/fa6";
import { getYMDFormat } from "../../utils/dayjs";
import { useEffect, useState } from "react";

const TwoColumnCard = ({
  movie_title,
  vote_average,
  vote_count,
  release_date,
}: ColumnCardProps) => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const maxContainerWidth = 1280;

  return (
    <>
      <MovieTitle
        className={`${
          maxContainerWidth <= width ? "w-[590px]" : "w-[calc((100vw/2)-40px)]"
        }`}
      >
        <ImQuotesLeft className="quotes" />
        <div className="movie-twoCard-title">{movie_title}</div>
        <ImQuotesRight className="quotes" />
      </MovieTitle>
      <div className="text-sm flex items-center justify-end py-1">
        <FaStar color={"#FFCC70"} />
        <span className="pl-1">
          {vote_average.toFixed(1)}&nbsp;
          <span className="text-xs">({getNumberFormat(vote_count)})</span>
        </span>
      </div>
      <div className="text-xs text-right text-zinc-600">
        {getYMDFormat(release_date)}
      </div>
    </>
  );
};

export default TwoColumnCard;

const MovieTitle = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: space-evenly;

  .movie-twoCard-title {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  .quotes {
    color: #8ecddd;
    font-size: 12px !important;
  }

  .movie_info_vote {
    font-size: 13px;
    padding-bottom: 3px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
  @media screen and (min-width: 1281px) {
    .movie_info_title {
      width: 600px !important;
    }
  }
`;
