import React from "react";
import { Link } from "react-router-dom";

const MoviePoster = ({ imgUrl, title, id, mediaType }) => {
  return (
    <Link to={`/detail/${mediaType === "tv" ? "tv" : "movie"}/${id}`}>
      <div className="card max-w-36">
        <figure>
          <img
            src={`https://image.tmdb.org/t/p/w500${imgUrl}`}
            alt={title}
            className="object-cover min-w-36 min-h-52 shadow-xl rounded-md"
          />
        </figure>
        <div className="card-body card-end p-0">
          <h2 className="card-title text-sm line-clamp-1">{title}</h2>
        </div>
      </div>
    </Link>
  );
};

export default MoviePoster;
