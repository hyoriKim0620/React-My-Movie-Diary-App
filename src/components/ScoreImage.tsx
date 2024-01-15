import React from "react";

type scoreProps = {
  score: number;
};

const ScoreImage: React.FC<scoreProps> = ({ score }) => {
  const renderImages = () => {
    const image = [];

    for (let i = 1; i <= 5; i++) {
      const isColored = i <= score;

      if (isColored) {
        image.push(
          <img
            key={i}
            src={isColored ? "bg_honey.png" : "honey.png"}
            width={60}
            height={70}
            alt={`Score ${i}`}
          />
        );
      } else {
        image.push(<div key={i} className="w-[60px]"></div>);
      }
    }
    return image;
  };

  return <>{renderImages()}</>;
};

export default ScoreImage;
