import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import AuthService from "../services/AuthService";

export const Login = () => {
    const navigate = useNavigate();
    const loginFieldRef = useRef<HTMLInputElement>();
    const pwdFieldRef = useRef<HTMLInputElement>();
    const [loginError, setLoginError] = useState(false);
    const [loginDisabled, setLoginDisabled] = useState(true);
    const [loginErrorMessage, setLoginErrorMessage] = useState("");

    const login = async () => {

        const loginResponse = await AuthService.login(
            loginFieldRef.current?.value ?? "",
            pwdFieldRef.current?.value ?? ""
        );
        if (loginResponse.data != null) {
            console.log(loginResponse.data);
            console.log("accessToken=" + loginResponse.data.accessToken);
            console.log("userName=" + loginResponse.data.userName);
            console.log("validTo=" + loginResponse.data.validTo);
            console.log("role=" + loginResponse.data.role);
            setLoginError(false);

            navigate("/employees", { replace: true });
            console.log("Navigate to employee/list");
        } else {
            setLoginError(true);
            setLoginErrorMessage(loginResponse.error ?? "Login failed");
            setLoginDisabled(true);
        }
    };

    const handleChange = (newValue: any | null) => {
        if (loginFieldRef.current?.value && pwdFieldRef.current?.value) {
            if (loginError) {
                setLoginError(false);
                setLoginErrorMessage("");
            }
            setLoginDisabled(false);
        }
    };

    return (
        <Container>
            <Box style={{
                height: window.innerHeight - 60,
                padding: 0,
                margin: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
            }}>
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center"
                }}>
                    <TextField
                        id="loginTextField"
                        style={{
                            margin: "10px"
                        }}
                        error={loginError}
                        label="Login name"
                        variant="outlined"
                        inputRef={loginFieldRef}
                        helperText={loginErrorMessage}
                        onChange={handleChange}
                        onKeyUp={(e) => {
                            if (e.key === 'Enter') {
                                if (loginFieldRef.current?.value && pwdFieldRef.current?.value && !loginError) {
                                    login();
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
                        error={loginError}
                        onChange={handleChange}
                        onKeyUp={(e) => {
                            if (e.key === 'Enter') {
                                if (loginFieldRef.current?.value && pwdFieldRef.current?.value && !loginError) {
                                    login();
                                }
                            }
                        }}
                    />

                    <Button onClick={login} variant="outlined"
                        size="large"
                        disabled={loginDisabled}
                        style={{
                            margin: "10px"
                        }}>
                        Login
                    </Button>
                </div>
            </Box>
        </Container>
    )
}
