import React from "react";
import { Link } from "react-router-dom";

const MovieCardHorizontal = ({
  loadingState,
  id,
  posterUrl,
  title,
  itemCount,
  desc,
}) => {
  return (
    <Link to={`/list/${id}`}>
      <div
        className={`card card-compact card-side  shadow-xl text-left ${
          loadingState ? " skeleton" : " bg-base-100"
        }`}
      >
        {posterUrl ? (
          <figure className="max-w-28">
            <img
              src={`https://image.tmdb.org/t/p/w500${posterUrl}`}
              alt={title}
            />
          </figure>
        ) : null}
        <div className="card-body">
          {loadingState ? (
            <div className="skeleton h-4 w-full"></div>
          ) : (
            <h2 className="card-title">{title}</h2>
          )}
          {loadingState ? (
            <div className="skeleton h-4 w-full"></div>
          ) : (
            <p className="">
              {desc === "" ? (
                <span className="italic text-slate-600">
                  No description provided.
                </span>
              ) : (
                desc
              )}
            </p>
          )}

          {loadingState ? (
            <div className="skeleton h-4 w-28"></div>
          ) : (
            <p className="text-slate-600 ">{itemCount} items </p>
          )}
          {/* <div className="card-actions justify-end">
            <button className="btn btn-primary">Watch</button>
          </div> */}
        </div>
      </div>
    </Link>
  );
};

export default MovieCardHorizontal;
