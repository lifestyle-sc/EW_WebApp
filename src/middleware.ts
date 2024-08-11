import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import ITokenDto from "./interface/tokenDto";
import { DecodeJWTToken } from "./utils/token";
import { ConvertUnixTimestampToDate } from "./utils/date";
import api from "./utils/api";

// This function can be marked `async` if using `await` inside
const refreshToken = async(credentials: ITokenDto) => {
    const response = await api.post<{ token: ITokenDto }>('/api/token/refresh', credentials);
    localStorage.setItem('token', JSON.stringify(response.data.token));
}

export const config = {
    matcher: ['/dashboard/:path*', '/dashboard',
         '/data/:path*', '/data',
        '/predict/:path*', '/predict',
        '/profile/:path*', '/profile',
        '/'
    ],
  }

export const middleware = async (request: NextRequest) => {
    try {
        const stringToken = localStorage.getItem('token');
        console.log(stringToken);
        if (stringToken === null) {
            return NextResponse.redirect(new URL('/auth/login', request.url));
        }
        const token: ITokenDto = JSON.parse(stringToken as string);
        const decodedToken = DecodeJWTToken(token.accessToken);
        const currentDate = new Date();
        const expirationDate = ConvertUnixTimestampToDate(decodedToken.exp as number);
        if(currentDate > expirationDate){
            console.log("the token is expired - get a new one");
            await refreshToken(token);
        }

        console.log("the token is valid - you good!");

        const response = NextResponse.next();

        return response;
    } catch (error) {
        return NextResponse.redirect(new URL('/auth/login', request.url));
    }
};