import { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import AuthService from "../services/AuthService";

export enum UserRole {
    Admin = "admin",
    User = "user",
    Any = "any"
}

export function RequireAuth({ children, role }: { children: JSX.Element, role: UserRole }) {
    console.log(`RequireAuth=${role}`);
    const location = useLocation();
    const navigate = useNavigate();
    const tokenInfo = AuthService.getTokenInfo();
    const [isAuth, setIsAuth] = useState(AuthService.isAuth());

    useEffect(() => {
        if (isAuth && AuthService.needRefreshToken() && !AuthService.refreshinTokenStarted) {
            AuthService.refreshToken().then((response) => {
                if (response.error) {
                    AuthService.signout();
                    navigate('signin');
                }
                if (isAuth !== AuthService.isAuth()) {
                    setIsAuth(AuthService.isAuth());
                }
            })
        }
        return () => { }
    }, []);

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
                return userRole === UserRole.Admin
                    ? children : <Navigate to="/denied" state={{ from: location.pathname }} replace />;
            case UserRole.User:
                return (userRole === UserRole.Admin || userRole === UserRole.User)
                    ? children : <Navigate to="/denied" state={{ from: location.pathname }} replace />;
            case UserRole.Any:
                return children;
            default:
                return <Navigate to="/denied" state={{ from: location.pathname }} replace />;
        }
    }
}
