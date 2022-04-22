import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import AuthService from "../services/AuthService";
import { useAppDispatch } from '../redux/hooks';
import { setLoaderDisplayed, setLoaderNone } from '../redux/loaderSlice';
import { storeToken } from '../redux/authSlice';
import { ITokenInfo } from "../interfaces/ITokenInfo";


export const Signin = () => {

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const loginFieldRef = useRef<HTMLInputElement>();
    const pwdFieldRef = useRef<HTMLInputElement>();
    const [signinError, setSigninError] = useState(false);
    const [signinDisabled, setSigninDisabled] = useState(true);
    const [signinErrorMessage, setSigninErrorMessage] = useState("");

    const processSignin = async () => {
        dispatch(setLoaderDisplayed());
        try {
            const loginResponse = await AuthService.signin(
                loginFieldRef.current?.value ?? "",
                pwdFieldRef.current?.value ?? ""
            );
            if (loginResponse.data != null) {
                //dispatch(storeToken(loginResponse.data as ITokenInfo));                
                setSigninError(false);
                navigate("/employees", { replace: true });                
            } else {
                setSigninError(true);
                setSigninErrorMessage(loginResponse.error ?? "Login failed");
                setSigninDisabled(true);
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
            setSigninDisabled(false);
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
                        disabled={signinDisabled}
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
