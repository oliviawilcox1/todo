import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
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
import { login } from "../../apis/routes";

export default function Login() {
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

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleLogin = async(event) => {
    event.preventDefault(); 

    if (!emailValue || !passwordValue) {
        setErrorState({ error: true, errorMessage: "Enter an email and password." });
        return;
    }
  
    setLoading(true);

    const userData = {
      username: emailValue.trim(),
      password: passwordValue.trim()
    }

    const { status, data } = await login(userData)

    setLoading(false); 

    if(status !== 200){
      setErrorState({ error: true, errorMessage: data.message})
    } else {
      localStorage.setItem('auth', true)
      navigate('/dashboard/list', { replace: true });
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
        onSubmit={handleLogin}
      >

        <Typography variant="h4">Login</Typography>

        <TextField
          focused={focusOne}
          fullWidth
          id="field"
          type="text"
          autoComplete="username"
          value={emailValue}
          error={errorState.error}
          variant="outlined"
          onFocus={() => setFocusOne(true)}
          label="Email"
          onChange={(e) => setEmailValue(e.target.value)}
          InputProps={{
            startAdornment: focusOne && (
              <InputAdornment position="start">
                <IconButton disabled={false}>
                  <MailOutline />
                </IconButton>
              </InputAdornment>
            ),
          }}
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
          onFocus={() => setFocusTwo(true)}
          onChange={(e) => setPasswordValue(e.target.value)}
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
          Login
        </LoadingButton>

        <Typography mt={2}>
          Don't have an account? 
          &nbsp;
          <Link
            to={"/register"}
            style={{
              color: "black", 
              fontWeight: 600, 
              cursor: "pointer"
            }}
          >
            Register
          </Link>
        </Typography>
      </Stack>
    </Container>
  );
}