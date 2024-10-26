import { Link } from "react-router-dom";
import useTheme from "./useTheme";
import UserFetcher from "./Fetchers/userFetcher";
import { useSelector } from "react-redux";
import DeleteSession from "./Login/DeleteSession";

const DrawerSide = () => {
  const { theme, toggleTheme } = useTheme();
  const user = useSelector((state) => state.user.user);
  const loading = useSelector((state) => state.loading.loading);
  return (
    <div className="drawer-side pr-0 z-[100]">
      <UserFetcher />
      <label
        htmlFor="my-drawer"
        aria-label="close sidebar"
        className="drawer-overlay"
      ></label>
      <ul className="menu bg-base-200 text-base-content min-h-full w-80 ">
        <div className="w-full">
          <li>
            <Link to="/">
              <a className="flex gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                Home
              </a>
            </Link>
          </li>
          {user ? (
            <>
              <li className="menu-title text-left">My Account</li>
              <li>
                <Link to={`/u/${user?.id}/lists`}>
                  <a className="flex gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="8" y1="6" x2="21" y2="6"></line>
                      <line x1="8" y1="12" x2="21" y2="12"></line>
                      <line x1="8" y1="18" x2="21" y2="18"></line>
                      <line x1="3" y1="6" x2="3.01" y2="6"></line>
                      <line x1="3" y1="12" x2="3.01" y2="12"></line>
                      <line x1="3" y1="18" x2="3.01" y2="18"></line>
                    </svg>
                    Lists
                  </a>
                </Link>
              </li>
              <li>
                <Link to={`/u/${user.id}/rated`}>
                  <a className="flex gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                    </svg>
                    Rated
                  </a>
                </Link>
              </li>
            </>
          ) : null}

          <label className="flex cursor-pointer gap-2 m-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="5" />
              <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
            </svg>
            <input
              type="checkbox"
              value="sunset"
              onChange={toggleTheme}
              checked={theme === "light" ? false : true}
              className="toggle theme-controller"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
          </label>
          <div className="flex w-full gap-3 m-3">
            <div className="avatar self-center justify-center">
              <div
                className={`w-12 rounded-full ${loading ? " skeleton" : null}`}
              >
                <img
                  src={
                    user?.avatar?.tmdb?.avatar_path
                      ? `https://image.tmdb.org/t/p/w185${user?.avatar?.tmdb?.avatar_path}`
                      : "https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg"
                  }
                />
              </div>
            </div>

            {loading ? (
              <div className="skeleton h-4 w-full"></div>
            ) : (
              <div className="w-full text-left">
                <p className="font-medium text-lg">
                  {user ? user?.username : "Guest"}
                </p>
                {user ? (
                  <DeleteSession />
                ) : (
                  <Link to="/auth" className="text-slate-700 underline">
                    Log in
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </ul>
    </div>
  );
};

export default DrawerSide;
