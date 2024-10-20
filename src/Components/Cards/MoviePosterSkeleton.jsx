import React from "react";

const MoviePosterSkeleton = ({ key }) => {
  return (
    <div key={key} className="flex w-full flex-col gap-4">
      <div className="skeleton h-64 mb-1 w-full"></div>
      <div className="skeleton h-4 w-28"></div>
    </div>
  );
};

export default MoviePosterSkeleton;
