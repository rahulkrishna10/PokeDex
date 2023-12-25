import React from "react";

const ProgressBar = ({ percentage, color, title }) => {
  const clampedPercentage = Math.min(100, Math.max(0, percentage));

  return (
    <div className="relative w-full h-6 bg-gray-300 rounded">
      <div
        className={`absolute top-0 left-0 h-full ${color} rounded`}
        style={{ width: `${clampedPercentage}%` }}
      ></div>
      <div className="absolute top-0 right-0 bottom-0 left-2 text-white text-sm flex gap-2 uppercase md:hidden items-center">
        <span className="font-bold">{title}</span>{" "}
        <span>{clampedPercentage + "%"}</span>
      </div>
      <div className="absolute top-0 right-0 bottom-0 left-2 font-bold text-white text-sm hidden capitalize items-center md:flex">
        {clampedPercentage + "%"}
      </div>
    </div>
  );
};

export default ProgressBar;
