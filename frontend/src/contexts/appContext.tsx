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
    login: (name: string, password: string) => void;
    logout: () => void;
    isLoggedIn: boolean;
}

export const AppContext = createContext<AppContextProps | undefined>(undefined);
const key = "auth-user-coolfashion";
export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        console.log("Retrieving");
        if (typeof window === "undefined") {
            return;
        }
        console.log("A");
        try {
            const item = window.localStorage.getItem(key);
            console.log("B");
            const loggedIn = item !== null && item != "undefined"
                ? (JSON.parse(item) as boolean)
                : false
            setIsLoggedIn(
                loggedIn
            );
            console.log(item !== null && item != "undefined"
                ? (JSON.parse(item) as boolean)
                : null);
        } catch (error) {
            return;
        }
    }, [])

    const login = () => {
        //axios post req here
        localStorage.setItem(key, JSON.stringify(true));
        setIsLoggedIn(true);
        toast.success("Successfully logged in!");


    };

    const logout = () => {
        //axios post req here
        localStorage.setItem(key, JSON.stringify(false));
        setIsLoggedIn(false);
        toast.success("Successfully logged out!");
    };
    return (
        <AppContext.Provider
            value={{
                login,
                logout,
                isLoggedIn,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};