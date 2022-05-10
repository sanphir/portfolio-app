import "./styles/App.css";
import 'react-toastify/dist/ReactToastify.css'
import { Outlet } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import Loader from "./components/Loader";
import { useAppSelector } from './redux/hooks';
import { getLoaderDisplayed } from "./redux/loaderSlice";
import { ToastContainer } from 'react-toastify';

function App() {

  const loaderDisplayed = useAppSelector(getLoaderDisplayed);
  return (
    <>
      <Loader isDisplayed={loaderDisplayed} />
      <Navbar />
      <Outlet />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default App;
