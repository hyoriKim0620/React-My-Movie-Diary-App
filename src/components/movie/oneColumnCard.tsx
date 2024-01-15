import { ColumnCardProps } from "./movieCard";
import { ImQuotesLeft, ImQuotesRight } from "react-icons/im";
import { FaStar } from "react-icons/fa6";
import { getYMDFormat } from "../../utils/dayjs";
import styled from "styled-components";
import { getNumberFormat } from "../../utils/numberFormat";

const oneColumnCard = ({
  movie_title,
  vote_average,
  vote_count,
  release_date,
}: ColumnCardProps) => {
  return (
    <>
      <MovieTitleAndVote>
        <div className="w-[calc((100vw / 2 + (100vw / 2 / 6)))] flex align-stretch">
          <ImQuotesLeft className="quotes" />
          <div className="movie-oneCard-title">{movie_title}</div>
          <ImQuotesRight className="quotes" />
        </div>
        <div className="flex text-sm">
          <FaStar color={"#FFCC70"} />
          <span className="pl-1">
            {vote_average.toFixed(1)}&nbsp;
            <span className="text-xs">({getNumberFormat(vote_count)})</span>
          </span>
        </div>
      </MovieTitleAndVote>

      <div className="text-xs text-right text-zinc-600">
        {getYMDFormat(release_date)}
      </div>
    </>
  );
};

export default oneColumnCard;

const MovieTitleAndVote = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  .movie-oneCard-title {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    padding: 0 10px;
  }

  .quotes {
    color: #8ecddd;
    font-size: 12px !important;
  }
`;
