import "../styles/App.css";
import { useNavigate, Link, useLocation } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AuthService from "../services/AuthService";
import { homedir } from "os";

export const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    let isAuth = AuthService.isAuth();

    const login = () => {
        navigate('login')
    };

    const logout = () => {
        AuthService.logout();
        navigate('login')
    };

    const pageName = (): string => {
        console.log(location);
        if (location.pathname) {
            if (location.pathname.indexOf("/employees/") >= 0 && location.pathname.indexOf("/employees/new") < 0) {
                return "Employee page";
            }
            switch (location.pathname) {
                case "/home": return "Home page";
                case "/login": return "Login page";
                case "/employees": return "Employees page";
                //case "/employees/:id": return "Employee page";
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
                    {/* <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        {isAuth ? "Hi, " + localStorage.getItem("userName") + "!" : ""}
                    </Typography> */}
                    {!isAuth && (
                        <div>
                            <Link to='home' className="navLink" >
                                Home
                            </Link>
                            <Button color="inherit" onClick={login}>
                                Login
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
                            <Button color="inherit" onClick={logout}>
                                {`Logout(${localStorage.getItem("userName")})`}
                            </Button>
                        </div>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Navbar;