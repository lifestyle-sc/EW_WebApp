import ICreateUserDto from "@/interface/createUserDto";
import ITokenDto from "@/interface/tokenDto";
import api from "@/utils/api";
import { useRouter } from "next/navigation";
import * as React from "react";
import { useUser } from "../userContext/userProvider";

export interface AuthContextType {
    isLoading: boolean
    login: (credentials: { userName: string; password: string }) => Promise<void>;
    logout: () => void;
    register: (credentials: ICreateUserDto) => Promise<void>;
    refreshToken: (credentials: ITokenDto) => Promise<void>;
    error: any
}

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children } : { children: React.ReactNode }) => {
    const [isLoading, setLoading] = React.useState<boolean>(false);
    const [error, setError] = React.useState<any>(null);
    const { setUser } = useUser();
    const router = useRouter();

    const register = async (credentials: ICreateUserDto) => {
        try {
            setLoading(true);
            credentials.roles = ['Administrator']
            const response = await api.post<{ token: ITokenDto }>('/api/auth', credentials);
            if(response.status !== 201){
                throw new Error("Unable to register new user");
            }
            setLoading(false);
        } catch (error) {
            setError(error);
            setLoading(false);
            console.error('Register failed', error);
        }
    }

    const login = async (credentials: { userName: string; password: string }) => {
        try {
            setLoading(true);
            const response = await api.post<{ token: ITokenDto }>('/api/auth/login', credentials);
            console.log(response);
            if(response.status !== 200){
                throw new Error("Unable to login");
            }
            localStorage.setItem('token', JSON.stringify(response.data));
            setLoading(false);
        } catch (error) {
            setError(error);
            setLoading(false);
            console.error('Login failed', error);
        }
    };

    const refreshToken = async(credentials: ITokenDto) => {
        try {
           setLoading(true);
           const response = await api.post<{ token: ITokenDto }>('/api/token/refresh', credentials);
           if(response.status !== 200){
               throw new Error("Unable to get new token");
           }
            localStorage.setItem('token', JSON.stringify(response.data));
           setLoading(false);
        } catch (error) {
            setError(error);
            setLoading(false);
            console.error('Refresh failed', error);
        }
    }

    const logout = () => {    
        localStorage.removeItem('token');
        setUser(null);
        router.replace('/auth/login');
    };

    return (
        <AuthContext.Provider value={{ isLoading, login, logout, register, refreshToken, error }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = (): AuthContextType => {
    const context = React.useContext<AuthContextType | undefined>(AuthContext);
    if (context === undefined) {
      throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};