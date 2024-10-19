import { useEffect, useReducer } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const initialState = {
  searchTerm: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_SEARCH_TERM":
      return { ...state, searchTerm: action.payload };
    case "CLEAR_SEARCH_TERM":
      return { ...state, searchTerm: "" };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

const SearchBar = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (state.searchTerm.trim()) {
      const timerId = setTimeout(() => {
        navigate(`/search?q=${state.searchTerm}`);
      }, 500);

      return () => clearTimeout(timerId);
    }
  }, [state.searchTerm, navigate, location.pathname]);

  useEffect(() => {
    if (location.pathname !== "/search") {
      dispatch({ type: "CLEAR_SEARCH_TERM" });
    }
  }, [location.pathname]);

  const handleInputChange = (e) => {
    dispatch({ type: "SET_SEARCH_TERM", payload: e.target.value });
  };

  return (
    <label className="input input-bordered flex items-center gap-2">
      <form action="/search" method="get">
        <div className="flex row-1 items-center">
          <input
            type="text"
            className="grow"
            value={state.searchTerm}
            onChange={handleInputChange}
            // onSubmit={event.preventDefault()}
            placeholder="Search.."
            name="q"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70 align-right"
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </form>
    </label>
  );
};

export default SearchBar;
