import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../hooks/redux";
import { setSelectMenu } from "../../store/sideBar/sideBarSlice";

const MyReviewPage = () => {
  const dispatch = useAppDispatch();
  const { selectMenu } = useAppSelector((state) => state.sideBar);

  useEffect(() => {
    if (selectMenu !== "myReview") {
      dispatch(setSelectMenu("myReview"));
    }
  }, []);

  return <div>MyReviewPage</div>;
};

export default MyReviewPage;
