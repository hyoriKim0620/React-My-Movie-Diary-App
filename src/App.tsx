import "./App.css";
import { Outlet, Route, Routes, useLocation } from "react-router";
import { useAppDispatch, useAppSelector } from "./hooks/redux";
import HomePage from "./pages/HomePage";
import CinemaMapPage from "./pages/CinemaMapPage";
import MyHoneyPage from "./pages/MyHoneyPage";
import MyReviewPage from "./pages/MyReviewPage";
import Header from "./components/Header";
import NavBar from "./components/navBar";
import SideBar from "./components/sideBar";
import { useEffect, useRef } from "react";
import { toggleSideBar } from "./store/sideBar/sideBarSlice";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DetailMovieModal from "./components/modal/DetailMovieModal";
import HoneyReviewModal from "./components/modal/HoneyReviewModal";

const Layout = () => {
  const sideBarRef = useRef<HTMLDivElement | null>(null);
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  const { isOpen } = useAppSelector((state) => state.sideBar);
  const { detailModal, honeyReviewModal } = useAppSelector(
    (state) => state.modal
  );

  useEffect(() => {
    const handleSideBarClose = (e: MouseEvent) => {
      e.preventDefault();
      const target = e.target as HTMLElement;
      const clickElementId = target.id as string;

      if (
        isOpen &&
        sideBarRef.current &&
        !sideBarRef.current.contains(target) &&
        clickElementId !== "sideBar"
      )
        dispatch(toggleSideBar(false));
    };
    document.addEventListener("click", handleSideBarClose);

    return () => document.removeEventListener("click", handleSideBarClose);
  }, [isOpen, sideBarRef]);

  return (
    <div className="relative h-[100vh]">
      {detailModal && <DetailMovieModal />}
      {honeyReviewModal && <HoneyReviewModal />}

      <Header pathname={pathname} />
      {isOpen && (
        <div id="sideBar" ref={sideBarRef}>
          <SideBar />
        </div>
      )}
      <main>
        <Outlet />
      </main>
      {pathname !== "/login" && pathname !== "/register" && <NavBar />}
    </div>
  );
};

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/cinemaMap" element={<CinemaMapPage />} />
          <Route path="/myHoney" element={<MyHoneyPage />} />
          <Route path="/myReview" element={<MyReviewPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
