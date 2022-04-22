import "../styles/App.css";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { clearToken, getTokenInfo } from '../redux/authSlice';
import { isAuthenticated } from "../helpers/authChecker";

export const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const tokenInfo = useAppSelector(getTokenInfo);
    const dispatch = useAppDispatch();
    let isAuth = isAuthenticated(tokenInfo);

    const siginClick = () => {
        navigate('signin');
    };

    const signoutClick = () => {
        dispatch(clearToken());
        navigate('signin')
    };

    const pageName = (): string => {
        console.log(location);
        if (location.pathname) {
            if (location.pathname.indexOf("/employees/") >= 0 && location.pathname.indexOf("/employees/new") < 0) {
                return "Employee page";
            }
            switch (location.pathname) {
                case "/home": return "Home page";
                case "/signin": return "Sig in page";
                case "/employees": return "Employees page";
                case "/employees/new": return "New employee page";
                case "/notfound": return "Not found page";
                default: return "";
            }
        }
        return "";
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        {pageName()}
                    </Typography>
                    {!isAuth && (
                        <div>
                            <Link to='home' className="navLink" >
                                Home
                            </Link>
                            <Button color="inherit" onClick={siginClick}>
                                Sign in
                            </Button>
                        </div>
                    )}
                    {isAuth && (
                        <div>
                            <Link to='home' className="navLink"  >
                                Home
                            </Link>
                            <Link to='employees' className="navLink" >
                                Employees
                            </Link>
                            <Button color="inherit" onClick={signoutClick}>
                                {`Sign out(${localStorage.getItem("userName")})`}
                            </Button>
                        </div>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Navbar;