import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTheme } from "./Store/Action/movieAction";

const useTheme = () => {
  const theme = useSelector((state) => state.theme.theme);
  const dispatch = useDispatch();

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      dispatch(setTheme(storedTheme));
    } else {
      dispatch(setTheme("light"));
    }
  }, [dispatch]);

  useEffect(() => {
    if (theme) {
      document.documentElement.setAttribute("data-theme", theme);
      localStorage.setItem("theme", theme);
    }
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    dispatch(setTheme(newTheme));
  };

  return { theme, toggleTheme };
};

export default useTheme;
