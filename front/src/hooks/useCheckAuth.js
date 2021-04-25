import {useCallback, useEffect} from 'react';

import { isNotExpired } from '../utils/isNotExpired';
import useAuth from './useAuth';

export default function useCheckAuth(history, pathname) {
    const {token, tokenExpires, getUserByToken, logout} = useAuth();

    const checkAuth = useCallback(async () => {
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
    }, [getUserByToken, history, logout, pathname, tokenExpires, token]);

    useEffect(() => {
        checkAuth();
    }, []);
}
