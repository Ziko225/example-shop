import { createContext } from "react";
import { UserData } from "../hooks/useAuth";

type AuthProps = {
    isAuth: boolean;
    userData: UserData;
} | null;

export const AuthContext = createContext<AuthProps>(null);