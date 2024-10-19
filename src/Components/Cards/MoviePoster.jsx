import React from "react";
import { Link } from "react-router-dom";

const MoviePoster = ({ imgUrl, title, id, mediaType }) => {
  return (
    <Link to={`/detail/${mediaType === "tv" ? "tv" : "movie"}/${id}`}>
      <div className="card max-w-36">
        <figure className="rounded-none mb-1 min-w-36 min-h-52 max-h-52">
          <img
            src={
              imgUrl
                ? `https://image.tmdb.org/t/p/w342${imgUrl}`
                : "https://usercontent.one/wp/www.vocaleurope.eu/wp-content/uploads/no-image.jpg?media=1642546813"
            }
            alt={title}
            className="object-cover shadow-xl rounded-md min-w-36 min-h-52 max-h-52"
          />
        </figure>
        <div className="card-body card-end p-0">
          <div className="tooltip" data-tip={title}>
            <h2 className="card-title text-sm line-clamp-1">{title}</h2>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MoviePoster;
