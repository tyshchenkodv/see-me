import { useCallback } from 'react';
import { apiClient } from '../config/axios';
import useAuth from './useAuth';

export default function useApi() {
    const { token, tokenExpires, refreshToken } = useAuth();

    const callApi = useCallback(async (url, method = 'get', data = {}) => {
        if (token) {
            const now = new Date();
            const expires = new Date(tokenExpires);
            if (now.getTime() > expires.getTime()) {
                await refreshToken();
            }
        }

        if (token) {
            return apiClient({
                method,
                url,
                data,
                headers: {
                    token,
                    'Content-Type': 'application/json',
                },
            });
        }

        return false;
    }, [token, tokenExpires]);

    return {
        callApi,
    };
}
