import "./styles/App.css";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import Loader from "./components/Loader";
import { useAppSelector, useAppDispatch } from './redux/hooks';
import { getLoaderDisplayed } from "./redux/loaderSlice";

function App() {

  const loaderDisplayed = useAppSelector(getLoaderDisplayed);
  return (
    <div>
      <Loader isDisplayed={loaderDisplayed} />
      <Navbar />
      <Outlet />
    </div>
  );
}

export default App;
