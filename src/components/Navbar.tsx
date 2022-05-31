import "../styles/App.css";
import { useNavigate, Link, useLocation } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AuthService from "../services/AuthService";

export const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const tokenInfo = AuthService.getTokenInfo();
    const isAuth = AuthService.isAuth();
    const isAdmin = (tokenInfo?.role ?? "") === "admin";

    const siginClick = () => {
        navigate('signin');
    };

    const signoutClick = () => {
        AuthService.signout();
    };

    const pageName = (): string => {
        //console.log(location);
        if (location.pathname) {
            if (location.pathname.indexOf("/employees/") >= 0 && location.pathname.indexOf("/employees/new") < 0) {
                return "Employee page";
            }
            switch (location.pathname) {
                case "/home":
                case "/":
                    return "Home page";
                case "/signin": return "Sign in page";
                case "/employees": return "Employees page";
                case "/employees/new": return "New employee page";
                case "/tasks": return "Tasks";
                case "/notfound": return "Not found page";
                default: return "";
            }
        }
        return "";
    }
    //console.log(`isAuth=${isAuth}`);
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{ backgroundColor: "#457d7d" }}>
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
                            {isAdmin &&
                                <Link to='employees' className="navLink" >
                                    Employees
                                </Link>
                            }
                            <Link to='tasks' className="navLink" >
                                Tasks
                            </Link>
                            <Button color="inherit" onClick={signoutClick}>
                                {`Sign out(${tokenInfo?.name})`}
                            </Button>
                        </div>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Navbar;