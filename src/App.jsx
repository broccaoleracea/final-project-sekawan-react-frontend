import { useState } from "react";
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
