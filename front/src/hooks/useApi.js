import { useCallback } from 'react';
import { apiClient } from '../config/axios';
import useAuth from './useAuth';
import { isNotExpired } from '../utils/isNotExpired';

export default function useApi() {
    const { token, tokenExpires, refreshToken } = useAuth();

    const callApi = useCallback(async (url, method = 'get', data = {}) => {
        if (token) {
            if (!isNotExpired(tokenExpires)) {
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
