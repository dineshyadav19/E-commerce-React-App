import React, { useState, useRef } from 'react'
import { Box, FormControl, InputLabel, OutlinedInput, Typography, InputAdornment, Button, styled, Snackbar } from "@mui/material"
import  {Email, Lock, Login, Visibility, VisibilityOff } from "@mui/icons-material"
import { Link, useHistory } from "react-router-dom";
import style from '../styles/Registration.module.css'
import Alert from '../components/Alert';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const LoginButton = styled(Button)({
    backgroundColor: "#0088a9",
    "&:hover": {
      backgroundColor: "#0088a9",
    },
});

export default function LoginPage() {
    const history = useHistory();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isPasswordVisible, setIsPasswordVisible] = useState(false)
    const [showSnackbar, setShowSnackbar] = useState(false)
    const snackbarMessage = useRef("");

    const login = () => {
        if(!email || !password) {
            snackbarMessage.current = "Email / Password seems to be empty";
            setShowSnackbar(true);
            return;
        }
        signInWithEmailAndPassword(getAuth(), email, password)
        .then((userCredential) => history.push("/"))
        .catch((error) => {
            snackbarMessage.current = error.message;
            setShowSnackbar(true);
            console.log(error);
            return;
        });
    }

    return (
        <Box className={style.box}>
            <Typography variant='h3' component={'div'} gutterBottom>Login</Typography>
            <FormControl className={style.formControl}>
                <InputLabel htmlFor='outlined-adornment-email'>Email</InputLabel>
                <OutlinedInput
                id='outlined-adornment-email' 
                type='email'
                value={email}
                onChange={(event) => {setEmail(event.target.value)}}
                startAdornment={<InputAdornment position="start"><Email /></InputAdornment>}
                label='Email'
                required
                />
            </FormControl>
            <FormControl className={style.formControl}>
                <InputLabel htmlFor='outlined-adornment-password'>Password</InputLabel>
                <OutlinedInput
                id='outlined-adornment-password'
                type={isPasswordVisible ? 'text' : 'password'}
                value={password}
                onChange={(event) => {setPassword(event.target.value)}}
                label="password"
                startAdornment={<InputAdornment position='start'><Lock /></InputAdornment>}
                endAdornment={<InputAdornment position='end'>{
                    isPasswordVisible ? 
                    <Visibility className={style.passwordIcon} onClick={() => setIsPasswordVisible(prev => !prev)}/> : 
                    <VisibilityOff className={style.passwordIcon} onClick={() => setIsPasswordVisible(prev => !prev)}/>
                }</InputAdornment>}
                required
                />
            </FormControl>
            <Box className={style.loginButton}>
                <LoginButton
                    fullWidth
                    variant="contained"
                    startIcon={<Login />}
                    onClick={login}
                    >
                    Login
                </LoginButton>
            </Box>

            <Box className={style.signupButton}>
                <Typography variant="subtitle1">
                    Don't have an account?
                    <span className={style.spacing}></span>
                    <Link to="/signup">Signup Now</Link>
                </Typography>
            </Box>

            <Snackbar
                open={showSnackbar}
                autoHideDuration={6000}
                onClose={() => setShowSnackbar(false)}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                key={`top + right`}
            >
            
                <Alert
                    onClose={() => setShowSnackbar(false)}
                    severity="error"
                    sx={{ width: "100%" }}
                    >
                    {snackbarMessage.current}
                </Alert>
            </Snackbar>
        </Box>
    )
}
