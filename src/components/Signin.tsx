import "../styles/common.css";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import AuthService from "../services/AuthService";
import { useAppDispatch } from '../redux/hooks';
import { setLoaderDisplayed, setLoaderNone } from '../redux/loaderSlice';
import { toast } from 'react-toastify';

export const Signin = () => {

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const loginFieldRef = useRef<HTMLInputElement>();
    const pwdFieldRef = useRef<HTMLInputElement>();
    const [signinError, setSigninError] = useState(false);
    const [signinErrorMessage, setSigninErrorMessage] = useState("");

    const processSignin = async () => {
        dispatch(setLoaderDisplayed());
        try {
            const loginResponse = await AuthService.signin(
                loginFieldRef.current?.value ?? "",
                pwdFieldRef.current?.value ?? ""
            );
            if (loginResponse.data != null) {
                setSigninError(false);
                switch (loginResponse.data?.role ?? "") {
                    case "admin":
                        navigate("/employees", { replace: true });
                        break;
                    case "user":
                        navigate("/tasks", { replace: true });
                        break;
                    default:
                        navigate("/home", { replace: true });
                        break;
                }
            } else {
                toast.error(loginResponse.error ?? "Login failed");
                setSigninError(true);
                setSigninErrorMessage(loginResponse.error ?? "Login failed");
            }
        } finally {
            dispatch(setLoaderNone());
        }
    };

    const handleChange = (newValue: any | null) => {
        if (loginFieldRef.current?.value && pwdFieldRef.current?.value) {
            if (signinError) {
                setSigninError(false);
                setSigninErrorMessage("");
            }
        }
    };

    return (
        <Container>
            <Box style={{
                height: window.innerHeight - 200,
                padding: 0,
                margin: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
            }}>
                <div className="contentForm" style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    padding: "20px 40px"
                }}>
                    <TextField
                        id="signinTextField"
                        style={{
                            margin: "10px"
                        }}
                        error={signinError}
                        label="Name"
                        variant="outlined"
                        inputRef={loginFieldRef}
                        helperText={signinErrorMessage}
                        onChange={handleChange}
                        onKeyUp={(e) => {
                            if (e.key === 'Enter') {
                                if (loginFieldRef.current?.value && pwdFieldRef.current?.value && !signinError) {
                                    processSignin();
                                }
                            }
                        }}
                    />

                    <TextField
                        id="pwdTextField"
                        style={{
                            margin: "10px"
                        }}
                        label="Password"
                        type="password"
                        variant="outlined"
                        inputRef={pwdFieldRef}
                        error={signinError}
                        onChange={handleChange}
                        onKeyUp={(e) => {
                            if (e.key === 'Enter') {
                                if (loginFieldRef.current?.value && pwdFieldRef.current?.value && !signinError) {
                                    processSignin();
                                }
                            }
                        }}
                    />

                    <Button onClick={processSignin} variant="outlined"
                        size="large"
                        disabled={Boolean(signinError)}
                        style={{
                            margin: "10px"
                        }}>
                        Sign in
                    </Button>
                </div>
            </Box>
        </Container>
    )
}
