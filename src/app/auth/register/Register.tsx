"use client"
import * as React from 'react';
import { useAuth } from "@/context/authContext/authProvider";
import useMediaQuery from "@mui/material/useMediaQuery";
import ICreateUserDto from '@/interface/createUserDto';
import { Backdrop, Box, Button, CircularProgress, TextField, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';

const Register = () => {
    const tabletCheck = useMediaQuery('(min-width: 768px)');
    const { isLoading, register, error } = useAuth();
    const router = useRouter();
    const [formData, setFormData] = React.useState<ICreateUserDto>({
        firstName: "",
        lastName: "",
        userName: "",
        password: "",
        email: "",
        phoneNumber: ""
    });

    const onChangeFormData = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const onSubmitFormData = async () => {
        await register(formData);
        if(!error){
            router.replace("/auth/login");
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
                    Welcome To HydroSentinel
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                    Create an account with us
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
                '& .MuiTextField-root': { my: 3, width: tabletCheck? '25ch' : '100%' },
                }}
                noValidate
                autoComplete="off"
            >
                <div className="block md:flex md:space-x-8">
                    <TextField
                    required
                    id="outlined-first-name"
                    label="First Name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={onChangeFormData}
                    />
                    <TextField
                    required
                    id="outlined-last-name"
                    label="Last Name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={onChangeFormData}
                    />
                </div>
                <div className="block md:flex md:space-x-8">
                    <TextField
                    required
                    id="outlined-username"
                    label="Username"
                    name="userName"
                    value={formData.userName}
                    onChange={onChangeFormData}
                    />
                    <TextField
                    required
                    id="outlined-password-input"
                    label="Password"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={onChangeFormData}
                    />
                </div>
                <div className="block md:flex md:space-x-8">
                    <TextField
                    required
                    id="outlined-email"
                    label="Email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={onChangeFormData}
                    />
                    <TextField
                    required
                    id="outlined-phone-number"
                    label="Phone Number"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={onChangeFormData}
                    />
                </div>
                <div>
                <Button 
                color={"success"} 
                variant="contained" 
                fullWidth={true}
                onClick={onSubmitFormData}>
                    Register
                    </Button>
                </div>
            </Box>
        </div>
    )
}

export default Register;