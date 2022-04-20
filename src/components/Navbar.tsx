import "../styles/App.css";
import { useNavigate, Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AuthService from "../services/AuthService";

export const Navbar = () => {
    const navigate = useNavigate();
    let isAuth = AuthService.isAuth();

    const login = () => {
        console.log("navigatet login");
        navigate('login')
        console.log("navigatet login");
    };

    const logout = () => {
        AuthService.logout();
        navigate('login')
        console.log("navigatet logout");
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        DemoWebApp
                    </Typography>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        {isAuth ? "Hi, " + localStorage.getItem("userName") + "!" : ""}
                    </Typography>
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
                                Logout
                            </Button>
                        </div>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Navbar;