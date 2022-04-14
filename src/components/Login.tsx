import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
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

    const login = async () => {

        const loginResponse = await AuthService.login(
            loginFieldRef.current?.value ?? "",
            pwdFieldRef.current?.value ?? ""
        );
        if (loginResponse.tokenResponse != null) {
            console.log(loginResponse.tokenResponse);
            console.log("accessToken=" + loginResponse.tokenResponse.accessToken);
            console.log("userName=" + loginResponse.tokenResponse.userName);
            console.log("validTo=" + loginResponse.tokenResponse.validTo);
            console.log("role=" + loginResponse.tokenResponse.role);
            setLoginError(false);

            navigate("/employees", { replace: true });
            console.log("Navigate to employee/list");
        } else {
            setLoginError(true);
        }
    };

    return (
        <Container>
            <Grid
                container
                style={{ height: window.innerHeight - 50 }}
                alignItems={"center"}
            /* justify={"center"} */
            >
                <Grid
                    container item
                    style={{ width: 400 }}
                    alignItems={"center"}
                    direction={"column"}
                >
                    <Box>
                        <TextField
                            id="loginTextField"
                            error={loginError}
                            label="Login name"
                            variant="outlined"
                            inputRef={loginFieldRef}
                        />
                        <br />
                        <br />
                        <TextField
                            id="pwdTextField"
                            label="Password"
                            type="password"
                            variant="outlined"
                            inputRef={pwdFieldRef}
                        //onChange={setPwdValue}
                        />
                        <br />
                        <br />
                        <Button onClick={login} variant="outlined">
                            Login
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    )
}
