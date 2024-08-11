import { jwtDecode, JwtPayload } from "jwt-decode";

export const DecodeJWTToken = (token: string) => {
    const decoded = jwtDecode<JwtPayload | any>(token);

    return decoded;
}