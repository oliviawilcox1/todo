import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import validator from "validator";
// @mui
import {
  Typography,
  InputAdornment,
  IconButton,
  Stack,
  Container,
  TextField,
} from "@mui/material";
// @mui-icons
import {
  VisibilityOutlined,
  VisibilityOffOutlined,
  MailOutline,
} from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
// APIS
import { register, login } from "../../apis/routes";

export default function Register() {
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [focusOne, setFocusOne] = useState(false);
  const [focusTwo, setFocusTwo] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorState, setErrorState] = useState({
    error: false,
    errorMessage: ""
  })    
  const navigate = useNavigate();
  
  const validateEmail = (email) => {
    return validator.isEmail(email);
  };

  const validatePassword = (password) => {
    return validator.isStrongPassword(password, {
        minLength: 8, minLowercase: 1,
        minUppercase: 1, minNumbers: 0,  minSymbols: 0
    })
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleRegister = async(event) => {
    event.preventDefault(); 

    setLoading(true);

    const isEmailValid = validateEmail(emailValue.trim());
    const isPasswordValid = validatePassword(passwordValue)

    if (!emailValue || !passwordValue) {
        setErrorState({ error: true, errorMessage: "Enter an email and password." });
        setLoading(false);
        return;
    }

    if (!isEmailValid) {
        setErrorState({ error: true, errorMessage: "Enter a valid email" }); 
        setLoading(false);
    } else if (!isPasswordValid) {
        setErrorState({ error: true, errorMessage: "Enter a valid password with 8 characters and one uppercase letter." }); 
        setLoading(false);
    } else {
        setErrorState({ error: false, errorMessage: "" });
        const userData = {
            username: emailValue.trim(),
            password: passwordValue.trim()
        }
        
        const { status, data } = await register(userData)

        setLoading(false); 
        
        if(status !== 201){
            setErrorState({ error: true, errorMessage: data.message})
        } else {
            const loginResponse = await login(userData);
            const { status: loginStatus, data: loginData } = loginResponse; 

            if (loginStatus !== 200) {
              setErrorState({ error: true, errorMessage: loginData.message });
            } else {
              localStorage.setItem('auth', true)
              navigate('/dashboard/list', { replace: true });
            }
        }
    }
  };

  return (
    <Container maxWidth="xl">
      <Stack 
        component="form"
        height={"100vh"} 
        margin="auto"
        sx={{ width: "65%"}} 
        alignItems={"center"} 
        justifyContent={"center"}
        gap={2}
        spacing={3}
        onSubmit={handleRegister}
      >

        <Typography variant="h4">Register</Typography>

        <TextField
            focused={focusOne}
            fullWidth
            id="field"
            type="text"
            autoComplete="username"
            value={emailValue}
            error={errorState.error}
            variant="outlined"
            InputProps={{
                startAdornment: focusOne && (
                  <InputAdornment position="start">
                    <IconButton disabled={false}>
                        <MailOutline />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            onFocus={() => setFocusOne(true)}
            label="Email"
            onChange={(e) => setEmailValue(e.target.value)}
        />

        <TextField
            id="password"
            focused={focusTwo}
            type={showPassword ? "text" : "password"}
            fullWidth
            error={errorState.error}
            autoComplete="current-password"
            label="Password"
            value={passwordValue}
            InputProps={{
                startAdornment: focusTwo && (
                    <InputAdornment position="start">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword ? <VisibilityOffOutlined /> : <VisibilityOutlined />}
                      </IconButton>
                    </InputAdornment>
                ),
            }}
            onFocus={() => setFocusTwo(true)}
            onChange={(e) => setPasswordValue(e.target.value)}
        />
        
        <Typography color={"error.main"}>{errorState.errorMessage}</Typography>

        <LoadingButton
            fullWidth
            id="login-button"
            type="submit"
            variant="contained"
            disableRipple
            loading={loading}
        >
            Register
        </LoadingButton>

        <Typography mt={2}>
          Have an account? 
          &nbsp;
          <Link
            to={"/login"}
            style={{
              color: "black", 
              fontWeight: 600, 
              cursor: "pointer"
            }}
          >
            Login
          </Link>
        </Typography>
      </Stack>
    </Container>
  );
}