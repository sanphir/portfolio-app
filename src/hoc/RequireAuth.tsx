import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from '../redux/hooks';
import { getTokenInfo } from '../redux/authSlice';
//import { isAuthenticated } from "../helpers/authChecker";
import AuthService from "../services/AuthService";

export enum UserRole {
    Admin = "admin",
    User = "user",
    Any = "any"
}

export function RequireAuth({ children, role }: { children: JSX.Element, role: UserRole }) {
    console.log(`RequireAuth=${role}`);
    let location = useLocation();
    //const tokenInfo = useAppSelector(getTokenInfo);
    const tokenInfo = AuthService.getTokenInfo();
    let isAuth = AuthService.isAuth();

    if (!isAuth) {
        console.log("not auth");
        // Redirect them to the /login page, but save the current location they were
        // trying to go to when they were redirected. This allows us to send them
        // along to that page after they login, which is a nicer user experience
        // than dropping them off on the home page.
        return <Navigate to="/signin" state={{ from: location.pathname }} replace />;
    } else {
        let userRole = UserRole.User;
        switch (tokenInfo?.role ?? "".toLowerCase()) {
            case "admin": userRole = UserRole.Admin;
                break;
            case "user": userRole = UserRole.User;
                break;
            default:
                return <Navigate to="/denied" state={{ from: location.pathname }} replace />;
        }
        console.log(`userRole=${userRole}`);
        switch (role) {
            case UserRole.Admin:
                console.log("switch admin");
                return userRole === UserRole.Admin
                    ? children : <Navigate to="/denied" state={{ from: location.pathname }} replace />;
            case UserRole.User:
                console.log("switch user");
                return (userRole === UserRole.Admin || userRole === UserRole.User)
                    ? children : <Navigate to="/denied" state={{ from: location.pathname }} replace />;
            case UserRole.Any:
                console.log("switch any");
                return children;
            default:
                console.log("switch default");
                return <Navigate to="/denied" state={{ from: location.pathname }} replace />;
        }
    }
}
