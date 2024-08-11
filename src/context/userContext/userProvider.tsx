import api from '@/utils/api';
import * as React from 'react';

export interface UserContextType {
    isLoading: boolean,
    error: any,
    user: IUserDto | null
    getUser: (id: string) => Promise<void>
    setUser: (user: IUserDto | null) => void 
}

const UserContext = React.createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children } : { children: React.ReactNode }) => {
    const [isLoading, setLoading] = React.useState<boolean>(false);
    const [user, setUser] = React.useState<IUserDto | null>(null);
    const [error, setError] = React.useState<any>(null);

    const getUser = async(id: string) => {
        try {
            setLoading(true);
            const response = await api.get(`/api/users/${id}`);
            console.log(response);
            if(response.status !== 200){
                throw new Error("Unable to get user information");
            }
            setUser(response.data);
            setLoading(false);
        } catch (error) {
            setError(error);
            setLoading(false);
            console.log("Get user failed", error);
        }
    }

    return (
        <UserContext.Provider value={{ isLoading, error, user, getUser, setUser }}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = (): UserContextType => {
    const context = React.useContext<UserContextType | undefined>(UserContext);

    if(context === undefined){
        throw new Error('useUser must be used within an UserProvider');
    }

    return context;
}