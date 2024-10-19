import React from "react";
import { Link } from "react-router-dom";

const MovieCardHorizontal = ({ id, posterUrl, title, itemCount, desc }) => {
  return (
    <Link to={`/list/${id}`}>
      <div className="card card-compact card-side bg-base-100 shadow-xl">
        <figure>
          <img
            src={`https://image.tmdb.org/t/p/w500${posterUrl}`}
            alt={title}
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{title}</h2>
          <p className="text-left">
            {desc === "" ? (
              <span className="italic text-slate-600">
                No description provided.
              </span>
            ) : (
              desc
            )}
          </p>
          <p className="text-slate-600 text-left">{itemCount} items </p>
          {/* <div className="card-actions justify-end">
            <button className="btn btn-primary">Watch</button>
          </div> */}
        </div>
      </div>
    </Link>
  );
};

export default MovieCardHorizontal;
