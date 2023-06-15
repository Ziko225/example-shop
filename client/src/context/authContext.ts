import { createContext } from "react";
import { UserData } from "../hooks/useAuth";

type AuthProps = {
    isAuth: boolean;
    userData: UserData;
    setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
    setUserData: React.Dispatch<React.SetStateAction<UserData>>;
} | null;

export const AuthContext = createContext<AuthProps>(null);