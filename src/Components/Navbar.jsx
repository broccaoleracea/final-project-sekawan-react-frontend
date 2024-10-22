import { Link } from "react-router-dom";
import SearchBar from "./Searchbar";
import useTheme from "./useTheme";
import { useSelector } from "react-redux";

export const Navbar = () => {
  const theme = useSelector((state) => state.theme.theme);
  const user = useSelector((state) => state.user.user);

  console.log("Current Theme:", theme); // Check theme value
  return (
    <>
      <div className="navbar bg-base-100">
        <div className="flex-none mr-1">
          <label
            htmlFor="my-drawer"
            className="btn btn-square btn-ghost drawer-button my-drawer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block h-5 w-5 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </label>
        </div>
        <div className="flex-1">
          <Link to="/">
            <a className="btn btn-ghost text-xl text-nowrap">
              Nightflix at 25:00
            </a>
          </Link>
        </div>
        <div className="flex-none">
          <SearchBar />
        </div>
      </div>
      {!user ? (
        <div
          className={`w-full p-1 border 
        ${
          theme === "light"
            ? "bg-sky-200 border-sky-200 border-b-sky-400"
            : "bg-sky-950 border-sky-950 border-b-sky-700"
        }`}
        >
          <p className="text-center">
            You're not logged in to TMDB. Please{" "}
            <Link to="/auth" className="underline">
              log in
            </Link>{" "}
            for the best user experience.
          </p>
        </div>
      ) : null}
    </>
  );
};
