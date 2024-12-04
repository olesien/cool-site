import { User } from "@/pages/login/login";
import React, {
    createContext,
    useState,
    useEffect,
} from "react";
import { toast } from "react-toastify";

interface AppProviderProps {
    children: React.ReactNode;
}

interface AppContextProps {
    login: (user: User) => void;
    logout: () => void;
    user: User | null;
}

export const AppContext = createContext<AppContextProps | undefined>(undefined);
const key = "auth-user-coolfashion";
export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
    const [user, setUser] = useState<null | User>(null);

    useEffect(() => {
        console.log("Retrieving");
        if (typeof window === "undefined") {
            return;
        }
        console.log("A");
        try {
            const item = window.localStorage.getItem(key);
            console.log("B");
            const userFromStorage = item !== null && item != "undefined"
                ? (JSON.parse(item) as User)
                : null
            setUser(
                userFromStorage
            );
        } catch (error) {
            return;
        }
    }, [])

    const login = (user: User) => {
        //axios post req here
        localStorage.setItem(key, JSON.stringify(user));
        setUser(user);
        toast.success("Successfully logged in!");


    };

    const logout = () => {
        //axios post req here
        localStorage.setItem(key, JSON.stringify(null));
        setUser(null);
        toast.success("Successfully logged out!");
    };
    return (
        <AppContext.Provider
            value={{
                login,
                logout,
                user,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};