import { useEffect, useState } from "react";
import "./App.css";
import MovieFetcher from "./Components/Fetchers/Fetcher";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Navbar } from "./Components/Navbar";
import store from "./Components/Store/store";
import { Provider } from "react-redux";
import Homepage from "./Pages/Main/Homepage";
import Details from "./Pages/Main/Details";

function App() {
  const [count, setCount] = useState();
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  );

  // update state on toggle
  const handleToggle = (e) => {
    if (e.target.checked) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  // set theme state in localstorage on mount & also update localstorage on state change
  useEffect(() => {
    localStorage.setItem("theme", theme);
    const localTheme = localStorage.getItem("theme");
    // add custom data-theme attribute to html tag required to update theme using DaisyUI
    document.querySelector("html").setAttribute("data-theme", localTheme);
  }, [theme]);

  return (
    <>
      <BrowserRouter>
        <Provider store={store}>
          <div className="drawer">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
              <Navbar />
              <MovieFetcher onFetch={setCount} />
            </div>
            <div className="drawer-side pr-0">
              <label
                htmlFor="my-drawer"
                aria-label="close sidebar"
                className="drawer-overlay"
              ></label>
              <ul className="menu bg-base-200 text-base-content min-h-full w-80 ">
                <li>
                  <a>Sidebar Item 1</a>
                </li>
                <li>
                  <a>Sidebar Item 2</a>
                </li>
                <label className="flex cursor-pointer gap-2">
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
                    onChange={handleToggle}
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
              </ul>
            </div>
          </div>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/detail/:mediaType/:id" element={<Details />} />
            {/*<Route path="/search" element={<Search />} />
        <Route path="/category/:category" element={<Category />} />
        <Route path="/lists" element={<Lists />} />
        <Route path="/lists/:id" element={<ListItemsView />} />
        <Route path="/*" element={<Homepage />} /> */}
          </Routes>
        </Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
