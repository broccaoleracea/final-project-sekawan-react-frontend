import React from "react";
import { Link } from "react-router-dom";

const Pagination = ({ query, i, total }) => {
  const page = i;
  return (
    <div className="join">
      <Link
        to={`/search?q=${query}&page=${Math.max(page - 1, 1)}`}
        className={page <= 1 ? "disabled-links" : null}
      >
        <button className="join-item btn" disabled={page <= 1}>
          «
        </button>
      </Link>

      <button className="join-item btn">Page {page}</button>
      <Link
        to={`/search?q=${query}&page=${page + 1}`}
        className={page >= total ? "disabled-links" : null}
      >
        <button className="join-item btn" disabled={page >= total}>
          »
        </button>
      </Link>
    </div>
  );
};

export default Pagination;
