import React from "react";
import { Link } from "react-router-dom";

const PersonCard = ({ imgUrl, name, id }) => {
  return (
    <div>
      <Link to={`/detail/person/${id}`}>
        <div className="card w-full">
          <div className="h-64 flex mb-1 justify-center">
            <div className="avatar self-center justify-center  p-3">
              <div className="w-full rounded-full">
                <img
                  src={
                    imgUrl
                      ? `https://image.tmdb.org/t/p/w185${imgUrl}`
                      : "https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg"
                  }
                />
              </div>
            </div>
          </div>
          <div className="card-body card-end p-0">
            <div className="tooltip" data-tip={name}>
              <h2 className="card-title text-sm line-clamp-1">{name}</h2>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PersonCard;
