import { useEffect } from "react";
import useAuth from "./useAuth";
import { isNotExpired } from "../utils/isNotExpired";

export default function useCheckAuth(history, pathname) {
    const {token, tokenExpires, getUserByToken, logout} = useAuth();

    const checkAuth = async () => {
        if (isNotExpired(tokenExpires)) {
            if (token) {
                await getUserByToken();
                if (pathname === '/signin' || pathname === '/signup') {
                    history.push('/');
                }
            } else if (!token && (pathname !== '/signin' && pathname !== '/signup')) {
                history.push('/signin');
                logout();
            }
        } else {
            localStorage.removeItem('tokenExpires');
            localStorage.removeItem('token');
            history.push('/signin');
        }
    };

    useEffect(() => {
        checkAuth();
    }, []);
}
