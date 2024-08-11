"use client"
import * as React from "react";
import { Backdrop, Box, Button, CircularProgress, TextField, Typography, useMediaQuery } from "@mui/material";
import { useAuth } from "@/context/authContext/authProvider";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/userContext/userProvider";
import ITokenDto from "@/interface/tokenDto";
import { DecodeJWTToken } from "@/utils/token";

const Login = () => {
    const { isLoading, login, error } = useAuth();
    const { getUser } = useUser();
    const router = useRouter();
    const [formData, setFormData] = React.useState<{ userName: string, password: string }>({
        userName: "",
        password: "",
    });

    const onChangeFormData = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const fetchUser = async () => {
        const stringToken = localStorage.getItem('token');
        const token: ITokenDto = JSON.parse(stringToken as string);
        const decodedToken = DecodeJWTToken(token.accessToken);
        const userId = decodedToken.userId as string;

        await getUser(userId)
    }

    const onSubmitFormData = async () => {
        await login(formData);

        if(!error){
            await fetchUser();
            router.replace("/");
        }
    }

    if(isLoading){
        return (
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={isLoading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        )
    }

    return (
        <div className="max-w-lg mx-auto p-3">
            <Box>
                <Typography variant="h4" gutterBottom>
                    Welcome Back
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                    Login with your credentials
                </Typography>
            </Box>

            {error && <Box>
                <Typography color={"error"} variant="subtitle1" gutterBottom>
                    {error}
                </Typography>
            </Box>}

            <Box
                component="form"
                sx={{
                '& .MuiTextField-root': { my: 3 },
                }}
                noValidate
                autoComplete="off"
            >
                <div>
                    <TextField
                    required
                    id="outlined-username"
                    label="Username"
                    name="userName"
                    value={formData.userName}
                    onChange={onChangeFormData}
                    fullWidth={true}
                    />
                    <TextField
                    required
                    id="outlined-password-input"
                    label="Password"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={onChangeFormData}
                    fullWidth={true}
                    />
                </div>
                <div>
                <Button 
                color={"success"} 
                variant="contained" 
                fullWidth={true}
                onClick={onSubmitFormData}>
                    Login
                    </Button>
                </div>
            </Box>
        </div>
    )
}

export default Login;