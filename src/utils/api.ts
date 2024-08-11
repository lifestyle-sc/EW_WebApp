import ITokenDto from "@/interface/tokenDto";
import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";

const api: AxiosInstance = axios.create({
    baseURL: process.env.EW_API_URL,
  });

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const stringToken = localStorage.getItem('token');
    if (stringToken) {
        const token : ITokenDto = JSON.parse(stringToken as string); 
        config.headers.Authorization = `Bearer ${token.accessToken}`;
    }
    return config;
});

export default api;