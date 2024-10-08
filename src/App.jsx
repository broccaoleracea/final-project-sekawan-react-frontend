import { useState } from "react";
import "./App.css";
import MovieFetcher from "./Components/Fetchers/Fetcher";
import { Navbar } from "./Components/Navbar";

function App() {
  const [count, setCount] = useState();

  return (
    <>
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
          </ul>
        </div>
      </div>
    </>
  );
}

export default App;
