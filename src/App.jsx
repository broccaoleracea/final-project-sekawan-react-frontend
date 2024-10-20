import "./App.css";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { Navbar } from "./Components/Navbar";
import store from "./Components/Store/store";
import { Provider } from "react-redux";
import Homepage from "./Pages/Main/Homepage";
import Details from "./Pages/Movie/Details";
import SearchPage from "./Pages/Main/SearchPage";
import MyLists from "./Pages/Lists/MyLists";
import ListDetail from "./Pages/Lists/ListDetail";
import TestPage from "./Pages/TestPage";
import DrawerSide from "./Components/DrawerSide";
import AuthTMDB from "./Pages/AuthTMDB";

function App() {
  return (
    <>
      <BrowserRouter>
        <Provider store={store}>
          <div className="drawer">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
              <Navbar />
            </div>
            <DrawerSide />
          </div>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/detail/:mediaType/:id" element={<Details />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/auth" element={<AuthTMDB />} />
            <Route path="/list/me" element={<MyLists />} />
            <Route path="/list/:id" element={<ListDetail />} />
            <Route path="/*" element={<Homepage />} />
            <Route path="/testpage" element={<TestPage />} />
          </Routes>
        </Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
