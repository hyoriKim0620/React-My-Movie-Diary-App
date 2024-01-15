import useHoneyMovie, { User } from "../hooks/honeyMovie";
import { FaRegHeart } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";

interface HoneyHeartButtonProps {
  movieId: string;
  currentUser: User;
}

const HoneyHeartButton = ({ movieId, currentUser }: HoneyHeartButtonProps) => {
  const { hasHoneyMovie, toggleHoneyHeart } = useHoneyMovie({
    movieId,
    currentUser,
  });

  return (
    <div
      onClick={toggleHoneyHeart}
      className="relative transition cursor-pointer hover:opacity-80"
    >
      <FaRegHeart
        size={20}
        color={"#FFE382"}
        className="#FFE382 absolute -right-[1px]"
      />
      <FaHeart
        size={18}
        className={hasHoneyMovie ? "fill-yellow-300" : "fill-white"}
      />
    </div>
  );
};

export default HoneyHeartButton;
