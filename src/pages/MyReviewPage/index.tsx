import { ChangeEvent, useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../hooks/redux";
import { setSelectMenu } from "../../store/sideBar/sideBarSlice";
import { IoSearch } from "react-icons/io5";
import EmptyState from "../../components/EmptyState";
import {
  Box,
  Container,
  Header,
  ItemBox,
  Input,
  ReviewButton,
} from "./myReviewPage.styles";
import { ReviewProps, setMyReview } from "../../store/user/userSlice";
import { GetMyReview } from "./../../utils/LocalStorageApi";
import ScoreImage from "../../components/ScoreImage";
import ConfirmModal from "../../components/modal/ConfirmModal";
import {
  setReviewModalType,
  toggleHoneyReviewModal,
} from "../../store/modal/modalSlice";
import { setWriteReviewMovie } from "../../store/movie/movieSlice";

const MyReviewPage = () => {
  const dispatch = useAppDispatch();
  const { selectMenu } = useAppSelector((state) => state.sideBar);
  const { myReview } = useAppSelector((state) => state.user);
  const [searchValue, setSearchValue] = useState("");
  const initialReview: ReviewProps[] = myReview ? myReview : [];
  const [searchReviews, setSearchReviews] = useState(initialReview);
  const [alertModal, setAlertModal] = useState(false);
  const [deleteReviewId, setDeleteReviewId] = useState("");

  useEffect(() => {
    if (selectMenu !== "myReview") {
      dispatch(setSelectMenu("myReview"));
    }
    setMyReviewLocal();
  }, []);

  useEffect(() => {
    filterReviews();
  }, [myReview]);

  const setMyReviewLocal = () => {
    const myReviews = GetMyReview();

    dispatch(setMyReview(myReviews));
    filterReviews();
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const filterReviews = () => {
    let newArray = [...myReview];
    newArray = newArray.filter(
      (review) =>
        review.title?.includes(searchValue) ||
        review.name?.includes(searchValue)
    );
    setSearchReviews(newArray);
  };

  const handleEnterKeyPress = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      filterReviews();
    }
  };

  const handleEditReview = (review: ReviewProps) => {
    dispatch(setWriteReviewMovie(review));
    dispatch(toggleHoneyReviewModal(true));
    dispatch(setReviewModalType("edit"));
  };

  const handleDeleteReview = (reviewId: string) => {
    setDeleteReviewId(reviewId);
    setAlertModal(true);
  };

  if (myReview.length > 0) {
    return (
      <Container>
        {alertModal && (
          <ConfirmModal
            confirm={true}
            text={`삭제하시겠습니까 ?`}
            reviewId={deleteReviewId}
            setAlertModal={setAlertModal}
          />
        )}
        <Header>
          <div className="search_header">
            <Input
              type="text"
              placeholder="영화명을 입력해주세요."
              onKeyDown={handleEnterKeyPress}
              onChange={(e) => handleChange(e)}
              value={searchValue}
            />
            <IoSearch size={26} onClick={() => filterReviews()} />
          </div>
        </Header>
        <Box>
          {searchReviews.map((review, i) => (
            <ItemBox
              key={i}
              style={{
                backgroundImage: `url('https://images.tmdb.org/t/p/w500/${
                  review.backdrop_path || review.poster_path
                }'`,
              }}
            >
              <div className="text-sm text-left font-extrabold">
                <span
                  className="bg-slate-100 px-2"
                  style={{ borderRadius: "4px 0 4px 0" }}
                >
                  {review.title || review.name}
                </span>
              </div>
              <div className="flex h-[35%] my-2">
                <ScoreImage score={review.score} />
              </div>
              <div className="pt-3 flex items-center justify-between">
                <span className="font-bold text-white">
                  {review.watch_date}
                </span>
                <div>
                  <ReviewButton
                    className={`review_edit`}
                    onClick={() => handleEditReview(review)}
                  >
                    수정
                  </ReviewButton>
                  <ReviewButton
                    className={`review_del`}
                    onClick={() => handleDeleteReview(review.reviewId)}
                  >
                    삭제
                  </ReviewButton>
                </div>
              </div>
            </ItemBox>
          ))}
        </Box>
      </Container>
    );
  } else {
    return (
      <EmptyState
        title="작성된 My 리뷰가 없습니다."
        sub_title="리뷰를 추가해주세요."
      />
    );
  }
};

export default MyReviewPage;
