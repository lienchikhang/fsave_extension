import React from "react";
import FacebookIcon from "@mui/icons-material/Facebook";

const TitleSection: React.FC = () => {
  const handleClick = () => {
    window.open("https://www.facebook.com/khangchilien113");
  };

  return (
    <section className="flex justify-between items-center py-1 px-4 bg-slate-900">
      <h1 className="text-[22px] font-bold text-white">
        F <span className="text-blue-600">Save</span>
      </h1>
      <span className="text-white hover:cursor-pointer" onClick={handleClick}>
        <FacebookIcon />
      </span>
    </section>
  );
};

export default TitleSection;
